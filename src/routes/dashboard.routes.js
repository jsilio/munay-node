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

const { isAuthenticated } = require("../helpers/auth");

// Mostrar dashboard

router.get("/dashboard", isAuthenticated, renderDashboard);

// Mostrar todos los posts

router.get("/dashboard/blog", isAuthenticated, renderBlog);

// Nuevo post

router.get("/dashboard/blog/nuevo-post", isAuthenticated, renderNewPost);

router.post("/dashboard/blog/nuevo-post", isAuthenticated, addNewPost);

// Editar post

router.get("/dashboard/blog/editar/:id", isAuthenticated, renderEditPost);

router.put("/dashboard/blog/editar/:id", isAuthenticated, updatePost);

// Eliminar post

router.delete("/dashboard/blog/eliminar/:id", isAuthenticated, deletePost);

module.exports = router;