const { Router } = require("express");
const router = Router();

const { 
    renderIndex, 
    renderContacto,
    sendMail, 
    renderEspecialidades, 
    renderReserva, 
} = require("../controllers/index.controller");

router.all("/*", (req, res, next) => {

    req.app.locals.layout = "main"
    next();
    
});

router.get("/", renderIndex);

router.get("/especialidades", renderEspecialidades);

// Contacto

router.get("/contacto", renderContacto);

router.post("/enviar-email", sendMail);

// Reserva

router.get("/reserva", renderReserva);


module.exports = router;