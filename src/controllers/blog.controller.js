const blogCtrl = {};

const BlogPost = require("../models/BlogPost");

// Mostrar todos los posts

blogCtrl.renderBlog = async (req, res) => {

    const blogPost = await BlogPost.find().lean().sort({ createdAt: "desc" });

    res.render("blog/blog", { blogPost });
};

// Mostrar un artículo

blogCtrl.renderBlogPost = async (req, res) => {

    const blogPost = await BlogPost.findOne({ slug: req.params.slug }).lean();

    if (blogPost == null) res.redirect("/blog")
 
    res.render("blog/blog-post", { blogPost });
}

// Búsqueda de posts

blogCtrl.renderBlogSearch = (req, res) => {
    res.render("blog/blog-buscar")
}

module.exports = blogCtrl;