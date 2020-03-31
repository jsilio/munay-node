const { Router } = require("express");
const router = Router();

const { renderIndex, renderContacto, renderEspecialidades, renderBlog, renderReserva } = require ("../controllers/index.controller");
 
router.get("/", renderIndex);

router.get("/contacto", renderContacto);

router.get("/especialidades", renderEspecialidades);

router.get("/reserva", renderReserva);

module.exports = router;