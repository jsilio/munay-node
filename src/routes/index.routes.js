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
    renderAvisoLegal,
    renderPoliticaPrivacidad, 
    renderPoliticaCookies,
    suscribeNewsletter
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

// Aviso legal

router.get("/aviso-legal", renderAvisoLegal);

// Política de privacidad

router.get("/politica-privacidad", renderPoliticaPrivacidad);

// Política de cookies

router.get("/politica-cookies", renderPoliticaCookies);

// Newsletter Sign Up

// router.post("/suscribirse", suscribeNewsletter);

module.exports = router;