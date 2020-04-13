const dashCtrl = {}

const BlogPost = require("../models/BlogPost");

// Mostrar dashboard

dashCtrl.renderDashboard = (req, res) => {
    res.render("dashboard/dashboard", {
        title: "Munay Admin",
        layout: "admin"
    })
}

// Mostrar todos los posts 

dashCtrl.renderBlog = async (req, res) => {

    const blogPost = await BlogPost.find().lean().sort({ createdAt: "desc" });

    res.render("dashboard/blog", {
        blogPost,
        title: "Munay Admin - Blog",
        layout: "admin"
    });
};

// Crear nuevo post del blog

dashCtrl.renderNewPost = (req, res) => {

    // Mostrar formulario para añadir nuevo post
    res.render("dashboard/nuevo-post", {
        title: "Crear nueva entrada - Munay Admin",
        layout: "admin"
    });
};

dashCtrl.addNewPost = async (req, res) => {

    // Extraer los datos del formulario
    const { title, description, content } = req.body;
    // Pasar los datos a la db
    const newBlogPost = new BlogPost({ title, description, content });

    // Guardar datos en la db
    try {
        await newBlogPost.save();
        res.redirect("/dashboard/blog")

    } catch (err) {
        console.log(err)
        res.render("dashboard/nuevo-post", {
            title: "Crear nueva entrada - Munay Admin",
            layout: "admin"
        });
    }
};

// Editar un post del Blog

dashCtrl.renderEditPost = async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id).lean();
    res.render("dashboard/editar-post", {
        blogPost,
        title: "Editar entrada - Munay Admin",
        layout: "admin"
    });
};

dashCtrl.updatePost = async (req, res) => {

    const { title, description, content } = req.body;

    const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, { title, description, content });

    // Guardar datos en la db
    try {
        await blogPost.save();
        res.redirect("/dashboard/blog")

    } catch (err) {
        console.log(err)
        res.render("dashboard/editar-post", {
            title: "Editar entrada - Munay Admin",
            layout: "admin"
        });
    }

};

// Eliminar post

dashCtrl.deletePost = async (req, res) => {

    // Encuentra post por id y lo elimina
    await BlogPost.findByIdAndDelete(req.params.id);

    res.redirect("/dashboard/blog")
};

module.exports = dashCtrl;