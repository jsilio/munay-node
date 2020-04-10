const { Router } = require("express");
const router = Router();

const { 
    renderIndex, 
    renderContacto,
    enviarMail, 
    renderEspecialidades, 
    renderReserva, 
} = require("../controllers/index.controller");

router.get("/", renderIndex);

router.get("/especialidades", renderEspecialidades);

// Contacto

router.get("/contacto", renderContacto);

router.post("/enviar-email", enviarMail);

// Reserva

router.get("/reserva", renderReserva);


module.exports = router;