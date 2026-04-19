// ============================================
// DATA MANAGEMENT
// ============================================

class DataManager {
    constructor() {
        this.storageKeys = ['pacientes', 'medicos', 'citas', 'usuarios'];
        this.remoteStorageEnabled = true;
        this.remoteStorageChecked = false;
        this.seedVersionKey = 'seed_medicos_pacientes_v5';
        this.seedPushKey = `${this.seedVersionKey}_push`;

        // Cargar datos existentes de localStorage
        this.pacientes = this.normalizarArray(this.loadData('pacientes'));
        this.medicos = this.normalizarArray(this.loadData('medicos'));
        this.citas = this.normalizarArray(this.loadData('citas'));
        this.usuarios = this.normalizarArray(this.loadData('usuarios'));
        
        const pacientesSemilla = [
            { id: 201, nombre: "Luis", apellido: "Paredes", cedula: "001-7812456-2", matricula: "PAC-2026001", fecha: "1992-08-14", telefono: "809-812-4412", correo: "luis.paredes@correo.com", sangre: "O+", direccion: "Santo Domingo Este" },
            { id: 202, nombre: "Andrea", apellido: "Gómez", cedula: "402-4411287-6", matricula: "PAC-2026002", fecha: "1989-05-22", telefono: "829-334-7715", correo: "andrea.gomez@correo.com", sangre: "A+", direccion: "Santiago" },
            { id: 203, nombre: "Carlos", apellido: "Reyes", cedula: "031-9922144-9", matricula: "PAC-2026003", fecha: "1998-01-09", telefono: "849-552-9041", correo: "carlos.reyes@correo.com", sangre: "B+", direccion: "La Vega" },
            { id: 204, nombre: "Pamela", apellido: "Mota", cedula: "223-6674120-1", matricula: "PAC-2026004", fecha: "1994-11-30", telefono: "809-402-1188", correo: "pamela.mota@correo.com", sangre: "AB+", direccion: "San Cristóbal" },
            { id: 205, nombre: "Jonathan", apellido: "Núñez", cedula: "055-1247780-3", matricula: "PAC-2026005", fecha: "1987-03-16", telefono: "829-771-3304", correo: "jonathan.nunez@correo.com", sangre: "O-", direccion: "San Pedro de Macorís" },
            { id: 206, nombre: "Katherine", apellido: "Valdez", cedula: "402-1098321-7", matricula: "PAC-2026006", fecha: "1996-06-04", telefono: "849-921-6650", correo: "katherine.valdez@correo.com", sangre: "A-", direccion: "Puerto Plata" },
            { id: 207, nombre: "Enmanuel", apellido: "Sosa", cedula: "012-9087612-5", matricula: "PAC-2026007", fecha: "1990-09-11", telefono: "809-613-0098", correo: "enmanuel.sosa@correo.com", sangre: "B-", direccion: "Moca" },
            { id: 208, nombre: "Rosa", apellido: "Tejeda", cedula: "224-5176033-8", matricula: "PAC-2026008", fecha: "1985-12-27", telefono: "829-208-4407", correo: "rosa.tejeda@correo.com", sangre: "AB-", direccion: "Baní" },
            { id: 209, nombre: "Miguel", apellido: "Lantigua", cedula: "001-3351882-4", matricula: "PAC-2026009", fecha: "1993-04-19", telefono: "849-430-2261", correo: "miguel.lantigua@correo.com", sangre: "O+", direccion: "Bonao" },
            { id: 210, nombre: "Yamilex", apellido: "Paulino", cedula: "402-7784521-0", matricula: "PAC-2026010", fecha: "2000-02-06", telefono: "809-982-7105", correo: "yamilex.paulino@correo.com", sangre: "A+", direccion: "Higüey" }
        ];

        const medicosSemilla = [
            { id: 101, nombre: "Dra. Ángela Sánchez", especialidad: "Ginecología", cedula: "COD-GIN-101", telefono: "809-300-0101", correo: "angela.sanchez@centromedico.do", estado: "activo" },
            { id: 102, nombre: "Dra. Carmen Barreras", especialidad: "Ginecología", cedula: "COD-GIN-102", telefono: "809-300-0102", correo: "carmen.barreras@centromedico.do", estado: "activo" },
            { id: 103, nombre: "Dra. Franka Valoy", especialidad: "Ginecología", cedula: "COD-GIN-103", telefono: "809-300-0103", correo: "franka.valoy@centromedico.do", estado: "activo" },
            { id: 104, nombre: "Dr. Jou Fernández", especialidad: "Ginecología", cedula: "COD-GIN-104", telefono: "809-300-0104", correo: "jou.fernandez@centromedico.do", estado: "activo" },
            { id: 105, nombre: "Dr. Wilton Martínez", especialidad: "Ginecología", cedula: "COD-GIN-105", telefono: "809-300-0105", correo: "wilton.martinez@centromedico.do", estado: "activo" },
            { id: 106, nombre: "Dra. Sabrina Paulino", especialidad: "Ginecología", cedula: "COD-GIN-106", telefono: "809-300-0106", correo: "sabrina.paulino@centromedico.do", estado: "activo" },
            { id: 107, nombre: "Dra. Issa Matos", especialidad: "Pediatría", cedula: "COD-PED-107", telefono: "809-300-0107", correo: "issa.matos@centromedico.do", estado: "activo" },
            { id: 108, nombre: "Dra. Isabel Castillo", especialidad: "Pediatría", cedula: "COD-PED-108", telefono: "809-300-0108", correo: "isabel.castillo@centromedico.do", estado: "activo" },
            { id: 109, nombre: "Dra. Johanny Sánchez", especialidad: "Pediatría", cedula: "COD-PED-109", telefono: "809-300-0109", correo: "johanny.sanchez@centromedico.do", estado: "activo" },
            { id: 110, nombre: "Dra. Marianela Gonzales", especialidad: "Dermatología", cedula: "COD-DER-110", telefono: "809-300-0110", correo: "marianela.gonzales@centromedico.do", estado: "activo" },
            { id: 111, nombre: "Dr. Juan Pablos Lagos", especialidad: "Oftalmología", cedula: "COD-OFT-111", telefono: "809-300-0111", correo: "juan.lagos@centromedico.do", estado: "activo" },
            { id: 112, nombre: "Dra. Demester Marchena", especialidad: "Oftalmología", cedula: "COD-OFT-112", telefono: "809-300-0112", correo: "demester.marchena@centromedico.do", estado: "activo" },
            { id: 113, nombre: "Dr. José Almonte", especialidad: "Otorrinolaringología", cedula: "COD-OTO-113", telefono: "809-300-0113", correo: "jose.almonte@centromedico.do", estado: "activo" },
            { id: 114, nombre: "Dr. Carlos Calderón", especialidad: "Otorrinolaringología", cedula: "COD-OTO-114", telefono: "809-300-0114", correo: "carlos.calderon@centromedico.do", estado: "activo" },
            { id: 115, nombre: "Dra. Jamillet Mateo", especialidad: "Gastroenterología", cedula: "COD-GAS-115", telefono: "809-300-0115", correo: "jamillet.mateo@centromedico.do", estado: "activo" },
            { id: 116, nombre: "Dra. Mildred Pichardo", especialidad: "Gastroenterología", cedula: "COD-GAS-116", telefono: "809-300-0116", correo: "mildred.pichardo@centromedico.do", estado: "activo" },
            { id: 117, nombre: "Dr. Amaury García", especialidad: "Neurocirugía", cedula: "COD-NEU-117", telefono: "809-300-0117", correo: "amaury.garcia@centromedico.do", estado: "activo" },
            { id: 118, nombre: "Dra. Patricia Reyna", especialidad: "Psiquiatría / Psicología", cedula: "COD-PSI-118", telefono: "809-300-0118", correo: "patricia.reyna@centromedico.do", estado: "activo" },
            { id: 119, nombre: "Dr. Larry Gómez", especialidad: "Psiquiatría / Psicología", cedula: "COD-PSI-119", telefono: "809-300-0119", correo: "larry.gomez@centromedico.do", estado: "activo" },
            { id: 120, nombre: "Licda. Ruth Brito", especialidad: "Psiquiatría / Psicología", cedula: "COD-PSI-120", telefono: "809-300-0120", correo: "ruth.brito@centromedico.do", estado: "activo" },
            { id: 121, nombre: "Dra. Mercedes Duarte", especialidad: "Psiquiatría / Psicología", cedula: "COD-PSI-121", telefono: "809-300-0121", correo: "mercedes.duarte@centromedico.do", estado: "activo" },
            { id: 122, nombre: "Licdo. Jairo Mercedes", especialidad: "Psiquiatría / Psicología", cedula: "COD-PSI-122", telefono: "809-300-0122", correo: "jairo.mercedes@centromedico.do", estado: "activo" }
        ];

        const citasSemilla = [
            { id: 301, paciente: 201, medico: 101, fecha: "2026-04-09", hora: "08:30", especialidad: "Ginecología", estado: "pendiente", notas: "Primera consulta", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 302, paciente: 202, medico: 108, fecha: "2026-04-09", hora: "10:45", especialidad: "Pediatría", estado: "pendiente", notas: "Seguimiento general", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 303, paciente: 203, medico: 110, fecha: "2026-04-10", hora: "09:15", especialidad: "Dermatología", estado: "pendiente", notas: "Evaluación de piel", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 304, paciente: 204, medico: 111, fecha: "2026-04-10", hora: "13:20", especialidad: "Oftalmología", estado: "pendiente", notas: "Control visual", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 305, paciente: 205, medico: 114, fecha: "2026-04-11", hora: "08:50", especialidad: "Otorrinolaringología", estado: "pendiente", notas: "Dolor de garganta", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 306, paciente: 206, medico: 115, fecha: "2026-04-11", hora: "11:40", especialidad: "Gastroenterología", estado: "pendiente", notas: "Chequeo digestivo", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 307, paciente: 207, medico: 117, fecha: "2026-04-12", hora: "09:05", especialidad: "Neurocirugía", estado: "pendiente", notas: "Evaluación neurológica", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 308, paciente: 208, medico: 119, fecha: "2026-04-12", hora: "15:10", especialidad: "Psiquiatría / Psicología", estado: "pendiente", notas: "Consulta emocional", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 309, paciente: 209, medico: 106, fecha: "2026-04-13", hora: "08:20", especialidad: "Ginecología", estado: "pendiente", notas: "Consulta de rutina", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 310, paciente: 210, medico: 107, fecha: "2026-04-13", hora: "14:35", especialidad: "Pediatría", estado: "pendiente", notas: "Control periódico", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 311, paciente: 201, medico: 113, fecha: "2026-04-14", hora: "09:40", especialidad: "Otorrinolaringología", estado: "pendiente", notas: "Molestias de oído", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() },
            { id: 312, paciente: 204, medico: 116, fecha: "2026-04-14", hora: "16:00", especialidad: "Gastroenterología", estado: "pendiente", notas: "Revisión de resultados", accion: "Creada", accionPor: "admin1", accionAt: new Date().toISOString() }
        ];

        if (localStorage.getItem(this.seedVersionKey) !== 'done') {
            this.pacientes = pacientesSemilla;
            this.medicos = medicosSemilla;
            this.citas = citasSemilla;
            localStorage.setItem(this.seedVersionKey, 'done');
            localStorage.setItem(this.seedPushKey, 'pending');
            this.saveData('pacientes', this.pacientes);
            this.saveData('medicos', this.medicos);
            this.saveData('citas', this.citas);
        } else {
            if (!this.pacientes || this.pacientes.length === 0) {
                this.pacientes = pacientesSemilla;
                this.saveData('pacientes', this.pacientes);
            }
            if (!this.medicos || this.medicos.length === 0) {
                this.medicos = medicosSemilla;
                this.saveData('medicos', this.medicos);
            }
            if (!this.citas || this.citas.length === 0) {
                this.citas = citasSemilla;
                this.saveData('citas', this.citas);
            }
        }

        this.pacientes = this.pacientes.map(paciente => {
            if (!paciente || typeof paciente !== 'object') return paciente;
            const correoNormalizado = (paciente.correo || paciente.email || '').trim();
            return {
                ...paciente,
                correo: correoNormalizado
            };
        });
        this.saveData('pacientes', this.pacientes);
        
        if (!this.citas || this.citas.length === 0) {
            this.citas = citasSemilla;
            this.saveData('citas', this.citas);
        }

        this.citas = this.citas.map(cita => ({
            ...cita,
            estado: (cita.estado || 'pendiente').trim().toLowerCase()
        }));
        this.saveData('citas', this.citas);

        const usuariosPermitidos = ['admin1', 'admin2'];
        this.usuarios = this.usuarios.filter(u => usuariosPermitidos.includes(u.username));

        const defaultUsuarios = [
            { id: 1, nombre: 'Administrador Principal', username: 'admin1', correo: 'admin1@centromedico.local', rol: 'admin', estado: 'activo', password: '12345', ultimoAcceso: null, createdAt: new Date().toISOString() },
            { id: 2, nombre: 'Administrador Secundario', username: 'admin2', correo: 'admin2@centromedico.local', rol: 'admin', estado: 'activo', password: '123456', ultimoAcceso: null, createdAt: new Date().toISOString() }
        ];
        defaultUsuarios.forEach(def => {
            if (!this.usuarios.find(u => u.username === def.username)) {
                this.usuarios.push(def);
            }
        });
        this.saveData('usuarios', this.usuarios);
    }

