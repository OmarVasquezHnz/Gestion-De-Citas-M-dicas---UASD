const nodemailer = require("nodemailer");

function canUseResend() {
    return !!process.env.RESEND_API_KEY;
}

function canUseBrevoApi() {
    return !!process.env.BREVO_API_KEY;
}

function parseFromAddress(fromValue) {
    const raw = String(fromValue || "").trim();
    const match = raw.match(/^(.*)<([^>]+)>$/);

    if (!match) {
        return { name: undefined, email: raw };
    }

    const name = match[1].trim().replace(/^"|"$/g, "");
    const email = match[2].trim();
    return {
        name: name || undefined,
        email
    };
}

async function sendWithResend({ to, subject, text, html }) {
    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: getMailFromAddress(),
            to,
            subject,
            text,
            html
        })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        const detail = payload.message || payload.error || "No se pudo enviar el correo con Resend";
        throw new Error(detail);
    }

    return payload;
}

async function sendWithBrevoApi({ to, subject, text, html }) {
    const sender = parseFromAddress(getMailFromAddress());
    if (!sender.email) {
        throw new Error("MAIL_FROM no es valido para Brevo API");
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sender,
            to: [{ email: to }],
            subject,
            textContent: text,
            htmlContent: html
        })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        const detail = payload.message || payload.code || "No se pudo enviar el correo con Brevo API";
        throw new Error(detail);
    }

    return payload;
}

function getMailTransporter() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
        return nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailUser && emailPass) {
        return nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });
    }

    return null;
}

function getMailFromAddress() {
    return process.env.MAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER || "no-reply@centromedico.local";
}

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ ok: false, message: "Metodo no permitido" })
        };
    }

    const usarResend = canUseResend();
    const usarBrevoApi = canUseBrevoApi();
    const transporter = getMailTransporter();

    if (!transporter && !usarResend && !usarBrevoApi) {
        return {
            statusCode: 503,
            body: JSON.stringify({ ok: false, message: "El correo no esta configurado (SMTP, Resend o Brevo API)" })
        };
    }

    const {
        destinatario,
        pacienteNombre,
        medicoNombre,
        fecha,
        hora,
        especialidad,
        notas
    } = JSON.parse(event.body || "{}");

    if (!destinatario || !pacienteNombre || !medicoNombre || !fecha || !hora || !especialidad) {
        return {
            statusCode: 400,
            body: JSON.stringify({ ok: false, message: "Faltan datos para enviar el correo de la cita" })
        };
    }

    const subject = "Confirmacion de cita medica";
    const text = [
        `Hola ${pacienteNombre},`,
        "",
        "Tu cita medica ha sido registrada correctamente.",
        `Medico: ${medicoNombre}`,
        `Especialidad: ${especialidad}`,
        `Fecha: ${fecha}`,
        `Hora: ${hora}`,
        notas ? `Notas: ${notas}` : null,
        "",
        "Centro Medico UASD"
    ].filter(Boolean).join("\n");

    const html = `
        <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
            <h2 style="color: #4338ca; margin-bottom: 8px;">Confirmacion de cita medica</h2>
            <p>Hola <strong>${pacienteNombre}</strong>,</p>
            <p>Tu cita medica ha sido registrada correctamente con estos detalles:</p>
            <ul style="padding-left: 18px;">
                <li><strong>Medico:</strong> ${medicoNombre}</li>
                <li><strong>Especialidad:</strong> ${especialidad}</li>
                <li><strong>Fecha:</strong> ${fecha}</li>
                <li><strong>Hora:</strong> ${hora}</li>
                ${notas ? `<li><strong>Notas:</strong> ${String(notas)}</li>` : ""}
            </ul>
            <p>Gracias por usar el sistema de citas del Centro Medico UASD.</p>
        </div>
    `;

    try {
        let messageId = null;

        if (usarResend) {
            const resendResult = await sendWithResend({
                to: destinatario,
                subject,
                text,
                html
            });
            messageId = resendResult.id || null;
        } else if (usarBrevoApi) {
            const brevoResult = await sendWithBrevoApi({
                to: destinatario,
                subject,
                text,
                html
            });
            messageId = brevoResult.messageId || null;
        } else {
            const info = await transporter.sendMail({
                from: getMailFromAddress(),
                to: destinatario,
                subject,
                text,
                html
            });
            messageId = info.messageId;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true, messageId })
        };
    } catch (error) {
        console.error("Error enviando correo de cita:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ ok: false, message: "No se pudo enviar el correo de confirmacion" })
        };
    }
};
