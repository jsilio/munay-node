const { Router } = require("express");
const router = Router();

const { 
    renderBlog, 
    renderBlogForm, 
    addNewPost, 
    renderEditForm, 
    updateBlogPost, 
    deleteBlogPost 
} = require("../controllers/blog.controller");

//  Mostrar todos los posts
router.get("/blog", renderBlog);

// Nuevo post
router.get("/blog/nuevo-post", renderBlogForm);

router.post("/blog/nuevo-post", addNewPost);

// Editar post

router.get("/blog/editar/:id", renderEditForm);

router.post("/blog/editar/:id", updateBlogPost);

// Eliminar post

router.delete("/blog/eliminar/:id", deleteBlogPost);

module.exports = router;