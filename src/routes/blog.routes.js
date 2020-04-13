const { Router } = require("express");
const router = Router();

const { 
    renderBlog,
    renderBlogPost,
    renderBlogSearch, 
} = require("../controllers/blog.controller");

//  Mostrar todos los posts

router.get("/blog", renderBlog);

//  Mostrar un artículo del blog

router.get("/blog/:slug", renderBlogPost)

// Búsqueda de posts

router.get("/blog/busqueda", renderBlogSearch)


module.exports = router;