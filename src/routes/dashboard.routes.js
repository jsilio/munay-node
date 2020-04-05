const { Router } = require("express");
const router = Router();

const { 
    renderDashboard,
    renderBlog,
    renderNewPost, 
    addNewPost, 
    renderEditPost, 
    updatePost, 
    deletePost 
} = require("../controllers/dashboard.controller");

// Mostrar dashboard

router.get("/dashboard", renderDashboard);

// Mostrar todos los posts

router.get("/dashboard/blog", renderBlog);

// Nuevo post

router.get("/dashboard/blog/nuevo-post", renderNewPost);

router.post("/dashboard/blog/nuevo-post", addNewPost);

// Editar post

router.get("/dashboard/blog/editar/:id", renderEditPost);

router.put("/dashboard/blog/editar/:id", updatePost);

// Eliminar post

router.delete("/dashboard/blog/eliminar/:id", deletePost);

module.exports = router;