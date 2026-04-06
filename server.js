const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta raíz - sirve la versión con Tailwind
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

let pacientes = [];
let medicos = [];
let citas = [];

let id = 1;

// Inicializar datos de prueba
function inicializarDatosPrueba() {
    // Médicos
    medicos = [
        { id: id++, nombre: "Dr. Juan Pérez", especialidad: "Cardiología", estado: "activo" },
        { id: id++, nombre: "Dra. María García", especialidad: "Pediatría", estado: "activo" },
        { id: id++, nombre: "Dr. Carlos López", especialidad: "Dermatología", estado: "activo" },
        { id: id++, nombre: "Dra. Ana Rodríguez", especialidad: "Oftalmología", estado: "activo" },
        { id: id++, nombre: "Dr. Luis Martínez", especialidad: "Neurocirugía", estado: "activo" }
    ];

    // Pacientes
    pacientes = [
        { id: id++, nombre: "Pedro Sánchez", telefono: "809-123-4567", email: "pedro@email.com", fecha_creacion: new Date() },
        { id: id++, nombre: "María Fernández", telefono: "809-234-5678", email: "maria@email.com", fecha_creacion: new Date() },
        { id: id++, nombre: "José Ramírez", telefono: "809-345-6789", email: "jose@email.com", fecha_creacion: new Date() },
        { id: id++, nombre: "Carmen Díaz", telefono: "809-456-7890", email: "carmen@email.com", fecha_creacion: new Date() },
        { id: id++, nombre: "Antonio Gómez", telefono: "809-567-8901", email: "antonio@email.com", fecha_creacion: new Date() }
    ];

    // Citas de esta semana (29 marzo - 4 abril 2026)
    citas = [
        { id: id++, paciente_id: 2, medico_id: 1, fecha: "2026-03-29", hora: "09:00", especialidad: "Cardiología" },
        { id: id++, paciente_id: 3, medico_id: 2, fecha: "2026-03-30", hora: "10:30", especialidad: "Pediatría" },
        { id: id++, paciente_id: 4, medico_id: 3, fecha: "2026-03-31", hora: "14:00", especialidad: "Dermatología" },
        { id: id++, paciente_id: 5, medico_id: 4, fecha: "2026-04-01", hora: "11:15", especialidad: "Oftalmología" },
        { id: id++, paciente_id: 1, medico_id: 5, fecha: "2026-04-02", hora: "16:45", especialidad: "Neurocirugía" },
        { id: id++, paciente_id: 2, medico_id: 1, fecha: "2026-04-03", hora: "08:30", especialidad: "Cardiología" },
        { id: id++, paciente_id: 3, medico_id: 2, fecha: "2026-04-04", hora: "13:00", especialidad: "Pediatría" },
        { id: id++, paciente_id: 4, medico_id: 3, fecha: "2026-03-29", hora: "15:30", especialidad: "Dermatología" },
        { id: id++, paciente_id: 5, medico_id: 4, fecha: "2026-03-30", hora: "12:00", especialidad: "Oftalmología" },
        { id: id++, paciente_id: 1, medico_id: 5, fecha: "2026-03-31", hora: "17:00", especialidad: "Neurocirugía" }
    ];
}

inicializarDatosPrueba();

// PACIENTES
app.get("/api/pacientes", (req, res) => res.json(pacientes));

app.post("/api/pacientes", (req, res) => {
    const nuevo = { id: id++, ...req.body, fecha_creacion: new Date() };
    pacientes.push(nuevo);
    res.json(nuevo);
});

// MEDICOS
app.get("/api/medicos", (req, res) => res.json(medicos));

app.post("/api/medicos", (req, res) => {
    const nuevo = { id: id++, estado: "activo", ...req.body };
    medicos.push(nuevo);
    res.json(nuevo);
});

// CITAS
app.get("/api/citas", (req, res) => {
    const resultado = citas.map(c => {
        const paciente = pacientes.find(p => p.id == c.paciente_id);
        const medico = medicos.find(m => m.id == c.medico_id);

        return {
            ...c,
            paciente: paciente?.nombre,
            medico: medico?.nombre
        };
    });

    res.json(resultado);
});

app.post("/api/citas", (req, res) => {
    const nueva = { id: id++, ...req.body };
    citas.push(nueva);
    res.json(nueva);
});

app.listen(3000, () => {
    console.log("🏥 UASD - Centro Médico - Gestión de Citas - Servidor en puerto 3000");
    console.log("📱 Acceder a: http://localhost:3000");
    console.log("✅ Interfaz activa: index.html");
});