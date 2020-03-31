const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render("index");
}

indexCtrl.renderContacto = (req, res) => {
    res.render("contacto");
}

indexCtrl.renderEspecialidades = (req, res) => {
    res.render("especialidades");
}

indexCtrl.renderBlog = (req, res) => {
    res.render("blog");
}

indexCtrl.renderReserva = (req, res) => {
    res.render("reserva");
}

module.exports = indexCtrl;