    loadData(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        this.saveDataRemota(key, data);
    }

    async fetchStorageRemoto(key) {
        if (!this.remoteStorageEnabled) return { ok: false };

        try {
            const response = await fetch(`/api/storage?key=${encodeURIComponent(key)}`);
            if (!response.ok) return { ok: false };
            const result = await response.json();
            this.remoteStorageChecked = true;
            return { ok: !!result.ok, value: result.value };
        } catch (error) {
            this.remoteStorageEnabled = false;
            return { ok: false };
        }
    }

    async saveDataRemota(key, data) {
        if (!this.remoteStorageEnabled) return;
        if (!this.storageKeys.includes(key)) return;

        try {
            const response = await fetch(`/api/storage?key=${encodeURIComponent(key)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value: data })
            });
            if (!response.ok) {
                this.remoteStorageEnabled = false;
            }
        } catch (error) {
            this.remoteStorageEnabled = false;
        }
    }

    async sincronizarConBaseDatos() {
        if (!this.remoteStorageEnabled) return;

        if (localStorage.getItem(this.seedPushKey) === 'pending') {
            await this.saveDataRemota('pacientes', this.pacientes);
            await this.saveDataRemota('medicos', this.medicos);
            await this.saveDataRemota('citas', this.citas);
            localStorage.setItem(this.seedPushKey, 'done');
        }

        for (const key of this.storageKeys) {
            const remoto = await this.fetchStorageRemoto(key);
            const local = this.normalizarArray(this.loadData(key));

            if (remoto.ok && Array.isArray(remoto.value)) {
                this[key] = this.normalizarArray(remoto.value);
                localStorage.setItem(key, JSON.stringify(this[key]));
            } else if (local.length > 0) {
                await this.saveDataRemota(key, local);
            }
        }
    }

    normalizarArray(data) {
        return Array.isArray(data) ? data : [];
    }

    addPaciente(paciente) {
        paciente.id = Date.now();
        paciente.createdAt = new Date().toISOString();
        this.pacientes.push(paciente);
        this.saveData('pacientes', this.pacientes);
        return paciente;
    }

    addMedico(medico) {
        medico.id = Date.now();
        medico.createdAt = new Date().toISOString();
        this.medicos.push(medico);
        this.saveData('medicos', this.medicos);
        return medico;
    }

    addCita(cita) {
        cita.id = Date.now();
        cita.createdAt = new Date().toISOString();
        this.citas.push(cita);
        this.saveData('citas', this.citas);
        return cita;
    }

    addUsuario(usuario) {
        usuario.id = Date.now();
        usuario.createdAt = new Date().toISOString();
        this.usuarios.push(usuario);
        this.saveData('usuarios', this.usuarios);
        return usuario;
    }

    deletePaciente(id) {
        this.pacientes = this.pacientes.filter(p => p.id !== id);
        this.saveData('pacientes', this.pacientes);
    }

    deleteMedico(id) {
        this.medicos = this.medicos.filter(m => m.id !== id);
        this.saveData('medicos', this.medicos);
    }

    deleteCita(id) {
        this.citas = this.citas.filter(c => c.id !== id);
        this.saveData('citas', this.citas);
    }

    deleteUsuario(id) {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.saveData('usuarios', this.usuarios);
    }
}

const dataManager = new DataManager();
let citaEnEdicionId = null;
let modoEdicionCita = 'crear';
let pacienteEnEdicionId = null;
let medicoEnEdicionId = null;
let usuarioEnEdicionId = null;
const TAMANIO_PAGINA_CITAS = 10;
let paginaActualCitas = 1;
let paginaActualCitasPasadas = 1;
const TAMANIO_PAGINA_USUARIOS = 8;
let paginaActualUsuarios = 1;

function fechaActualISO() {
    return fechaLocalISO(new Date());
}

function inicializarCalendariosModernos() {
    if (typeof flatpickr === 'undefined') return;

    const placeholdersFecha = {
        filtroFechaDia: 'Seleccionar dia',
        chartFechaDesde: 'Desde',
        chartFechaHasta: 'Hasta',
        filtroFechaDesdeCitas: 'Desde',
        filtroFechaHastaCitas: 'Hasta',
        filtroCitasPasadasDesde: 'Desde',
        filtroCitasPasadasHasta: 'Hasta',
        citaFecha: 'Seleccionar fecha',
        pacFecha: 'Fecha de nacimiento'
    };

    if (window.flatpickr && window.flatpickr.localize && window.flatpickr.l10ns && window.flatpickr.l10ns.es) {
        window.flatpickr.localize(window.flatpickr.l10ns.es);
    }

    const inputsFecha = document.querySelectorAll('input[type="date"]');
    inputsFecha.forEach(input => {
        if (!input || input.dataset.fpInit === 'true') return;

        const valorActual = input.value || '';
        input.type = 'text';

        const config = {
            dateFormat: 'Y-m-d',
            altInput: true,
            altFormat: 'd/m/Y',
            allowInput: false,
            disableMobile: true,
            locale: 'es',
            onReady: function(selectedDates, dateStr, instance) {
                const placeholder = placeholdersFecha[input.id] || 'Seleccionar fecha';
                if (instance.altInput) {
                    instance.altInput.placeholder = placeholder;
                    instance.altInput.setAttribute('aria-label', placeholder);
                }
            }
        };

        if (input.id === 'citaFecha') {
            config.minDate = fechaActualISO();
        }

        const instancia = flatpickr(input, config);
        if (valorActual) {
            instancia.setDate(valorActual, true, 'Y-m-d');
        }

        input.dataset.fpInit = 'true';
    });
}

function horaActualHHMM() {
    return new Date().toTimeString().slice(0, 5);
}

function fechaLocalISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatearHora12h(hora24) {
    if (!hora24) return '-';
    const [horas, minutos] = hora24.split(':');
    let h = parseInt(horas);
    const m = minutos;
    const periodo = h >= 12 ? 'pm' : 'am';
    h = h === 0 ? 12 : (h > 12 ? h - 12 : h);
    return `${h}:${m}${periodo}`;
}

function validarFechaHoraNoPasada(fecha, hora) {
    if (!fecha || !hora) return false;

    const ahora = new Date();
    const citaDate = new Date(`${fecha}T${hora}:00`);
    return citaDate.getTime() >= ahora.getTime();
}

function obtenerLimiteEspecialidadDia() {
    const limiteInput = document.getElementById('limiteEspecialidadDia');
    const limite = limiteInput ? parseInt(limiteInput.value, 10) : 6;
    return Number.isNaN(limite) || limite < 1 ? 6 : limite;
}

function correoValido(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(correo || '').trim());
}

function esCitaActiva(cita) {
    if (!cita) return false;
    const estado = String(cita.estado || 'pendiente').toLowerCase();
    const fecha = String(cita.fecha || '');
    const hoy = fechaActualISO();

    return !!fecha && fecha >= hoy && estado !== 'completada' && estado !== 'cancelada';
}

async function enviarCorreoConfirmacionCita(cita) {
    const paciente = dataManager.pacientes.find(p => String(p.id) === String(cita.paciente));
    const medico = dataManager.medicos.find(m => String(m.id) === String(cita.medico));
    const correoPaciente = (paciente?.correo || paciente?.email || '').trim();

    if (!correoPaciente) {
        return { ok: false, message: 'El paciente no tiene correo registrado' };
    }

    const response = await fetch('/api/notificaciones/cita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            destinatario: correoPaciente,
            pacienteNombre: `${paciente.nombre || ''} ${paciente.apellido || ''}`.trim(),
            medicoNombre: medico?.nombre || 'Médico asignado',
            fecha: cita.fecha,
            hora: formatearHora12h(cita.hora),
            especialidad: cita.especialidad,
            notas: cita.notas || ''
        })
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(result.message || 'No se pudo enviar el correo');
    }

    return { ok: true };
}

function contarCitasEspecialidadDia(especialidad, fecha, citaExcluirId = null) {
    return dataManager.citas.filter(cita => {
        if (citaExcluirId && cita.id === citaExcluirId) return false;
        if (cita.estado === 'cancelada') return false;
        return cita.especialidad === especialidad && cita.fecha === fecha;
    }).length;
}

// ============================================
// NOTIFICACIONES
// ============================================

function mostrarNotificacion(titulo, mensaje, tipo = 'success') {
    const notif = document.getElementById('notificacion');
    document.getElementById('notifTitulo').textContent = titulo;
    document.getElementById('notifMensaje').textContent = mensaje;
    
    notif.classList.remove('hidden', 'border-blue-500', 'border-green-500', 'border-red-500');
    
    const colores = {
        success: 'border-green-500',
        error: 'border-red-500',
        info: 'border-blue-500'
    };
    
    notif.classList.add(colores[tipo] || 'border-blue-500');
    notif.classList.remove('hidden');
    
    setTimeout(() => {
        notif.classList.add('hidden');
    }, 3000);
}

function toggleSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar || !overlay) return;

    const abierto = !sidebar.classList.contains('-translate-x-full');
    if (abierto) {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    } else {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    }
}

function cerrarSidebarMovil() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar || !overlay) return;
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
}

// ============================================
// NAVEGACIÓN
// ============================================

function mostrarSeccion(id) {
    const rolActual = localStorage.getItem('loggedInRol') || '';
    if (rolActual !== 'admin' && (id === 'medicos' || id === 'usuarios')) {
        mostrarNotificacion('Acceso Restringido', 'Solo el administrador puede acceder a esta sección', 'error');
        return;
    }

    // Ocultar todas las secciones
    document.querySelectorAll('.section-container').forEach(sec => {
        sec.classList.add('hidden');
    });

    // Mostrar sección seleccionada
    const section = document.getElementById(id);
    if (section) {
        section.classList.remove('hidden');
    }

    if (window.innerWidth < 1024) {
        cerrarSidebarMovil();
    }

    // Actualizar menú activo
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-indigo-700');
    });
    
    const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (activeLink) {
        activeLink.classList.add('bg-indigo-700');
    }

    // Cargar datos específicos de la sección
    if (id === 'resumen') {
        actualizarKPIs();
        actualizarCitasDia();
        setTimeout(() => initCharts(), 100);
    } else if (id === 'pacientes') {
        actualizarTablaPacientes();
    } else if (id === 'medicos') {
        actualizarGridMedicos();
    } else if (id === 'citas') {
        actualizarTablaCitas();
        actualizarCitasPasadas();
    } else if (id === 'usuarios') {
        actualizarTablaUsuarios();
    }
}

// ============================================
// DASHBOARD - GRÁFICOS
// ============================================

let charts = {};

function initCharts() {
    const ctxEspecialidades = document.getElementById('chartEspecialidades');
    if (typeof Chart === 'undefined') {
        const contenedor = document.getElementById('chartEspecialidades')?.parentElement;
        if (contenedor) {
            contenedor.innerHTML = '<p class="text-sm text-red-600 font-medium text-center">No se pudo cargar Chart.js. Verifica tu conexión para ver el gráfico.</p>';
        }
        return;
    }

    if (ctxEspecialidades && ctxEspecialidades.getContext) {
        if (charts.especialidades) {
            charts.especialidades.destroy();
        }

        const fechaDesde = document.getElementById('chartFechaDesde')?.value || '';
        const fechaHasta = document.getElementById('chartFechaHasta')?.value || '';

        const citasFiltradas = dataManager.citas.filter(cita => {
            const fecha = cita.fecha || '';
            if (fechaDesde && fecha < fechaDesde) return false;
            if (fechaHasta && fecha > fechaHasta) return false;
            return true;
        });

        // Contar citas por especialidad
        const especialidades = {
            'Cardiología': 0,
            'Pediatría': 0,
            'Dermatología': 0,
            'Oftalmología': 0,
            'Neurocirugía': 0
        };
        
        citasFiltradas.forEach(cita => {
            const especialidad = (cita.especialidad || '').trim() || 'Sin especialidad';
            if (!Object.prototype.hasOwnProperty.call(especialidades, especialidad)) {
                especialidades[especialidad] = 0;
            }
            especialidades[especialidad]++;
        });

        const palette = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#0ea5e9', '#8b5cf6', '#14b8a6'];
        const colors = Object.keys(especialidades).map((_, idx) => palette[idx % palette.length]);

        charts.especialidades = new Chart(ctxEspecialidades, {
            type: 'bar',
            data: {
                labels: Object.keys(especialidades),
                datasets: [{
                    label: 'Citas por Especialidad',
                    data: Object.values(especialidades),
                    backgroundColor: colors,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 12 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { font: { size: 12 } }
                    },
                    x: {
                        ticks: { font: { size: 12 } }
                    }
                }
            }
        });
    }
}

function limpiarFiltroChart() {
    const desde = document.getElementById('chartFechaDesde');
    const hasta = document.getElementById('chartFechaHasta');
    if (desde) desde.value = '';
    if (hasta) hasta.value = '';
    initCharts();
}

async function cargarJSPDFSiNecesario() {
    if (window.jspdf || window.jsPDF) {
        return;
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.crossOrigin = 'anonymous';
        script.referrerPolicy = 'no-referrer';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('No se pudo cargar jspdf desde CDN'));
        document.head.appendChild(script);
    });
}

async function generarPDFEspecialidad() {
    const canvas = document.getElementById('chartEspecialidades');
    if (!canvas) {
        mostrarNotificacion('Error', 'No se encontró el gráfico de especialidades', 'error');
        return;
    }

    await cargarJSPDFSiNecesario().catch(error => {
        console.error('Error cargando jsPDF', error);
        mostrarNotificacion('Error', 'No se pudo cargar la librería jsPDF', 'error');
        throw error;
    });

    const fechaDesde = document.getElementById('chartFechaDesde')?.value || '';
    const fechaHasta = document.getElementById('chartFechaHasta')?.value || '';

    const citasFiltradas = dataManager.citas.filter(cita => {
        const fecha = cita.fecha || '';
        if (fechaDesde && fecha < fechaDesde) return false;
        if (fechaHasta && fecha > fechaHasta) return false;
        return true;
    });

    const totalCitas = citasFiltradas.length;
    const especialidades = {};

    citasFiltradas.forEach(cita => {
        const esp = cita.especialidad || 'Sin Especialidad';
        especialidades[esp] = (especialidades[esp] || 0) + 1;
    });

    let imgData = null;
    if (charts.especialidades && typeof charts.especialidades.toBase64Image === 'function') {
        imgData = charts.especialidades.toBase64Image();
    }

    try {
        if (!imgData) {
            // Fallback manual si Chart.js no provee el método
            const canvasRendered = await html2canvas(canvas, {
                backgroundColor: '#ffffff',
                scale: 2,
                useCORS: true
            });
            imgData = canvasRendered.toDataURL('image/png');
        }

        let PdfConstructor = null;
        if (window.jspdf && window.jspdf.jsPDF) {
            PdfConstructor = window.jspdf.jsPDF;
        } else if (window.jsPDF) {
            PdfConstructor = window.jsPDF;
        } else if (window.jspdf) {
            PdfConstructor = window.jspdf;
        }

        if (!PdfConstructor) {
            console.error('jsPDF no está disponible', window.jspdf, window.jsPDF);
            mostrarNotificacion('Error', 'No se encontró la librería jsPDF', 'error');
            return;
        }

        const pdf = new PdfConstructor({ orientation: 'landscape', unit: 'pt', format: 'a4' });

        const title = 'Reporte de Citas por Especialidad';
        const timestamp = new Date().toLocaleString('es-ES');
        const margin = 40;
        let cursorY = 40;

        pdf.setFontSize(18);
        pdf.text(title, margin, cursorY);

        pdf.setFontSize(11);
        pdf.text(`Generado: ${timestamp}`, margin, cursorY + 20);
        const rangoTexto = (fechaDesde || fechaHasta)
            ? `Rango: ${fechaDesde || 'inicio'} — ${fechaHasta || 'fin'}`
            : 'Rango: Todas las fechas';
        pdf.text(rangoTexto, margin, cursorY + 36);
        pdf.text(`Total de citas: ${totalCitas}`, margin, cursorY + 52);

        cursorY += 76;

        pdf.setFontSize(12);
        pdf.text('Citas por especialidad:', margin, cursorY);
        cursorY += 18;

        Object.keys(especialidades).forEach(especialidad => {
            pdf.text(`- ${especialidad}: ${especialidades[especialidad]}`, margin + 10, cursorY);
            cursorY += 16;
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const chartWidth = pageWidth - margin * 2;
        const chartHeight = (canvas.width / canvas.height) * chartWidth;

        let renderHeight = chartHeight;
        if (chartHeight > pageHeight - cursorY - 80) {
            renderHeight = pageHeight - cursorY - 80;
        }

        pdf.addImage(imgData, 'PNG', margin, cursorY + 10, chartWidth, renderHeight);

        pdf.save('citas_por_especialidad.pdf');

        mostrarNotificacion('¡Listo!', 'PDF generado correctamente', 'success');
    } catch (error) {
        console.error('Error generando PDF', error);
        mostrarNotificacion('Error', `No se pudo generar el PDF: ${error.message || error}`, 'error');
    }
}

// ============================================
// MODALES
// ============================================

function abrirModalPaciente() {
    document.getElementById('modalPaciente').classList.remove('hidden');
    pacienteEnEdicionId = null;
    const titulo = document.getElementById('modalPacienteTitulo');
    const btn = document.getElementById('btnGuardarPaciente');
    if (titulo) titulo.textContent = 'Registrar Paciente';
    if (btn) btn.textContent = 'Guardar';
}

function cerrarModalPaciente() {
    document.getElementById('modalPaciente').classList.add('hidden');
    document.getElementById('pacNombre').value = '';
    document.getElementById('pacApellido').value = '';
    document.getElementById('pacCedula').value = '';
    document.getElementById('pacMatricula').value = '';
    document.getElementById('pacFecha').value = '';
    document.getElementById('pacTelefono').value = '';
    document.getElementById('pacCorreo').value = '';
    document.getElementById('pacSangre').value = '';
    document.getElementById('pacDireccion').value = '';
    pacienteEnEdicionId = null;
}

function abrirModalMedico() {
    document.getElementById('modalMedico').classList.remove('hidden');
    medicoEnEdicionId = null;
    const titulo = document.getElementById('modalMedicoTitulo');
    const btn = document.getElementById('btnGuardarMedico');
    if (titulo) titulo.textContent = 'Registrar Médico';
    if (btn) btn.textContent = 'Guardar';
}

function cerrarModalMedico() {
    document.getElementById('modalMedico').classList.add('hidden');
    document.getElementById('medNombre').value = '';
    document.getElementById('medEspecialidad').value = '';
    document.getElementById('medCedula').value = '';
    document.getElementById('medTelefono').value = '';
    document.getElementById('medCorreo').value = '';
    medicoEnEdicionId = null;
}

// ============================================
// TIME PICKER FUNCTIONS
// ============================================

function actualizarDisplayHora() {
    const hora = parseInt(document.getElementById('citaHoraNum').value) || 12;
    const minuto = String(parseInt(document.getElementById('citaMinutoNum').value) || 0).padStart(2, '0');
    const periodo = document.getElementById('citaPeriodo').value;
    document.getElementById('citaHoraDisplay').textContent = `${String(hora).padStart(2, '0')}:${minuto} ${periodo}`;
    
    // Convertir a formato 24h para guardar
    let hora24 = hora;
    if (periodo === 'AM' && hora === 12) {
        hora24 = 0;
    } else if (periodo === 'PM' && hora !== 12) {
        hora24 = hora + 12;
    }
    document.getElementById('citaHora').value = `${String(hora24).padStart(2, '0')}:${minuto}`;
}

function incrementarHora() {
    const horaNum = document.getElementById('citaHoraNum');
    let hora = parseInt(horaNum.value) || 12;
    hora = hora === 12 ? 1 : hora + 1;
    horaNum.value = hora;
    actualizarDisplayHora();
}

function decrementarHora() {
    const horaNum = document.getElementById('citaHoraNum');
    let hora = parseInt(horaNum.value) || 12;
    hora = hora === 1 ? 12 : hora - 1;
    horaNum.value = hora;
    actualizarDisplayHora();
}

function incrementarMinuto() {
    const minutoNum = document.getElementById('citaMinutoNum');
    let minuto = parseInt(minutoNum.value) || 0;
    minuto = (minuto + 5) >= 60 ? 0 : minuto + 5;
    minutoNum.value = String(minuto).padStart(2, '0');
    actualizarDisplayHora();
}

function decrementarMinuto() {
    const minutoNum = document.getElementById('citaMinutoNum');
    let minuto = parseInt(minutoNum.value) || 0;
    minuto = (minuto - 5) < 0 ? 55 : minuto - 5;
    minutoNum.value = String(minuto).padStart(2, '0');
    actualizarDisplayHora();
}

function abrirModalCita() {
    document.getElementById('modalCita').classList.remove('hidden');
    cargarSelectsCitaModal();
    citaEnEdicionId = null;
    modoEdicionCita = 'crear';

    // Inicializar hora a 12:00 PM
    document.getElementById('citaHoraNum').value = '12';
    document.getElementById('citaMinutoNum').value = '00';
    document.getElementById('citaPeriodo').value = 'PM';
    actualizarDisplayHora();

    const fechaInput = document.getElementById('citaFecha');
    const titulo = document.getElementById('modalCitaTitulo');
    const btnGuardar = document.getElementById('btnGuardarCita');

    if (fechaInput) {
        fechaInput.min = fechaActualISO();
        // IMPORTANTE: Establecer la fecha actual como valor por defecto
        fechaInput.value = fechaActualISO();
    }
    if (titulo) titulo.textContent = 'Agendar Cita';
    if (btnGuardar) btnGuardar.textContent = 'Agendar';
}

function cerrarModalCita() {
    document.getElementById('modalCita').classList.add('hidden');
    document.getElementById('citaPaciente').value = '';
    document.getElementById('citaMedico').value = '';
    document.getElementById('citaFecha').value = '';
    document.getElementById('citaHora').value = '';
    document.getElementById('citaHoraNum').value = '12';
    document.getElementById('citaMinutoNum').value = '00';
    document.getElementById('citaPeriodo').value = 'PM';
    document.getElementById('citaNotas').value = '';
    document.getElementById('citaPaciente').disabled = false;
    document.getElementById('citaMedico').disabled = false;
    citaEnEdicionId = null;
    modoEdicionCita = 'crear';
}

// ============================================
// GUARDAR DATOS
// ============================================

function guardarPaciente() {
    const nombre = document.getElementById('pacNombre').value.trim();
    const apellido = document.getElementById('pacApellido').value.trim();
    const cedula = document.getElementById('pacCedula').value.trim();
    const correo = document.getElementById('pacCorreo').value.trim();

    if (!nombre || !apellido || !cedula) {
        mostrarNotificacion('Error', 'Por favor completa los campos requeridos', 'error');
        return;
    }

    if (correo && !correoValido(correo)) {
        mostrarNotificacion('Error', 'Ingresa un correo valido para el paciente', 'error');
        return;
    }

    const paciente = {
        nombre,
        apellido,
        cedula,
        matricula: document.getElementById('pacMatricula').value.trim(),
        fecha: document.getElementById('pacFecha').value,
        telefono: document.getElementById('pacTelefono').value,
        correo,
        sangre: document.getElementById('pacSangre').value,
        direccion: document.getElementById('pacDireccion').value
    };
    const usuarioActual = localStorage.getItem('loggedInUser') || '-';

    if (pacienteEnEdicionId) {
        const existente = dataManager.pacientes.find(p => p.id === pacienteEnEdicionId);
        if (!existente) {
            mostrarNotificacion('Error', 'No se encontró el paciente a editar', 'error');
            return;
        }
        Object.assign(existente, paciente, {
            updatedAt: new Date().toISOString(),
            accion: 'Editado',
            accionPor: usuarioActual,
            accionAt: new Date().toISOString()
        });
        dataManager.saveData('pacientes', dataManager.pacientes);
        mostrarNotificacion('¡Éxito!', 'Paciente actualizado correctamente', 'success');
    } else {
        paciente.accion = 'Creado';
        paciente.accionPor = usuarioActual;
        paciente.accionAt = new Date().toISOString();
        dataManager.addPaciente(paciente);
        mostrarNotificacion('¡Éxito!', 'Paciente registrado correctamente', 'success');
    }

    cerrarModalPaciente();
    actualizarTablaPacientes();
    actualizarKPIs();
}

function guardarMedico() {
    const nombre = document.getElementById('medNombre').value.trim();
    const especialidad = document.getElementById('medEspecialidad').value.trim();

    if (!nombre || !especialidad) {
        mostrarNotificacion('Error', 'Por favor completa los campos requeridos', 'error');
        return;
    }

    const medico = {
        nombre,
        especialidad,
        cedula: document.getElementById('medCedula').value,
        telefono: document.getElementById('medTelefono').value,
        correo: document.getElementById('medCorreo').value,
        estado: 'activo'
    };
    const usuarioActual = localStorage.getItem('loggedInUser') || '-';

    if (medicoEnEdicionId) {
        const existente = dataManager.medicos.find(m => m.id === medicoEnEdicionId);
        if (!existente) {
            mostrarNotificacion('Error', 'No se encontró el médico a editar', 'error');
            return;
        }
        Object.assign(existente, medico, {
            updatedAt: new Date().toISOString(),
            accion: 'Editado',
            accionPor: usuarioActual,
            accionAt: new Date().toISOString()
        });
        dataManager.saveData('medicos', dataManager.medicos);
        mostrarNotificacion('¡Éxito!', 'Médico actualizado correctamente', 'success');
    } else {
        medico.accion = 'Creado';
        medico.accionPor = usuarioActual;
        medico.accionAt = new Date().toISOString();
        dataManager.addMedico(medico);
        mostrarNotificacion('¡Éxito!', 'Médico registrado correctamente', 'success');
    }

    cerrarModalMedico();
    actualizarGridMedicos();
    actualizarKPIs();
}

async function guardarCita() {
    const paciente = document.getElementById('citaPaciente').value;
    const medico = document.getElementById('citaMedico').value;
    const fecha = document.getElementById('citaFecha').value;
    const hora = document.getElementById('citaHora').value;
    const medicoSeleccionado = dataManager.medicos.find(m => String(m.id) === String(medico));
    const especialidad = (medicoSeleccionado?.especialidad || '').trim();
    const pacienteSeleccionado = dataManager.pacientes.find(p => String(p.id) === String(paciente));

    if (!paciente || Number.isNaN(Number(paciente))) {
        mostrarNotificacion('Error', 'Selecciona un paciente', 'error');
        return;
    }
    if (!medico || Number.isNaN(Number(medico))) {
        mostrarNotificacion('Error', 'Selecciona un médico', 'error');
        return;
    }
    if (!fecha) {
        mostrarNotificacion('Error', 'Selecciona la fecha de la cita', 'error');
        return;
    }
    if (!hora) {
        mostrarNotificacion('Error', 'Selecciona la hora de la cita', 'error');
        return;
    }
    if (!especialidad) {
        mostrarNotificacion('Error', 'El medico seleccionado no tiene especialidad configurada', 'error');
        return;
    }
    if (!pacienteSeleccionado || !correoValido(pacienteSeleccionado.correo || pacienteSeleccionado.email || '')) {
        mostrarNotificacion('Error', 'El paciente debe tener un correo valido registrado para recibir la confirmacion', 'error');
        return;
    }
    if (!validarFechaHoraNoPasada(fecha, hora)) {
        mostrarNotificacion('Error', 'No se permiten fechas ni horas pasadas', 'error');
        return;
    }

    const limitePorDia = obtenerLimiteEspecialidadDia();
    const citasMismaEspecialidadDia = contarCitasEspecialidadDia(especialidad, fecha, citaEnEdicionId);
    if (citasMismaEspecialidadDia >= limitePorDia) {
        mostrarNotificacion('Error', `Limite alcanzado: ${limitePorDia} pacientes para ${especialidad} en ${fecha}`, 'error');
        return;
    }

    const notas = document.getElementById('citaNotas').value;

    if (citaEnEdicionId) {
        const cita = dataManager.citas.find(c => c.id === citaEnEdicionId);
        if (!cita) {
            mostrarNotificacion('Error', 'No se encontro la cita a editar', 'error');
            return;
        }

        cita.paciente = paciente;
        cita.medico = medico;
        cita.fecha = fecha;
        cita.hora = hora;
        cita.especialidad = especialidad;
        cita.notas = notas;
        cita.updatedAt = new Date().toISOString();
        cita.accion = modoEdicionCita === 'reprogramar' ? 'Reprogramada' : 'Editada';
        cita.accionPor = localStorage.getItem('loggedInUser') || '-';
        cita.accionAt = new Date().toISOString();

        dataManager.saveData('citas', dataManager.citas);
        mostrarNotificacion('¡Exito!', modoEdicionCita === 'reprogramar' ? 'Cita reprogramada correctamente' : 'Cita actualizada correctamente', 'success');
    } else {
        const cita = {
            paciente,
            medico,
            fecha,
            hora,
            especialidad,
            notas,
            estado: 'pendiente',
            accion: 'Creada',
            accionPor: localStorage.getItem('loggedInUser') || '-',
            accionAt: new Date().toISOString()
        };

        dataManager.addCita(cita);
        mostrarNotificacion('¡Exito!', 'Cita agendada correctamente', 'success');

        try {
            const correoResult = await enviarCorreoConfirmacionCita(cita);
            if (correoResult.ok) {
                mostrarNotificacion('¡Éxito!', 'Cita agendada y correo enviado correctamente', 'success');
            } else if (correoResult.message) {
                mostrarNotificacion('Aviso', correoResult.message, 'info');
            }
        } catch (error) {
            mostrarNotificacion('Aviso', error.message || 'La cita se guardó, pero no se pudo enviar el correo', 'info');
        }
    }
    cerrarModalCita();
    actualizarTablaCitas();
    actualizarCitasDia();
    actualizarKPIs();
    initCharts();
}

// ============================================
// CARGAR DATOS EN SELECTS
// ============================================

function cargarSelectsCitaModal() {
    const selectPaciente = document.getElementById('citaPaciente');
    const selectMedico = document.getElementById('citaMedico');

    selectPaciente.innerHTML = '<option value="">Seleccionar paciente *</option>';
    dataManager.pacientes.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = `${p.nombre} ${p.apellido} - ${p.cedula}`;
        selectPaciente.appendChild(option);
    });

    selectMedico.innerHTML = '<option value="">Seleccionar médico *</option>';
    dataManager.medicos.forEach(m => {
        const option = document.createElement('option');
        option.value = m.id;
        option.textContent = `${m.nombre} - ${m.especialidad}`;
        selectMedico.appendChild(option);
    });
}

// ============================================
// ACTUALIZAR TABLAS Y GRILLAS
// ============================================

function actualizarKPIs() {
    const kpiPacientes = document.getElementById('kpi-pacientes');
    if (kpiPacientes) kpiPacientes.textContent = dataManager.pacientes.length;
    
    const kpiMedicos = document.getElementById('kpi-medicos');
    if (kpiMedicos) kpiMedicos.textContent = dataManager.medicos.length;
    
    const kpiCitas = document.getElementById('kpi-citas');
    if (kpiCitas) kpiCitas.textContent = dataManager.citas.length;

    const kpiCitasActivas = document.getElementById('kpi-citas-activas');
    if (kpiCitasActivas) {
        const citasActivas = dataManager.citas.filter(esCitaActiva).length;
        kpiCitasActivas.textContent = citasActivas;
    }
    
    // Actualizar estadísticas
    const statPacientes = document.getElementById('stat-pacientes');
    if (statPacientes) statPacientes.textContent = dataManager.pacientes.length;
    
    const statMedicos = document.getElementById('stat-medicos');
    if (statMedicos) statMedicos.textContent = dataManager.medicos.length;
    
    const statCitas = document.getElementById('stat-citas');
    if (statCitas) statCitas.textContent = dataManager.citas.length;
}

function actualizarTablaPacientes() {
    const tabla = document.getElementById('tablaPacientes');
    const search = (document.getElementById('searchPaciente')?.value || '').toLowerCase().trim();
    const pacientesFiltrados = dataManager.pacientes.filter(p => {
        if (!search) return true;
        const nombre = `${p.nombre || ''} ${p.apellido || ''}`.toLowerCase();
        const cedula = (p.cedula || '').toLowerCase();
        return nombre.includes(search) || cedula.includes(search);
    });
    
    if (pacientesFiltrados.length === 0) {
        tabla.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-gray-500">No hay pacientes registrados. ¡Agrega uno!</td></tr>';
        return;
    }

    tabla.innerHTML = pacientesFiltrados.map(p => {
        const accionTexto = p.accion || 'Creado';
        const accionPor = p.accionPor || '-';
        const accionAt = p.accionAt ? new Date(p.accionAt).toLocaleString('es-ES', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '-';
        return `
        <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">${p.nombre} ${p.apellido || ''}</td>
            <td class="px-6 py-4">${p.cedula}</td>
            <td class="px-6 py-4">${p.matricula || '-'}</td>
            <td class="px-6 py-4">${p.telefono || '-'}</td>
            <td class="px-6 py-4">${p.correo || '-'}</td>
            <td class="px-6 py-4">
                <span class="block font-semibold text-gray-700 text-xs">${accionTexto}</span>
                <span class="block text-indigo-600 text-xs font-medium">${accionPor}</span>
                <span class="block text-gray-400 text-xs">${accionAt}</span>
            </td>
            <td class="px-6 py-4">
                <button onclick="editarPaciente(${p.id})" class="text-indigo-600 hover:text-indigo-800 transition-colors mr-2" title="Editar paciente">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button onclick="eliminarPaciente(${p.id})" class="text-red-500 hover:text-red-700 transition-colors">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    `;
    }).join('');
}

function actualizarGridMedicos() {
    const grid = document.getElementById('gridMedicos');
    const search = (document.getElementById('searchMedico')?.value || '').toLowerCase().trim();
    const medicosFiltrados = dataManager.medicos.filter(m => {
        if (!search) return true;
        const nombre = (m.nombre || '').toLowerCase();
        const especialidad = (m.especialidad || '').toLowerCase();
        return nombre.includes(search) || especialidad.includes(search);
    });

    const totalMedicos = document.getElementById('medicosTotal');
    const totalEspecialidades = document.getElementById('medicosEspecialidades');
    const especialidadesUnicas = new Set(dataManager.medicos.map(m => (m.especialidad || '').trim()).filter(Boolean));
    if (totalMedicos) totalMedicos.textContent = String(dataManager.medicos.length);
    if (totalEspecialidades) totalEspecialidades.textContent = String(especialidadesUnicas.size);
    
    if (medicosFiltrados.length === 0) {
        grid.innerHTML = '<div class="bg-white rounded-2xl card-shadow p-6 text-center col-span-3 py-12"><span class="material-symbols-outlined text-6xl opacity-30 block mb-3 mx-auto">stethoscope</span><p class="text-gray-500 font-medium">No hay médicos registrados</p></div>';
        return;
    }

    grid.innerHTML = medicosFiltrados.map(m => {
        const accionTexto = m.accion || 'Creado';
        const accionPor = m.accionPor || '-';
        const accionAt = m.accionAt ? new Date(m.accionAt).toLocaleString('es-ES', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '-';
        return `
        <div class="bg-white rounded-2xl card-shadow p-6 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-black shadow-lg">
                    ${m.nombre.charAt(0)}
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="editarMedico(${m.id})" class="text-indigo-600 hover:text-indigo-800 transition-colors hover:scale-110" title="Editar médico">
                        <span class="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onclick="eliminarMedico(${m.id})" class="text-red-500 hover:text-red-700 transition-colors hover:scale-110" title="Eliminar médico">
                        <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">${m.nombre}</h3>
            <p class="text-sm font-semibold text-indigo-600 mb-4 tracking-wide">${m.especialidad}</p>
            <div class="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
                <p class="font-medium"><strong class="text-gray-800">Teléfono:</strong> ${m.telefono || '-'}</p>
                <p class="font-medium"><strong class="text-gray-800">Correo:</strong> ${m.correo || '-'}</p>
                <p class="font-medium"><strong class="text-gray-800">Estado:</strong> <span class="text-green-600 font-bold bg-green-100 px-2 py-1 rounded text-xs">${m.estado || 'Activo'}</span></p>
                <div class="pt-2 border-t border-gray-100 mt-2">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Última acción</p>
                    <p class="text-xs font-semibold text-gray-700">${accionTexto}</p>
                    <p class="text-xs font-medium text-indigo-600">${accionPor}</p>
                    <p class="text-xs text-gray-400">${accionAt}</p>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

function obtenerUsuariosFiltrados() {
    const search = (document.getElementById('searchUsuario')?.value || '').toLowerCase().trim();
    const filtroRol = (document.getElementById('filtroRolUsuario')?.value || '').toLowerCase().trim();
    const filtroEstado = (document.getElementById('filtroEstadoUsuario')?.value || '').toLowerCase().trim();

    return dataManager.usuarios.filter(u => {
        const texto = `${u.nombre || ''} ${u.username || ''} ${u.correo || ''}`.toLowerCase();
        const cumpleSearch = !search || texto.includes(search);
        const cumpleRol = !filtroRol || (u.rol || '').toLowerCase() === filtroRol;
        const cumpleEstado = !filtroEstado || (u.estado || '').toLowerCase() === filtroEstado;
        return cumpleSearch && cumpleRol && cumpleEstado;
    });
}

function actualizarEstadisticasUsuarios(usuariosFiltrados) {
    const total = dataManager.usuarios.length;
    const activos = dataManager.usuarios.filter(u => u.estado === 'activo').length;
    const inactivos = total - activos;
    const admins = dataManager.usuarios.filter(u => u.rol === 'admin').length;

    const usuariosTotal = document.getElementById('usuariosTotal');
    const usuariosActivos = document.getElementById('usuariosActivos');
    const usuariosInactivos = document.getElementById('usuariosInactivos');
    const usuariosAdmins = document.getElementById('usuariosAdmins');
    const resumen = document.getElementById('resumenUsuarios');

    if (usuariosTotal) usuariosTotal.textContent = total;
    if (usuariosActivos) usuariosActivos.textContent = activos;
    if (usuariosInactivos) usuariosInactivos.textContent = inactivos;
    if (usuariosAdmins) usuariosAdmins.textContent = admins;
    if (resumen) resumen.textContent = `Mostrando ${usuariosFiltrados.length} de ${total} usuarios.`;
}

function actualizarTablaUsuarios() {
    const tabla = document.getElementById('tablaUsuarios');
    if (!tabla) return;

    const usuariosFiltrados = obtenerUsuariosFiltrados();
    actualizarEstadisticasUsuarios(usuariosFiltrados);

    const totalPaginas = Math.max(1, Math.ceil(usuariosFiltrados.length / TAMANIO_PAGINA_USUARIOS));
    if (paginaActualUsuarios > totalPaginas) paginaActualUsuarios = totalPaginas;
    const inicio = (paginaActualUsuarios - 1) * TAMANIO_PAGINA_USUARIOS;
    const usuariosPagina = usuariosFiltrados.slice(inicio, inicio + TAMANIO_PAGINA_USUARIOS);

    const usuarioSesionActual = localStorage.getItem('loggedInUser') || '-';
    const etiquetaSesion = document.getElementById('usuarioSesionActual');
    if (etiquetaSesion) etiquetaSesion.textContent = `Sesión actual: ${usuarioSesionActual}`;

    if (usuariosPagina.length === 0) {
        tabla.innerHTML = '<tr><td colspan="6" class="px-6 py-12 text-center text-gray-500 font-medium"><span class="material-symbols-outlined text-5xl opacity-30 block mb-3">admin_panel_settings</span>No hay usuarios para mostrar.</td></tr>';
        renderControlesPaginacion('paginacionUsuarios', 1, 1, 'irPaginaUsuarios');
        return;
    }

    tabla.innerHTML = usuariosPagina.map(u => {
        const rolClase = u.rol === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800';
        const estadoClase = u.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
        const ultimo = u.ultimoAcceso ? new Date(u.ultimoAcceso).toLocaleString('es-DO') : 'Nunca';

        return `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-semibold text-gray-800">${u.username}</td>
                <td class="px-6 py-4"><p class="font-medium text-gray-800">${u.nombre || '-'}</p><p class="text-xs text-gray-500">${u.correo || '-'}</p></td>
                <td class="px-6 py-4"><span class="px-3 py-1 rounded-full text-xs font-bold ${rolClase}">${u.rol || '-'}</span></td>
                <td class="px-6 py-4"><span class="px-3 py-1 rounded-full text-xs font-bold ${estadoClase}">${u.estado || '-'}</span></td>
                <td class="px-6 py-4 text-sm text-gray-600">${ultimo}</td>
                <td class="px-6 py-4">
                    <button onclick="editarUsuario(${u.id})" class="text-indigo-600 hover:text-indigo-800 transition-colors mr-2" title="Editar"><span class="material-symbols-outlined">edit</span></button>
                    <button onclick="toggleEstadoUsuario(${u.id})" class="text-amber-600 hover:text-amber-800 transition-colors mr-2" title="Activar/Desactivar"><span class="material-symbols-outlined">toggle_on</span></button>
                    <button onclick="resetPasswordUsuario(${u.id})" class="text-sky-600 hover:text-sky-800 transition-colors mr-2" title="Reset Password"><span class="material-symbols-outlined">lock_reset</span></button>
                    <button onclick="eliminarUsuario(${u.id})" class="text-red-500 hover:text-red-700 transition-colors" title="Eliminar"><span class="material-symbols-outlined">delete</span></button>
                </td>
            </tr>
        `;
    }).join('');

    renderControlesPaginacion('paginacionUsuarios', paginaActualUsuarios, totalPaginas, 'irPaginaUsuarios');
}

function irPaginaUsuarios(pagina) {
    paginaActualUsuarios = pagina;
    actualizarTablaUsuarios();
}

function abrirModalUsuario() {
    document.getElementById('modalUsuario').classList.remove('hidden');
    usuarioEnEdicionId = null;
    const titulo = document.getElementById('modalUsuarioTitulo');
    const btn = document.getElementById('btnGuardarUsuario');
    const pass = document.getElementById('usrPassword');
    const hint = document.getElementById('usrPasswordHint');
    if (titulo) titulo.textContent = 'Registrar Usuario';
    if (btn) btn.textContent = 'Guardar';
    if (pass) pass.placeholder = 'Contraseña *';
    if (hint) hint.textContent = 'Debes definir una contraseña para el nuevo usuario.';
}

function cerrarModalUsuario() {
    document.getElementById('modalUsuario').classList.add('hidden');
    document.getElementById('usrNombre').value = '';
    document.getElementById('usrUsername').value = '';
    document.getElementById('usrCorreo').value = '';
    document.getElementById('usrRol').value = '';
    document.getElementById('usrEstado').value = 'activo';
    document.getElementById('usrPassword').value = '';
    usuarioEnEdicionId = null;
}

function guardarUsuario() {
    const nombre = document.getElementById('usrNombre').value.trim();
    const username = document.getElementById('usrUsername').value.trim();
    const correo = document.getElementById('usrCorreo').value.trim();
    const rol = document.getElementById('usrRol').value;
    const estado = document.getElementById('usrEstado').value;
    const password = document.getElementById('usrPassword').value;

    if (!nombre || !username || !correo || !rol) {
        mostrarNotificacion('Error', 'Completa todos los campos requeridos', 'error');
        return;
    }

    const usernameEnUso = dataManager.usuarios.some(u => u.username.toLowerCase() === username.toLowerCase() && u.id !== usuarioEnEdicionId);
    if (usernameEnUso) {
        mostrarNotificacion('Error', 'El nombre de usuario ya existe', 'error');
        return;
    }

    if (!usuarioEnEdicionId && !password) {
        mostrarNotificacion('Error', 'La contraseña es obligatoria para nuevos usuarios', 'error');
        return;
    }

    if (usuarioEnEdicionId) {
        const usuario = dataManager.usuarios.find(u => u.id === usuarioEnEdicionId);
        if (!usuario) {
            mostrarNotificacion('Error', 'No se encontró el usuario a editar', 'error');
            return;
        }
        usuario.nombre = nombre;
        usuario.username = username;
        usuario.correo = correo;
        usuario.rol = rol;
        usuario.estado = estado;
        if (password) usuario.password = password;
        usuario.updatedAt = new Date().toISOString();
        dataManager.saveData('usuarios', dataManager.usuarios);
        mostrarNotificacion('¡Éxito!', 'Usuario actualizado correctamente', 'success');
    } else {
        dataManager.addUsuario({ nombre, username, correo, rol, estado, password, ultimoAcceso: null });
        mostrarNotificacion('¡Éxito!', 'Usuario creado correctamente', 'success');
    }

    cerrarModalUsuario();
    actualizarTablaUsuarios();
}

function editarUsuario(id) {
    const usuario = dataManager.usuarios.find(u => u.id === id);
    if (!usuario) return;

    abrirModalUsuario();
    usuarioEnEdicionId = id;
    document.getElementById('usrNombre').value = usuario.nombre || '';
    document.getElementById('usrUsername').value = usuario.username || '';
    document.getElementById('usrCorreo').value = usuario.correo || '';
    document.getElementById('usrRol').value = usuario.rol || '';
    document.getElementById('usrEstado').value = usuario.estado || 'activo';
    document.getElementById('usrPassword').value = '';

    const titulo = document.getElementById('modalUsuarioTitulo');
    const btn = document.getElementById('btnGuardarUsuario');
    const pass = document.getElementById('usrPassword');
    const hint = document.getElementById('usrPasswordHint');
    if (titulo) titulo.textContent = 'Editar Usuario';
    if (btn) btn.textContent = 'Actualizar';
    if (pass) pass.placeholder = 'Nueva contraseña (opcional)';
    if (hint) hint.textContent = 'Deja la contraseña vacía para mantener la actual.';
}

function toggleEstadoUsuario(id) {
    const usuario = dataManager.usuarios.find(u => u.id === id);
    if (!usuario) return;

    const usuarioActual = localStorage.getItem('loggedInUser');
    if (usuario.username === usuarioActual && usuario.estado === 'activo') {
        mostrarNotificacion('Error', 'No puedes desactivar tu propio usuario en sesión', 'error');
        return;
    }

    usuario.estado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
    dataManager.saveData('usuarios', dataManager.usuarios);
    mostrarNotificacion('¡Éxito!', `Usuario ${usuario.estado === 'activo' ? 'activado' : 'desactivado'} correctamente`, 'success');
    actualizarTablaUsuarios();
}

function resetPasswordUsuario(id) {
    const usuario = dataManager.usuarios.find(u => u.id === id);
    if (!usuario) return;
    usuario.password = '123456';
    dataManager.saveData('usuarios', dataManager.usuarios);
    mostrarNotificacion('¡Éxito!', `Contraseña reseteada para ${usuario.username} (temporal: 123456)`, 'info');
}

function eliminarUsuario(id) {
    const usuario = dataManager.usuarios.find(u => u.id === id);
    if (!usuario) return;

    const usuarioActual = localStorage.getItem('loggedInUser');
    if (usuario.username === usuarioActual) {
        mostrarNotificacion('Error', 'No puedes eliminar tu propio usuario en sesión', 'error');
        return;
    }

    const adminsActivos = dataManager.usuarios.filter(u => u.rol === 'admin' && u.estado === 'activo');
    if (usuario.rol === 'admin' && adminsActivos.length <= 1) {
        mostrarNotificacion('Error', 'Debe quedar al menos un administrador activo', 'error');
        return;
    }

    if (confirm(`¿Eliminar usuario ${usuario.username}?`)) {
        dataManager.deleteUsuario(id);
        mostrarNotificacion('¡Éxito!', 'Usuario eliminado correctamente', 'success');
        actualizarTablaUsuarios();
    }
}

function obtenerCitasFiltradas() {
    const filtroPaciente = (document.getElementById('filtroPacienteCitas')?.value || '').toLowerCase().trim();
    const filtroEstado = (document.getElementById('filtroEstadoCitas')?.value || '').toLowerCase().trim();
    const fechaDesde = document.getElementById('filtroFechaDesdeCitas')?.value || '';
    const fechaHasta = document.getElementById('filtroFechaHastaCitas')?.value || '';
    const conteoPorPaciente = {};
    dataManager.citas.forEach(cita => {
        const key = String(cita.paciente);
        conteoPorPaciente[key] = (conteoPorPaciente[key] || 0) + 1;
    });

    const citasFiltradas = dataManager.citas.filter(c => {
        const paciente = dataManager.pacientes.find(p => p.id == c.paciente);
        const nombrePaciente = paciente ? `${paciente.nombre} ${paciente.apellido || ''}`.toLowerCase() : '';
        const cumpleTexto = !filtroPaciente || nombrePaciente.includes(filtroPaciente);
        const estado = (c.estado || '').toLowerCase();
        const cumpleEstado = !filtroEstado || estado === filtroEstado;
        const fecha = c.fecha || '';
        const cumpleDesde = !fechaDesde || fecha >= fechaDesde;
        const cumpleHasta = !fechaHasta || fecha <= fechaHasta;
        const cumpleActual = esCitaActiva(c);
        return cumpleTexto && cumpleEstado && cumpleDesde && cumpleHasta && cumpleActual;
    });

    return { citasFiltradas, conteoPorPaciente };
}

function renderControlesPaginacion(containerId, paginaActual, totalPaginas, funcionCambio) {
    const contenedor = document.getElementById(containerId);
    if (!contenedor) return;

    if (totalPaginas <= 1) {
        contenedor.innerHTML = '';
        return;
    }

    let html = '';
    for (let i = 1; i <= totalPaginas; i++) {
        html += `
            <button onclick="${funcionCambio}(${i})" class="px-3 py-1 rounded-lg border ${i === paginaActual ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50'} text-sm font-semibold">
                ${i}
            </button>
        `;
    }
    contenedor.innerHTML = html;
}

function actualizarTablaCitas() {
    const tabla = document.getElementById('tablaCitas');
    const { citasFiltradas, conteoPorPaciente } = obtenerCitasFiltradas();
    const totalPaginas = Math.max(1, Math.ceil(citasFiltradas.length / TAMANIO_PAGINA_CITAS));
    if (paginaActualCitas > totalPaginas) paginaActualCitas = totalPaginas;
    const inicio = (paginaActualCitas - 1) * TAMANIO_PAGINA_CITAS;
    const citasPagina = citasFiltradas.slice(inicio, inicio + TAMANIO_PAGINA_CITAS);

    const resumen = document.getElementById('resumenFiltroCitas');
    if (resumen) {
        resumen.textContent = `Mostrando ${citasPagina.length} de ${citasFiltradas.length} citas actuales. Página ${paginaActualCitas} de ${totalPaginas}.`;
    }
    
    if (citasFiltradas.length === 0) {
        tabla.innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">No hay citas registradas. ¡Agenda una!</td></tr>';
        renderControlesPaginacion('paginacionCitasActuales', 1, 1, 'irPaginaCitas');
        return;
    }

    tabla.innerHTML = citasPagina.map(c => {
        const paciente = dataManager.pacientes.find(p => p.id == c.paciente);
        const medico = dataManager.medicos.find(m => m.id == c.medico);
        const totalPaciente = conteoPorPaciente[String(c.paciente)] || 0;
        const accionTexto = c.accion || 'Creada';
        const accionPor = c.accionPor || '-';
        const accionAt = c.accionAt ? new Date(c.accionAt).toLocaleString('es-ES', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '-';
        
        return `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">${paciente ? paciente.nombre + ' ' + paciente.apellido : '-'}<p class="text-xs text-gray-500">Citas paciente: ${totalPaciente}</p></td>
                <td class="px-6 py-4">${medico ? medico.nombre : '-'}</td>
                <td class="px-6 py-4">${c.fecha}</td>
                <td class="px-6 py-4">${formatearHora12h(c.hora)}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${
                        c.estado === 'completada' ? 'bg-green-100 text-green-800' :
                        c.estado === 'cancelada' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                    }">${c.estado || 'pendiente'}</span>
                </td>
                <td class="px-6 py-4">
                    <span class="block font-semibold text-gray-700 text-xs">${accionTexto}</span>
                    <span class="block text-indigo-600 text-xs font-medium">${accionPor}</span>
                    <span class="block text-gray-400 text-xs">${accionAt}</span>
                </td>
                <td class="px-6 py-4">
                    <button onclick="editarCita(${c.id})" class="text-indigo-600 hover:text-indigo-800 transition-colors mr-2" title="Editar cita">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button onclick="reprogramarCita(${c.id})" class="text-amber-600 hover:text-amber-800 transition-colors mr-2" title="Reprogramar cita">
                        <span class="material-symbols-outlined">event_repeat</span>
                    </button>
                    <button onclick="eliminarCita(${c.id})" class="text-red-500 hover:text-red-700 transition-colors">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    renderControlesPaginacion('paginacionCitasActuales', paginaActualCitas, totalPaginas, 'irPaginaCitas');
}

function irPaginaCitas(pagina) {
    paginaActualCitas = pagina;
    actualizarTablaCitas();
}

function exportarCitasFiltradasCSV() {
    const { citasFiltradas } = obtenerCitasFiltradas();
    if (citasFiltradas.length === 0) {
        mostrarNotificacion('Info', 'No hay citas para exportar con los filtros actuales', 'info');
        return;
    }

    const headers = ['Paciente', 'Medico', 'Especialidad', 'Fecha', 'Hora', 'Estado', 'Notas', 'Accion', 'Realizado Por', 'Fecha Accion'];
    const rows = citasFiltradas.map(c => {
        const paciente = dataManager.pacientes.find(p => p.id == c.paciente);
        const medico = dataManager.medicos.find(m => m.id == c.medico);
        const accionAt = c.accionAt ? new Date(c.accionAt).toLocaleString('es-ES', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '-';
        return [
            paciente ? `${paciente.nombre} ${paciente.apellido || ''}` : '-',
            medico ? medico.nombre : '-',
            c.especialidad || '-',
            c.fecha || '-',
            formatearHora12h(c.hora) || '-',
            c.estado || 'pendiente',
            (c.notas || '-').replace(/\n/g, ' '),
            c.accion || 'Creada',
            c.accionPor || '-',
            accionAt
        ];
    });

    const csvContent = [headers, ...rows]
        .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `citas_filtradas_${fechaActualISO()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    mostrarNotificacion('¡Exito!', 'CSV exportado correctamente', 'success');
}

function cargarCitaEnModal(id, modo = 'editar') {
    const cita = dataManager.citas.find(c => c.id === id);
    if (!cita) {
        mostrarNotificacion('Error', 'No se encontro la cita seleccionada', 'error');
        return;
    }

    abrirModalCita();
    citaEnEdicionId = id;
    modoEdicionCita = modo;

    document.getElementById('citaPaciente').value = cita.paciente;
    document.getElementById('citaMedico').value = cita.medico;
    document.getElementById('citaFecha').value = cita.fecha;
    document.getElementById('citaHora').value = cita.hora;
    
    // Convertir hora 24h a 12h para el time picker
    if (cita.hora) {
        const [horas, minutos] = cita.hora.split(':');
        let h = parseInt(horas);
        const m = minutos;
        const periodo = h >= 12 ? 'PM' : 'AM';
        h = h === 0 ? 12 : (h > 12 ? h - 12 : h);
        document.getElementById('citaHoraNum').value = String(h).padStart(2, '0');
        document.getElementById('citaMinutoNum').value = m;
        document.getElementById('citaPeriodo').value = periodo;
        actualizarDisplayHora();
    }
    
    document.getElementById('citaNotas').value = cita.notas || '';

    const titulo = document.getElementById('modalCitaTitulo');
    const btnGuardar = document.getElementById('btnGuardarCita');
    if (titulo) titulo.textContent = modo === 'reprogramar' ? 'Reprogramar Cita' : 'Editar Cita';
    if (btnGuardar) btnGuardar.textContent = modo === 'reprogramar' ? 'Reprogramar' : 'Guardar cambios';

    const bloquearDatosBase = modo === 'reprogramar';
    document.getElementById('citaPaciente').disabled = bloquearDatosBase;
    document.getElementById('citaMedico').disabled = bloquearDatosBase;
}

function editarCita(id) {
    cargarCitaEnModal(id, 'editar');
}

function reprogramarCita(id) {
    cargarCitaEnModal(id, 'reprogramar');
}

function limpiarFiltrosCitas() {
    const filtroPaciente = document.getElementById('filtroPacienteCitas');
    const filtroEstado = document.getElementById('filtroEstadoCitas');
    const filtroDesde = document.getElementById('filtroFechaDesdeCitas');
    const filtroHasta = document.getElementById('filtroFechaHastaCitas');
    if (filtroPaciente) filtroPaciente.value = '';
    if (filtroEstado) filtroEstado.value = '';
    if (filtroDesde) filtroDesde.value = '';
    if (filtroHasta) filtroHasta.value = '';
    paginaActualCitas = 1;
    actualizarTablaCitas();
}

// ============================================
// CITAS DE LA SEMANA + HISTORIAL
// ============================================

function fechaISOValida(fecha) {
    if (!fecha) return null;

    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return fecha;
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) {
        const [d, m, y] = fecha.split('/');
        return `${y}-${m}-${d}`;
    }

    if (/^\d{2}-\d{2}-\d{4}$/.test(fecha)) {
        const [d, m, y] = fecha.split('-');
        return `${y}-${m}-${d}`;
    }

    const parsed = new Date(fecha);
    if (!isNaN(parsed)) {
        return fechaLocalISO(parsed);
    }

    return null;
}

function actualizarCitasDia(fechaBase = null) {
    const citasPorHoy = document.getElementById('citasPorHoy');
    if (!citasPorHoy) return;
    
    // Usar la fecha pasada, o la fecha actual del sistema
    if (!fechaBase) {
        fechaBase = fechaActualISO();
    }
    
    // Actualizar el rango mostrado
    const rangoElement = document.getElementById('rangoDia');
    if (rangoElement) {
        const fechaDate = new Date(fechaBase + 'T00:00:00');
        const fechaFormateada = fechaDate.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
        rangoElement.textContent = fechaFormateada;
    }

    const citasDia = dataManager.citas.filter(cita => {
        const fechaIso = fechaISOValida(cita.fecha);
        const estado = (cita.estado || '').toLowerCase();
        const cumpleEstado = estado !== 'completada' && estado !== 'cancelada';
        const cumpleFecha = fechaIso === fechaBase;

        return fechaIso && cumpleEstado && cumpleFecha;
    }).sort((a, b) => {
        return a.hora.localeCompare(b.hora);
    });

    if (citasDia.length === 0) {
        const fechaDate = new Date(fechaBase + 'T00:00:00');
        citasPorHoy.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-gray-400">
                <span class="material-symbols-outlined text-6xl mb-3 opacity-30">event_note</span>
                <p class="font-medium">No hay citas programadas para este día</p>
                <p class="text-xs text-gray-500 mt-1">${fechaDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
        `;
        return;
    }

    citasPorHoy.innerHTML = `
        <div class="space-y-3 w-full">
            ${citasDia.map(cita => {
                const paciente = dataManager.pacientes.find(p => p.id == cita.paciente);
                const medico = dataManager.medicos.find(m => m.id == cita.medico);
                return `
                    <div class="bg-gradient-to-r from-indigo-50 to-white rounded-xl border-l-4 border-indigo-500 p-4 shadow-sm hover:shadow-lg transition-all hover:border-indigo-600">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                            <div>
                                <p class="font-bold text-indigo-900 break-words">${medico ? medico.nombre : 'Médico'}</p>
                                <p class="text-xs text-indigo-600 font-semibold tracking-wide">${cita.especialidad || '-'}</p>
                            </div>
                            <span class="px-3 py-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg text-xs font-bold shadow-md self-start">${formatearHora12h(cita.hora)}</span>
                        </div>
                        <p class="text-sm text-gray-700 font-medium mt-3"><span class="text-gray-600">Paciente:</span> ${paciente ? paciente.nombre + ' ' + paciente.apellido : '-'}</p>
                        ${paciente && (paciente.telefono || paciente.matricula) ? `
                        <div class="text-xs text-gray-600 mt-1 space-y-1">
                            ${paciente.telefono ? `<p><span class="font-semibold">Teléfono:</span> ${paciente.telefono}</p>` : ''}
                            ${paciente.matricula ? `<p><span class="font-semibold">Matrícula:</span> ${paciente.matricula}</p>` : ''}
                        </div>
                        ` : ''}
                        <p class="text-xs text-gray-600 mt-1">Fecha: ${cita.fecha}</p>
                        ${cita.notas ? `<p class="text-xs text-gray-600 mt-2 italic"><span class="font-semibold">Notas:</span> ${cita.notas}</p>` : ''}
                        <div class="mt-4 flex flex-col sm:flex-row sm:justify-end gap-2">
                            <button onclick="cancelarCita(${cita.id})" class="w-full sm:w-auto px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">Cancelar</button>
                            <button onclick="completarCita(${cita.id})" class="w-full sm:w-auto px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">Marcar como completa</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function actualizarCitasPasadas() {
    const contenedor = document.getElementById('citasPasadas');
    if (!contenedor) return;
    const contenedorPaginacion = document.getElementById('paginacionCitasPasadas');
    const resumen = document.getElementById('resumenCitasPasadas');
    const hoy = fechaActualISO();
    const textoFiltro = (document.getElementById('filtroCitasPasadasTexto')?.value || '').toLowerCase().trim();
    const fechaDesde = document.getElementById('filtroCitasPasadasDesde')?.value || '';
    const fechaHasta = document.getElementById('filtroCitasPasadasHasta')?.value || '';

    const citasPasadas = dataManager.citas
        .filter(cita => {
            const fecha = cita.fecha || '';
            const esPasada = fecha < hoy || (cita.estado || '').toLowerCase() === 'completada';
            if (!esPasada) return false;

            const paciente = dataManager.pacientes.find(p => p.id == cita.paciente);
            const medico = dataManager.medicos.find(m => m.id == cita.medico);
            const textoPaciente = paciente ? `${paciente.nombre} ${paciente.apellido || ''}`.toLowerCase() : '';
            const textoMedico = medico ? (medico.nombre || '').toLowerCase() : '';
            const textoEspecialidad = (cita.especialidad || '').toLowerCase();

            const cumpleTexto = !textoFiltro ||
                textoPaciente.includes(textoFiltro) ||
                textoMedico.includes(textoFiltro) ||
                textoEspecialidad.includes(textoFiltro);
            const cumpleDesde = !fechaDesde || fecha >= fechaDesde;
            const cumpleHasta = !fechaHasta || fecha <= fechaHasta;

            return cumpleTexto && cumpleDesde && cumpleHasta;
        })
        .sort((a, b) => {
            const fechaComparada = (b.fecha || '').localeCompare(a.fecha || '');
            if (fechaComparada !== 0) return fechaComparada;
            return (b.hora || '').localeCompare(a.hora || '');
        });

    const totalPaginas = Math.max(1, Math.ceil(citasPasadas.length / TAMANIO_PAGINA_CITAS));
    if (paginaActualCitasPasadas > totalPaginas) paginaActualCitasPasadas = totalPaginas;
    const inicio = (paginaActualCitasPasadas - 1) * TAMANIO_PAGINA_CITAS;
    const citasPasadasPagina = citasPasadas.slice(inicio, inicio + TAMANIO_PAGINA_CITAS);

    if (citasPasadas.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center text-gray-500 py-10">
                <p><span class="material-symbols-outlined text-5xl opacity-30">history</span></p>
                <p class="mt-2 text-sm font-medium">Aún no hay citas pasadas.</p>
            </div>
        `;
        if (resumen) resumen.textContent = 'No hay resultados para los filtros aplicados.';
        if (contenedorPaginacion) contenedorPaginacion.innerHTML = '';
        return;
    }

    if (resumen) {
        resumen.textContent = `${citasPasadas.length} citas pasadas encontradas. Página ${paginaActualCitasPasadas} de ${totalPaginas}.`;
    }

    contenedor.innerHTML = `
        <div class="space-y-3">
            ${citasPasadasPagina.map(cita => {
                const paciente = dataManager.pacientes.find(p => p.id == cita.paciente);
                const medico = dataManager.medicos.find(m => m.id == cita.medico);
                const claseEstado = cita.estado === 'completada'
                    ? 'text-green-700'
                    : cita.estado === 'cancelada'
                        ? 'text-red-700'
                        : 'text-gray-600';
                return `
                    <div class="p-4 rounded-xl border border-indigo-100 bg-indigo-50">
                        <div class="flex justify-between items-start">
                            <p class="font-bold text-indigo-900">${medico ? medico.nombre : 'Médico'}</p>
                            <span class="text-xs font-semibold ${claseEstado}">${cita.estado || 'pendiente'}</span>
                        </div>
                        <p class="text-sm text-gray-700 mt-1"><strong>Paciente:</strong> ${paciente ? paciente.nombre + ' ' + paciente.apellido : '-'}</p>
                        <p class="text-sm text-gray-700"><strong>Fecha:</strong> ${cita.fecha} - <strong>Hora:</strong> ${formatearHora12h(cita.hora)}</p>
                        ${cita.notas ? `<p class="text-xs text-gray-600 italic mt-1">Notas: ${cita.notas}</p>` : ''}
                        <div class="mt-3 flex justify-end">
                            <button onclick="eliminarCita(${cita.id})" class="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">Eliminar</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    renderControlesPaginacion('paginacionCitasPasadas', paginaActualCitasPasadas, totalPaginas, 'irPaginaCitasPasadas');
}

function irPaginaCitasPasadas(pagina) {
    paginaActualCitasPasadas = pagina;
    actualizarCitasPasadas();
}

function exportarCitasPasadasCSV() {
    const hoy = fechaActualISO();
    const textoFiltro = (document.getElementById('filtroCitasPasadasTexto')?.value || '').toLowerCase().trim();
    const fechaDesde = document.getElementById('filtroCitasPasadasDesde')?.value || '';
    const fechaHasta = document.getElementById('filtroCitasPasadasHasta')?.value || '';

    const citasPasadas = dataManager.citas
        .filter(cita => {
            const fecha = cita.fecha || '';
            const esPasada = fecha < hoy || (cita.estado || '').toLowerCase() === 'completada';
            if (!esPasada) return false;
            const paciente = dataManager.pacientes.find(p => p.id == cita.paciente);
            const medico = dataManager.medicos.find(m => m.id == cita.medico);
            const textoPaciente = paciente ? `${paciente.nombre} ${paciente.apellido || ''}`.toLowerCase() : '';
            const textoMedico = medico ? (medico.nombre || '').toLowerCase() : '';
            const textoEspecialidad = (cita.especialidad || '').toLowerCase();
            const cumpleTexto = !textoFiltro || textoPaciente.includes(textoFiltro) || textoMedico.includes(textoFiltro) || textoEspecialidad.includes(textoFiltro);
            const cumpleDesde = !fechaDesde || fecha >= fechaDesde;
            const cumpleHasta = !fechaHasta || fecha <= fechaHasta;
            return cumpleTexto && cumpleDesde && cumpleHasta;
        })
        .sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));

    if (citasPasadas.length === 0) {
        mostrarNotificacion('Info', 'No hay citas pasadas para exportar con los filtros actuales', 'info');
        return;
    }

    const headers = ['Paciente', 'Medico', 'Especialidad', 'Fecha', 'Hora', 'Estado', 'Notas', 'Accion', 'Realizado Por', 'Fecha Accion'];
    const rows = citasPasadas.map(c => {
        const paciente = dataManager.pacientes.find(p => p.id == c.paciente);
        const medico = dataManager.medicos.find(m => m.id == c.medico);
        const accionAt = c.accionAt ? new Date(c.accionAt).toLocaleString('es-ES', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '-';
        return [
            paciente ? `${paciente.nombre} ${paciente.apellido || ''}` : '-',
            medico ? medico.nombre : '-',
            c.especialidad || '-',
            c.fecha || '-',
            formatearHora12h(c.hora) || '-',
            c.estado || 'pendiente',
            (c.notas || '-').replace(/\n/g, ' '),
            c.accion || 'Creada',
            c.accionPor || '-',
            accionAt
        ];
    });

    const csvContent = [headers, ...rows]
        .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `citas_pasadas_${fechaActualISO()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    mostrarNotificacion('¡Exito!', 'CSV exportado correctamente', 'success');
}

function limpiarFiltrosCitasPasadas() {
    const texto = document.getElementById('filtroCitasPasadasTexto');
    const desde = document.getElementById('filtroCitasPasadasDesde');
    const hasta = document.getElementById('filtroCitasPasadasHasta');
    if (texto) texto.value = '';
    if (desde) desde.value = '';
    if (hasta) hasta.value = '';
    paginaActualCitasPasadas = 1;
    actualizarCitasPasadas();
}

function completarCita(id) {
    const cita = dataManager.citas.find(c => c.id === id);
    if (!cita) return;

    cita.estado = 'completada';
    cita.accion = 'Completada';
    cita.accionPor = localStorage.getItem('loggedInUser') || '-';
    cita.accionAt = new Date().toISOString();
    dataManager.saveData('citas', dataManager.citas);
    mostrarNotificacion('¡Éxito!', 'Cita marcada como completada', 'success');

    actualizarCitasDia();
    actualizarTablaCitas();
    actualizarCitasPasadas();
    actualizarKPIs();
}

function cancelarCita(id) {
    const cita = dataManager.citas.find(c => c.id === id);
    if (!cita) return;

    cita.estado = 'cancelada';
    cita.accion = 'Cancelada';
    cita.accionPor = localStorage.getItem('loggedInUser') || '-';
    cita.accionAt = new Date().toISOString();
    dataManager.saveData('citas', dataManager.citas);
    mostrarNotificacion('Info', 'Cita marcada como cancelada', 'info');

    actualizarCitasDia();
    actualizarTablaCitas();
    actualizarCitasPasadas();
    actualizarKPIs();
}

// ============================================
// ELIMINAR DATOS
// ============================================

function eliminarPaciente(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
        const usuarioActual = localStorage.getItem('loggedInUser') || '-';
        dataManager.deletePaciente(id);
        mostrarNotificacion('¡Éxito!', `Paciente eliminado por ${usuarioActual}`, 'success');
        actualizarTablaPacientes();
        actualizarKPIs();
    }
}

function editarPaciente(id) {
    const paciente = dataManager.pacientes.find(p => p.id === id);
    if (!paciente) return;

    abrirModalPaciente();
    pacienteEnEdicionId = id;
    document.getElementById('pacNombre').value = paciente.nombre || '';
    document.getElementById('pacApellido').value = paciente.apellido || '';
    document.getElementById('pacCedula').value = paciente.cedula || '';
    document.getElementById('pacMatricula').value = paciente.matricula || '';
    document.getElementById('pacFecha').value = paciente.fecha || '';
    document.getElementById('pacTelefono').value = paciente.telefono || '';
    document.getElementById('pacCorreo').value = paciente.correo || '';
    document.getElementById('pacSangre').value = paciente.sangre || 'Tipo de sangre';
    document.getElementById('pacDireccion').value = paciente.direccion || '';

    const titulo = document.getElementById('modalPacienteTitulo');
    const btn = document.getElementById('btnGuardarPaciente');
    if (titulo) titulo.textContent = 'Editar Paciente';
    if (btn) btn.textContent = 'Actualizar';
}

function eliminarMedico(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este médico?')) {
        const usuarioActual = localStorage.getItem('loggedInUser') || '-';
        dataManager.deleteMedico(id);
        mostrarNotificacion('¡Éxito!', `Médico eliminado por ${usuarioActual}`, 'success');
        actualizarGridMedicos();
        actualizarKPIs();
    }
}

function editarMedico(id) {
    const medico = dataManager.medicos.find(m => m.id === id);
    if (!medico) return;

    abrirModalMedico();
    medicoEnEdicionId = id;
    document.getElementById('medNombre').value = medico.nombre || '';
    document.getElementById('medEspecialidad').value = medico.especialidad || '';
    document.getElementById('medCedula').value = medico.cedula || '';
    document.getElementById('medTelefono').value = medico.telefono || '';
    document.getElementById('medCorreo').value = medico.correo || '';

    const titulo = document.getElementById('modalMedicoTitulo');
    const btn = document.getElementById('btnGuardarMedico');
    if (titulo) titulo.textContent = 'Editar Médico';
    if (btn) btn.textContent = 'Actualizar';
}

function eliminarCita(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
        dataManager.deleteCita(id);
        mostrarNotificacion('¡Éxito!', 'Cita eliminada correctamente', 'success');
        actualizarTablaCitas();
        actualizarCitasDia();
        actualizarCitasPasadas();
        actualizarKPIs();
        initCharts();
    }
}

// ============================================
// AUTENTICACIÓN
// ============================================

function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input || !icon) return;

    const esPassword = input.type === 'password';
    input.type = esPassword ? 'text' : 'password';
    icon.textContent = esPassword ? 'visibility_off' : 'visibility';
}

function abrirModalRecuperarContrasena() {
    const modal = document.getElementById('modalRecuperarContrasena');
    const error1 = document.getElementById('recuperarPasswordError');
    const error2 = document.getElementById('recuperarPasswordError2');
    const username = document.getElementById('recuperarUsername');
    const codigo = document.getElementById('codigoVerificacion');
    const nueva = document.getElementById('recuperarPasswordNueva');
    const confirmar = document.getElementById('recuperarPasswordConfirmar');
    const fase1 = document.getElementById('fase1RecuperarContrasena');
    const fase2 = document.getElementById('fase2RecuperarContrasena');
    
    if (modal) modal.classList.remove('hidden');
    if (error1) {
        error1.classList.add('hidden');
        error1.textContent = '';
    }
    if (error2) {
        error2.classList.add('hidden');
        error2.textContent = '';
    }
    if (username) username.value = '';
    if (codigo) codigo.value = '';
    if (nueva) nueva.value = '';
    if (confirmar) confirmar.value = '';
    if (fase1) fase1.classList.remove('hidden');
    if (fase2) fase2.classList.add('hidden');
    
    // Limpiar datos temporales
    sessionStorage.removeItem('passwordResetUsername');
    sessionStorage.removeItem('passwordResetCode');
    sessionStorage.removeItem('passwordResetExpiry');
    
    // Actualizar correo mostrado en tiempo real
    if (username) {
        username.addEventListener('input', actualizarCorreoEnModal);
    }
    actualizarCorreoEnModal();
}

function cerrarModalRecuperarContrasena() {
    const modal = document.getElementById('modalRecuperarContrasena');
    if (modal) modal.classList.add('hidden');

    const username = document.getElementById('recuperarUsername');
    const codigo = document.getElementById('codigoVerificacion');
    const nueva = document.getElementById('recuperarPasswordNueva');
    const confirmar = document.getElementById('recuperarPasswordConfirmar');
    const error1 = document.getElementById('recuperarPasswordError');
    const error2 = document.getElementById('recuperarPasswordError2');
    const newIcon = document.getElementById('toggleResetPasswordIcon');

    if (username) username.value = '';
    if (codigo) codigo.value = '';
    if (nueva) nueva.value = '';
    if (nueva) nueva.type = 'password';
    if (confirmar) confirmar.value = '';
    if (newIcon) newIcon.textContent = 'visibility';
    if (error1) {
        error1.classList.add('hidden');
        error1.textContent = '';
    }
    if (error2) {
        error2.classList.add('hidden');
        error2.textContent = '';
    }
    
    // Limpiar datos temporales
    sessionStorage.removeItem('passwordResetUsername');
    sessionStorage.removeItem('passwordResetCode');
    sessionStorage.removeItem('passwordResetExpiry');
}

// Generar código aleatorio de 6 dígitos
function generarCodigoVerificacion() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Actualizar correo mostrado en el modal
function actualizarCorreoEnModal() {
    const correoDisplay = document.getElementById('correoMostrado');
    if (correoDisplay) {
        correoDisplay.textContent = 'gestiondecitasuasd@gmail.com';
    }
}

// Solicitar código de recuperación
async function solicitarCodigoRecuperacion() {
    const username = document.getElementById('recuperarUsername')?.value.trim();
    const error = document.getElementById('recuperarPasswordError');
    
    if (error) {
        error.classList.add('hidden');
        error.textContent = '';
    }
    
    if (!username) {
        if (error) {
            error.textContent = 'Ingresa tu nombre de usuario';
            error.classList.remove('hidden');
        }
        return;
    }
    
    const usuario = dataManager.usuarios.find(u => u.username === username);
    if (!usuario) {
        if (error) {
            error.textContent = 'No se encontró un usuario con ese nombre';
            error.classList.remove('hidden');
        }
        return;
    }
    
    // Generar código
    const codigo = generarCodigoVerificacion();
    const ahora = new Date().getTime();
    const expiracion = ahora + (15 * 60 * 1000); // 15 minutos
    
    // Guardar en sessionStorage
    sessionStorage.setItem('passwordResetUsername', username);
    sessionStorage.setItem('passwordResetCode', codigo);
    sessionStorage.setItem('passwordResetExpiry', expiracion);
    
    // Mostrar notificación de envío
    mostrarNotificacion('Enviando código...', 'Por favor espera', 'info');
    
    try {
        // Enviar código por correo (siempre a gestiondecitasuasd@gmail.com)
        const response = await fetch('/.netlify/functions/send-password-reset-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                destinatario: 'gestiondecitasuasd@gmail.com',
                codigoVerificacion: codigo,
                nombreUsuario: usuario.username
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            mostrarNotificacion('¡Éxito!', `Código enviado a gestiondecitasuasd@gmail.com. Válido por 15 minutos`, 'success');
            
            // Cambiar a fase 2
            const fase1 = document.getElementById('fase1RecuperarContrasena');
            const fase2 = document.getElementById('fase2RecuperarContrasena');
            if (fase1) fase1.classList.add('hidden');
            if (fase2) fase2.classList.remove('hidden');
            
            // Enfocar en el campo de código
            setTimeout(() => {
                document.getElementById('codigoVerificacion')?.focus();
            }, 100);
        } else {
            mostrarNotificacion('Error', data.message || 'No se pudo enviar el código', 'error');
            if (error) {
                error.textContent = data.message || 'Error al enviar el código';
                error.classList.remove('hidden');
            }
        }
    } catch (err) {
        console.error('Error enviando código:', err);
        mostrarNotificacion('Error', 'No se pudo conectar con el servidor', 'error');
        if (error) {
            error.textContent = 'Error de conexión';
            error.classList.remove('hidden');
        }
    }
}

// Volver a fase 1
function volverAFase1() {
    const fase1 = document.getElementById('fase1RecuperarContrasena');
    const fase2 = document.getElementById('fase2RecuperarContrasena');
    const error2 = document.getElementById('recuperarPasswordError2');
    const codigo = document.getElementById('codigoVerificacion');
    const nueva = document.getElementById('recuperarPasswordNueva');
    const confirmar = document.getElementById('recuperarPasswordConfirmar');
    
    if (fase1) fase1.classList.remove('hidden');
    if (fase2) fase2.classList.add('hidden');
    if (error2) {
        error2.classList.add('hidden');
        error2.textContent = '';
    }
    if (codigo) codigo.value = '';
    if (nueva) nueva.value = '';
    if (confirmar) confirmar.value = '';
    
    document.getElementById('recuperarUsername')?.focus();
}

// Restablecer contraseña por código
function restablecerContrasenaPorCodigo() {
    const codigo = document.getElementById('codigoVerificacion')?.value.trim();
    const nueva = document.getElementById('recuperarPasswordNueva')?.value || '';
    const confirmar = document.getElementById('recuperarPasswordConfirmar')?.value || '';
    const error = document.getElementById('recuperarPasswordError2');
    
    if (error) {
        error.classList.add('hidden');
        error.textContent = '';
    }
    
    // Validar campos
    if (!codigo || !nueva || !confirmar) {
        if (error) {
            error.textContent = 'Completa todos los campos';
            error.classList.remove('hidden');
        }
        return;
    }
    
    if (codigo.length !== 6 || isNaN(codigo)) {
        if (error) {
            error.textContent = 'El código debe ser 6 dígitos';
            error.classList.remove('hidden');
        }
        return;
    }
    
    if (nueva.length < 4) {
        if (error) {
            error.textContent = 'La contraseña debe tener al menos 4 caracteres';
            error.classList.remove('hidden');
        }
        return;
    }
    
    if (nueva !== confirmar) {
        if (error) {
            error.textContent = 'Las contraseñas no coinciden';
            error.classList.remove('hidden');
        }
        return;
    }
    
    // Verificar código
    const username = sessionStorage.getItem('passwordResetUsername');
    const codigoGuardado = sessionStorage.getItem('passwordResetCode');
    const expiracion = parseInt(sessionStorage.getItem('passwordResetExpiry') || 0);
    const ahora = new Date().getTime();
    
    if (!codigoGuardado || codigo !== codigoGuardado) {
        if (error) {
            error.textContent = 'Código de verificación incorrecto';
            error.classList.remove('hidden');
        }
        return;
    }
    
    if (ahora > expiracion) {
        if (error) {
            error.textContent = 'El código ha expirado. Solicita uno nuevo';
            error.classList.remove('hidden');
        }
        sessionStorage.removeItem('passwordResetUsername');
        sessionStorage.removeItem('passwordResetCode');
        sessionStorage.removeItem('passwordResetExpiry');
        return;
    }
    
    // Cambiar contraseña
    const usuario = dataManager.usuarios.find(u => u.username === username);
    if (!usuario) {
        if (error) {
            error.textContent = 'Usuario no encontrado';
            error.classList.remove('hidden');
        }
        return;
    }
    
    usuario.password = nueva;
    usuario.updatedAt = new Date().toISOString();
    dataManager.saveData('usuarios', dataManager.usuarios);
    
    // Limpiar datos temporales
    sessionStorage.removeItem('passwordResetUsername');
    sessionStorage.removeItem('passwordResetCode');
    sessionStorage.removeItem('passwordResetExpiry');
    
    cerrarModalRecuperarContrasena();
    mostrarNotificacion('¡Éxito!', 'Contraseña actualizada correctamente', 'success');
}

function verificarSesion() {
    const usuario = localStorage.getItem('loggedInUser');
    if (usuario) {
        const existe = dataManager.usuarios.find(u => u.username === usuario && u.estado === 'activo');
        if (!existe) {
            localStorage.removeItem('loggedInUser');
            verificarSesion();
            return;
        }
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        mostrarSeccion('resumen');
    } else {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
    }
}

function iniciarSesion(username, password) {
    const usuario = dataManager.usuarios.find(u => u.username === username);

    if (!usuario || usuario.password !== password) {
        document.getElementById('login-error').classList.remove('hidden');
        document.getElementById('login-error').textContent = 'Usuario o contraseña incorrectos';
        return false;
    }

    if (usuario.estado !== 'activo') {
        document.getElementById('login-error').classList.remove('hidden');
        document.getElementById('login-error').textContent = 'Este usuario está inactivo';
        return false;
    }

    localStorage.setItem('loggedInUser', username);
    localStorage.setItem('loggedInRol', usuario.rol);
    usuario.ultimoAcceso = new Date().toISOString();
    dataManager.saveData('usuarios', dataManager.usuarios);
        document.getElementById('login-error').classList.add('hidden');
        verificarSesion();
        return true;
}

function abrirModalConfirmarCerrarSesion() {
    const modal = document.getElementById('modalConfirmarCerrarSesion');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function cerrarModalConfirmarCerrarSesion(event) {
    if (event && event.target && event.target.id !== 'modalConfirmarCerrarSesion') {
        return;
    }

    const modal = document.getElementById('modalConfirmarCerrarSesion');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function confirmarCerrarSesion() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInRol');
    cerrarModalConfirmarCerrarSesion();
    verificarSesion();
}

function cerrarSesion() {
    abrirModalConfirmarCerrarSesion();
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', async function() {
    verificarSesion();

    inicializarCalendariosModernos();

    await dataManager.sincronizarConBaseDatos();
    actualizarTablaPacientes();
    actualizarGridMedicos();
    actualizarTablaCitas();
    actualizarCitasPasadas();
    actualizarKPIs();
    initCharts();

    const fechaCita = document.getElementById('citaFecha');
    const periodoCita = document.getElementById('citaPeriodo');
    if (periodoCita) {
        periodoCita.addEventListener('change', function() {
            actualizarDisplayHora();
        });
    }
    if (fechaCita) {
        if (fechaCita._flatpickr) {
            fechaCita._flatpickr.set('minDate', fechaActualISO());
        } else {
            fechaCita.min = fechaActualISO();
        }
    }
    
    // Filtro de fecha para citas del día
    const filtroFecha = document.getElementById('filtroFechaDia');
    if (filtroFecha) {
        // Establecer fecha por defecto (hoy)
        const hoy = fechaActualISO();
        if (filtroFecha._flatpickr) {
            filtroFecha._flatpickr.setDate(hoy, true, 'Y-m-d');
        } else {
            filtroFecha.value = hoy;
        }
        
        filtroFecha.addEventListener('change', function() {
            actualizarCitasDia(this.value);
        });
        
        // Llamar una sola vez al cargar
        actualizarCitasDia(hoy);
    }

    const filtroPacienteCitas = document.getElementById('filtroPacienteCitas');
    if (filtroPacienteCitas) {
        filtroPacienteCitas.addEventListener('input', function() {
            paginaActualCitas = 1;
            actualizarTablaCitas();
        });
    }

    const filtroEstadoCitas = document.getElementById('filtroEstadoCitas');
    if (filtroEstadoCitas) {
        filtroEstadoCitas.addEventListener('change', function() {
            paginaActualCitas = 1;
            actualizarTablaCitas();
        });
    }

    const filtroFechaDesdeCitas = document.getElementById('filtroFechaDesdeCitas');
    if (filtroFechaDesdeCitas) {
        filtroFechaDesdeCitas.addEventListener('change', function() {
            paginaActualCitas = 1;
            actualizarTablaCitas();
        });
    }

    const filtroFechaHastaCitas = document.getElementById('filtroFechaHastaCitas');
    if (filtroFechaHastaCitas) {
        filtroFechaHastaCitas.addEventListener('change', function() {
            paginaActualCitas = 1;
            actualizarTablaCitas();
        });
    }

    const searchPaciente = document.getElementById('searchPaciente');
    if (searchPaciente) {
        searchPaciente.addEventListener('input', actualizarTablaPacientes);
    }

    const searchMedico = document.getElementById('searchMedico');
    if (searchMedico) {
        searchMedico.addEventListener('input', actualizarGridMedicos);
    }

    const searchUsuario = document.getElementById('searchUsuario');
    if (searchUsuario) {
        searchUsuario.addEventListener('input', function() {
            paginaActualUsuarios = 1;
            actualizarTablaUsuarios();
        });
    }

    const filtroRolUsuario = document.getElementById('filtroRolUsuario');
    if (filtroRolUsuario) {
        filtroRolUsuario.addEventListener('change', function() {
            paginaActualUsuarios = 1;
            actualizarTablaUsuarios();
        });
    }

    const filtroEstadoUsuario = document.getElementById('filtroEstadoUsuario');
    if (filtroEstadoUsuario) {
        filtroEstadoUsuario.addEventListener('change', function() {
            paginaActualUsuarios = 1;
            actualizarTablaUsuarios();
        });
    }

    const filtroCitasPasadasTexto = document.getElementById('filtroCitasPasadasTexto');
    if (filtroCitasPasadasTexto) {
        filtroCitasPasadasTexto.addEventListener('input', function() {
            paginaActualCitasPasadas = 1;
            actualizarCitasPasadas();
        });
    }

    const filtroCitasPasadasDesde = document.getElementById('filtroCitasPasadasDesde');
    if (filtroCitasPasadasDesde) {
        filtroCitasPasadasDesde.addEventListener('change', function() {
            paginaActualCitasPasadas = 1;
            actualizarCitasPasadas();
        });
    }

    const filtroCitasPasadasHasta = document.getElementById('filtroCitasPasadasHasta');
    if (filtroCitasPasadasHasta) {
        filtroCitasPasadasHasta.addEventListener('change', function() {
            paginaActualCitasPasadas = 1;
            actualizarCitasPasadas();
        });
    }

    const limiteEspecialidadDia = document.getElementById('limiteEspecialidadDia');
    if (limiteEspecialidadDia) {
        limiteEspecialidadDia.addEventListener('input', function() {
            if (!this.value || parseInt(this.value, 10) < 1) {
                this.value = '1';
            }
        });
    }
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        iniciarSesion(username, password);
    });

    const recuperarPasswordConfirmar = document.getElementById('recuperarPasswordConfirmar');
    if (recuperarPasswordConfirmar) {
        recuperarPasswordConfirmar.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                restablecerContrasena();
            }
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            const overlay = document.getElementById('sidebarOverlay');
            if (overlay) overlay.classList.add('hidden');
        }
    });
});
