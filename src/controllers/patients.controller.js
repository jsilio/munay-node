const patientCtrl = {}

// Models
const Patient = require("../models/Patient");


// GET - Mostrar todos los pacientes
patientCtrl.renderPatientList = async (req, res) => {

    const patient = await Patient.find()
        .lean()
        .sort({ createdAt: "desc" });

    res.render("dashboard/pacientes", {
        patient,
        title: "Pacientes — Munay"
    });
};

// GET - Mostrar ficha de paciente
patientCtrl.renderPatient = (req, res) => {
    res.render("dashboard/pacientes", {
        title: "Ficha del paciente — Munay"
    });
};

// GET - Mostrar formulario para crear nueva ficha
patientCtrl.renderNewPatient = (req, res) => {
    res.render("dashboard/nueva-ficha", {
        title: "Crear nueva ficha — Munay"
    });
};

// POST - Añadir nuevo paciente
patientCtrl.addNewPatient = async (req, res) => {

    // Extraer los datos del formulario
    const { firstName, lastName, gender, birthdate, email, phone, birthplace, residence, summary } = req.body;

    try {

        const newPatient = new Patient({
            firstName,
            lastName,
            gender,
            birthdate,
            email,
            phone,
            birthplace,
            residence,
            summary
        });

        await newPatient.save();

        res.redirect("/dashboard/pacientes")

    } catch (err) {
        console.log(err);
        res.render("dashboard/nueva-ficha", {
            title: "Crear nueva ficha — Munay"
        });
    }
};

// GET - Mostrar formulario para editar datos de la ficha
patientCtrl.renderEditPatient = (req, res) => {
    res.render("dashboard/pacientes", {
        title: "Pacientes - Munay Admin"
    });
};

// PUT - Editar ficha del paciente
patientCtrl.editPatient = (req, res) => {
    res.render("dashboard/pacientes", {
        title: "Pacientes - Munay Admin"
    });
};

// DELETE - Eliminar ficha de paciente
patientCtrl.deletePatient = (req, res) => {
    res.render("dashboard/pacientes", {
        title: "Pacientes - Munay Admin"
    });
};

module.exports = patientCtrl;