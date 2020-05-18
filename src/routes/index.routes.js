const { Router } = require("express");
const router = Router();

const { 
    renderIndex, 
    renderContacto,
    sendMail, 
    renderEspecialidades, 
    renderTarifas,
    renderReserva, 
} = require("../controllers/index.controller");

router.all("/*", (req, res, next) => {

    req.app.locals.layout = "main"
    next();
    
});

router.get("/", renderIndex);

router.get("/especialidades", renderEspecialidades);

router.get("/tarifas", renderTarifas);

// Contacto

router.get("/contacto", renderContacto);

router.post("/enviar-email", sendMail);

// Reserva

router.get("/reserva", renderReserva);


module.exports = router;