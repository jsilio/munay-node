const dashCtrl = {}

// Models
const BlogPost = require("../models/BlogPost");

// Modules
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require("fs-extra");

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
        title: "Blog - Munay Admin",
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

    
    try {
        const uploadedImg = await cloudinary.uploader.upload(req.file.path);
        // Pasar los datos a la db
        const newBlogPost = new BlogPost({ 
            title, 
            description, 
            content, 
            coverURL: uploadedImg.url,
            public_id: uploadedImg.public_id
        });

        // Guardar datos en la db
        await newBlogPost.save();
        await fs.unlink(req.file.path);
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
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    await cloudinary.uploader.destroy(blogPost.public_id);
    res.redirect("/dashboard/blog")
};

module.exports = dashCtrl;