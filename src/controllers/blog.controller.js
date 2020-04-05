const blogCtrl = {};

const BlogPost = require("../models/BlogPost");

// Mostrar todos los posts

blogCtrl.renderBlog = async (req, res) => {

    const blogPosts = await BlogPost.find().lean();

    res.render("blog/blog", { blogPosts });
};

// Mostrar un artículo

blogCtrl.renderBlogPost = (req, res) => {
    res.render("blog/blog-post");
}

// Búsqueda de posts

blogCtrl.renderBlogSearch = (req, res) => {
    res.render("blog/blog-buscar")
}

module.exports = blogCtrl;