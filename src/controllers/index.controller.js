const indexCtrl = {};

const Contact = require("../models/Contact");
const BlogPost = require("../models/BlogPost");

const nodemailer = require("nodemailer");

indexCtrl.renderIndex = async (req, res) => {

    const blogPost = await BlogPost.find().lean().sort({ createdAt: "desc" }).limit(3);

    res.render("index", {
        blogPost,
        title: "Munay - Psicología Clínica y Neuropsicología"
    });
}

indexCtrl.renderContacto = (req, res) => {
    res.render("contacto", {title: "Contacto | Munay"});
}

indexCtrl.sendMail = async (req, res) => {

    const { name, email, message } = req.body;

    // Contenido del correo
    contentHTML = `
        <h3>Información de contacto</h1>
        <ul>
            <li>Nombre completo: ${name}</li>
            <li>Correo eléctronico: ${email}</li>
        </ul>
        <p> ${message} </p>
    `;

    let testAccount = await nodemailer.createTestAccount();

    // Configuración del transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Envío de correo
    let info = await transporter.sendMail({
        from: '"Munay" <foo@example.com>',
        to: "bar@example.com",
        subject: "Nuevo mensaje de Contacto",
        html: contentHTML
    });

    // Guardar contacto en db
    // const newContact = new Contact({name, email});
    // await newContact.save();

    // Enviar alerta de acción exitosa
    req.flash("success_msg", "Tu mensaje ha sido enviado correctamente. Te contactaremos en un plazo estimado de 24h.");

    console.log(contentHTML);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.redirect("/contacto");
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