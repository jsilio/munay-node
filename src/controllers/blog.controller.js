const blogCtrl = {};

const BlogPost = require("../models/BlogPost");

// Mostrar todos los posts

blogCtrl.renderBlog = async (req, res) => {

    const blogPost = await BlogPost.find().lean().sort({ createdAt: "desc" });
    
    res.render("blog/blog", { 
        blogPost,
        title: "Blog — Munay Psicología Clinica y Neuropsicología"
     });
};

// Mostrar un artículo

blogCtrl.renderBlogPost = async (req, res) => {

    const blogPost = await BlogPost.findOne({ slug: req.params.slug })
        .lean()
        .populate("author");

    if (blogPost == null) res.redirect("/blog")
 
    res.render("blog/blog-post", {
        blogPost,
        title: blogPost.title + " — Munay"
     });
}

// Búsqueda de posts

blogCtrl.renderBlogSearch = (req, res) => {
    res.render("blog/blog-buscar", {
        title: "Resultados de búsqueda — Munay"
    })
}

module.exports = blogCtrl;