const dashCtrl = {}

const BlogPost = require("../models/BlogPost");

// Mostrar dashboard

dashCtrl.renderDashboard = (req, res) => {
    res.render("dashboard/dashboard")
}

// Mostrar todos los posts 

dashCtrl.renderBlog = async (req, res) => {

    const blogPosts = await BlogPost.find().lean();

    res.render("dashboard/blog", { blogPosts });
};

// Crear nuevo post del blog

dashCtrl.renderNewPost = (req, res) => {

    // Mostrar formulario para añadir nuevo post
    res.render("dashboard/nuevo-post")
};

dashCtrl.addNewPost = async (req, res) => {

    // Extraer los datos del formulario
    const {title, content} = req.body; 
    // Pasar los datos a la db
    const newBlogPost = new BlogPost({title, content});
    // Guardar datos en la db
    await newBlogPost.save(); 

    res.redirect("/dashboard/blog")
};

// Editar un post del Blog

dashCtrl.renderEditPost = async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id).lean();
    res.render("dashboard/editar-post", {blogPost});
};

dashCtrl.updatePost = async (req, res) => {
    const {title, content} = req.body;
    await BlogPost.findByIdAndUpdate(req.params.id, {title, content});
    res.redirect("/dashboard/blog");
};

// Eliminar post

dashCtrl.deletePost = async (req, res) => {

    // Encuentra post por id y lo elimina
    await BlogPost.findByIdAndDelete(req.params.id); 
    
    res.redirect("/dashboard/blog")
};

module.exports = dashCtrl;