const { Router } = require("express");
const router = Router();

const { renderIndex, renderContacto, renderEspecialidades, renderReserva, renderDashboard } = require("../controllers/index.controller");

router.get("/", renderIndex);

router.get("/contacto", renderContacto);

router.get("/especialidades", renderEspecialidades);

router.get("/reserva", renderReserva);

router.get("/dashboard", renderDashboard);

module.exports = router;