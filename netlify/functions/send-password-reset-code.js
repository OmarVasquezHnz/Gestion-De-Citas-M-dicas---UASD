// Funciones para envío de correo con Resend

function getResendApiKey() {
    return (
        process.env.RESEND_API_KEY ||
        process.env.RESEND_KEY ||
        process.env.RESEND_TOKEN ||
        ""
    );
}

async function sendWithResend({ to, subject, text, html }) {
    const apiKey = getResendApiKey();
    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
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

// Solo usamos Resend para esta función

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

    // Usar SOLO Resend para códigos de recuperación
    if (!getResendApiKey()) {
        return {
            statusCode: 503,
            body: JSON.stringify({
                ok: false,
                message: "Resend no está configurado. Define RESEND_API_KEY en Netlify (Site configuration > Environment variables) y vuelve a desplegar."
            })
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
        // Enviar usando Resend
        const resendResult = await sendWithResend({
            to: destinatario,
            subject,
            text,
            html
        });
        const messageId = resendResult.id || null;

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
