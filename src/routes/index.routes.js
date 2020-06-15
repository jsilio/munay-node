const { Router } = require("express");
const router = Router();

const { 
    renderIndex, 
    renderContacto,
    sendMail, 
    renderAdultos,
    renderInfantojuvenil,
    renderTerceraEdad,
    renderParejas, 
    renderTarifas,
    renderReserva, 
} = require("../controllers/index.controller");

router.all("/*", (req, res, next) => {

    req.app.locals.layout = "main"
    next();
    
});

// Index

router.get("/", renderIndex);

// Especialidades

router.get("/adultos", renderAdultos);

router.get("/infantojuvenil", renderInfantojuvenil);

router.get("/tercera-edad", renderTerceraEdad);

router.get("/parejas", renderParejas);


// Tarifas

router.get("/tarifas", renderTarifas);

// Contacto

router.get("/contacto", renderContacto);

router.post("/enviar-email", sendMail);

// Reserva

router.get("/reserva", renderReserva);


module.exports = router;