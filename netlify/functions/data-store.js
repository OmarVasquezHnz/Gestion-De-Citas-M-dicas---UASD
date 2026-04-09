const { createClient } = require("@supabase/supabase-js");

const TABLA_STORAGE = process.env.APP_STORAGE_TABLE || "app_storage";
const KEYS_PERMITIDAS = new Set(["pacientes", "medicos", "citas", "usuarios"]);

function getSupabaseAdmin() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return null;
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    });
}

function response(statusCode, payload) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
}

exports.handler = async (event) => {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
        return response(503, { ok: false, message: "Base de datos no configurada" });
    }

    const key = event.queryStringParameters?.key || "";
    if (!KEYS_PERMITIDAS.has(key)) {
        return response(400, { ok: false, message: "Clave de almacenamiento no valida" });
    }

    if (event.httpMethod === "GET") {
        const { data, error } = await supabase
            .from(TABLA_STORAGE)
            .select("value")
            .eq("key", key)
            .maybeSingle();

        if (error) {
            return response(500, { ok: false, message: error.message });
        }

        return response(200, { ok: true, value: data ? data.value : null });
    }

    if (event.httpMethod === "PUT") {
        const payload = JSON.parse(event.body || "{}");
        if (typeof payload !== "object" || payload === null || !("value" in payload)) {
            return response(400, { ok: false, message: "Payload invalido" });
        }

        const { error } = await supabase
            .from(TABLA_STORAGE)
            .upsert({ key, value: payload.value }, { onConflict: "key" });

        if (error) {
            return response(500, { ok: false, message: error.message });
        }

        return response(200, { ok: true });
    }

    return response(405, { ok: false, message: "Metodo no permitido" });
};
