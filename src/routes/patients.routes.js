const { Router } = require("express");
const router = Router();

const { 
    renderPatientList,
    renderPatient,
    renderNewPatient,
    addNewPatient,
    renderEditPatient,
    editPatient,
    deletePatient 
} = require("../controllers/patients.controller");

const { isAuthenticated } = require("../helpers/auth");

router.all("/*", (req, res, next) => {

    req.app.locals.layout = "admin"
    next();
    
});


// Mostrar los pacientes
router.get("/dashboard/pacientes", isAuthenticated, renderPatientList);

// // Mostrar ficha de paciente
// router.get("/dashboard/pacientes/:id", isAuthenticated, renderPatient);

// Mostrar formulario para crear nueva ficha
router.get("/dashboard/pacientes/nueva-ficha", isAuthenticated, renderNewPatient);

// Añadir nuevo paciente
router.post("/dashboard/pacientes/nueva-ficha", isAuthenticated, addNewPatient);

// // Mostrar formulario para editar datos de la ficha
// router.get("/dashboard/pacientes/editar/:id", isAuthenticated, renderEditPatient);

// // Editar ficha del paciente
// router.get("/dashboard/pacientes/editar/:id", isAuthenticated, editPatient);

// // Eliminar ficha de paciente
// router.get("/dashboard/pacientes/eliminar/:id", isAuthenticated, deletePatient);


module.exports = router;