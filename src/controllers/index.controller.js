const indexCtrl = {};

const Contact = require("../models/Contact");
const BlogPost = require("../models/BlogPost");

const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

// Index
indexCtrl.renderIndex = async (req, res) => {

    const blogPost = await BlogPost.find()
        .lean()
        .sort({ createdAt: "desc" })
        .limit(3);

    res.render("index", {
        blogPost,
        title: "Munay - Psicología Clínica y Neuropsicología",
        description:  "Servicio de psicología clínica y neuropsicología: realizamos evaluación y tratamiento. Terapia individual y de pareja. Madrid centro y Terapia online."
    });
}

// Contacto
indexCtrl.renderContacto = (req, res) => {
    res.render("contacto", {
        title: "Contacto — Munay"
    });
}

//  Enviar mail
indexCtrl.sendMail = async (req, res) => {

    const { name, email, message } = req.body;

    // Contenido del correo
    contentHTML = `
        <h3>Información de contacto</h1>
        <ul>
            <li>Nombre completo: ${name}</li>
            <li>Correo eléctronico: ${email}</li>
        </ul>
        <p> Mensaje: ${message} </p>
    `;

    // Configuración del transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true, // SSL
        auth: {
            user: "info@munay.es",
            pass: process.env.ZOHO_PASSWORD
        },
        tls: {
            rejectUnathorized: false
        }
    });

    // Envío de correo
    await transporter.sendMail({
        from: '"Contacto a Munay" <info@munay.es>',
        to: "info@munay.es",
        subject: "Nuevo mensaje del formulario de Contacto",
        html: contentHTML
    });

    // Guardar contacto en db
    // const newContact = new Contact({name, email});
    // await newContact.save();

    // Enviar alerta de acción exitosa
    req.flash("success_msg", "Tu mensaje ha sido enviado correctamente. Te contactaremos en un plazo máximo de 24h.");

    // Redirigir a contacto
    res.redirect("/contacto");
}

// Adultos
indexCtrl.renderAdultos = (req, res) => {
    res.render("especialidades/adultos", {
        title: "Terapia para Adultos — Munay"
    });
}

// Infantojuvenil
indexCtrl.renderInfantojuvenil = (req, res) => {
    res.render("especialidades/infantojuvenil", {
        title: "Terapia para Niños y Adolescentes — Munay"
    });
}

// Tercera Edad
indexCtrl.renderTerceraEdad = (req, res) => {
    res.render("especialidades/tercera-edad", {
        title: "Terapia para Tercera Edad — Munay"
    });
}

// Parejas
indexCtrl.renderParejas = (req, res) => {
    res.render("especialidades/parejas", {
        title: "Terapia para Parejas — Munay"
    });
}

// Tarifas
indexCtrl.renderTarifas = (req, res) => {
    res.render("tarifas", {
        title: "Tarifas — Munay"
    });
}

// Reserva
indexCtrl.renderReserva = (req, res) => {
    res.render("reserva", {
        title: "Reserva tu cita — Munay"
    });
}

// Aviso legal
indexCtrl.renderAvisoLegal = (req, res) => {
    res.render("aviso-legal", {
        title: "Aviso Legal — Munay"
    });
}

// Política de privacidad
indexCtrl.renderPoliticaPrivacidad = (req, res) => {
    res.render("politica-privacidad", {
        title: "Política de privacidad — Munay"
    });
}

// Política de cookies
indexCtrl.renderPoliticaCookies = (req, res) => {
    res.render("politica-cookies", {
        title: "Política de cookies — Munay"
    });
}

// Suscripción newsletter
indexCtrl.subscribeNewsletter = (req, res) => {

    const { name, email } = req.body;

    if (!email) {
        req.flash("error_msg", "Debe introducir un correo electrónico para recibir nuestra newsletter.");
        res.redirect("/blog");
    }

    // Construir datos del formulario
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name
                }
            }
        ]
    }

    const postData = JSON.stringify(data);

    fetch('https://us2.api.mailchimp.com/3.0/lists/90755ee9be', {
        method: 'POST',
        headers: {
          Authorization: 'auth ' + process.env.MAILCHIMP_API_KEY
        },
        body: postData
      })
        .then(res.statusCode === 200 ?
          res.redirect('/confirmacion-newsletter') :
          res.redirect('/blog'))
        .catch(err => console.log(err))

}

indexCtrl.confirmNewsletterSignUp = async (req, res) => {

    const blogPost = await BlogPost.find()
    .lean()
    .sort({ createdAt: "desc" })
    .limit(3);

    res.render("newsletter", {
        blogPost,
        title: "Confirmación de Newsletter — Munay Psicología"
    });
}



module.exports = indexCtrl;