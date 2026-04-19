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
            body: JSON.stringify({ ok: false, message: "Método no permitido" })
        };
    }

    const usarResend = canUseResend();
    const usarBrevoApi = canUseBrevoApi();
    const transporter = getMailTransporter();

    if (!transporter && !usarResend && !usarBrevoApi) {
        return {
            statusCode: 503,
            body: JSON.stringify({ ok: false, message: "El correo no está configurado (SMTP, Resend o Brevo API)" })
        };
    }

    const {
        destinatario,
        codigoVerificacion,
        nombreUsuario
    } = JSON.parse(event.body || "{}");

    if (!destinatario || !codigoVerificacion || !nombreUsuario) {
        return {
            statusCode: 400,
            body: JSON.stringify({ ok: false, message: "Faltan datos para enviar el correo de recuperación" })
        };
    }

    const subject = "Código de recuperación de contraseña - Centro Médico UASD";
    const text = [
        `Hola ${nombreUsuario},`,
        "",
        "Has solicitado recuperar tu contraseña.",
        `Tu código de verificación es: ${codigoVerificacion}`,
        "",
        "Este código expirará en 15 minutos.",
        "Si no solicitaste esto, ignora este correo.",
        "",
        "Centro Médico UASD"
    ].join("\n");

    const html = `
        <div style="font-family: 'Poppins', Arial, sans-serif; color: #1f2937; line-height: 1.8; background-color: #f9fafb; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Recuperación de Contraseña</h1>
                </div>
                
                <!-- Content -->
                <div style="padding: 30px;">
                    <p style="margin: 0 0 20px 0; font-size: 16px;">Hola <strong>${nombreUsuario}</strong>,</p>
                    
                    <p style="margin: 0 0 20px 0; font-size: 15px; color: #4b5563;">
                        Has solicitado cambiar tu contraseña en el sistema de gestión de citas del Centro Médico UASD.
                    </p>
                    
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; font-weight: 600;">Tu código de verificación es:</p>
                    
                    <!-- Code Box -->
                    <div style="background: linear-gradient(135deg, #f0f4ff 0%, #f3e8ff 100%); border: 2px solid #e0e7ff; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                        <div style="font-size: 32px; font-weight: 900; color: #4f46e5; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                            ${codigoVerificacion}
                        </div>
                    </div>
                    
                    <p style="margin: 20px 0 0 0; font-size: 13px; color: #ef4444; text-align: center;">
                        ⏱️ Este código expirará en <strong>15 minutos</strong>
                    </p>
                    
                    <p style="margin: 20px 0 0 0; font-size: 14px; color: #6b7280; border-left: 3px solid #fbbf24; padding-left: 15px;">
                        ⚠️ Si no solicitaste este cambio, ignora este correo. Tu contraseña permanece segura.
                    </p>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                        Centro Médico UASD | Gestión de Citas
                    </p>
                </div>
            </div>
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
        } else if (transporter) {
            const mailResult = await transporter.sendMail({
                from: getMailFromAddress(),
                to: destinatario,
                subject,
                text,
                html
            });
            messageId = mailResult.messageId;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                ok: true,
                message: "Código de verificación enviado correctamente",
                messageId
            })
        };
    } catch (error) {
        console.error("Error enviando correo de recuperación:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                ok: false,
                message: `Error al enviar correo: ${error.message}`
            })
        };
    }
};
