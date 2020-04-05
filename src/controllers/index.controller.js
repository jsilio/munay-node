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

indexCtrl.renderReserva = (req, res) => {
    res.render("reserva");
}

indexCtrl.renderDashboard = (req, res) => {
    res.render("/blog/dashboard")
}

module.exports = indexCtrl;