const { Router } = require("express");
const router = Router();

const { 
    renderDashboard,
    renderProfile,
    updateProfile,
    renderBlog,
    renderNewPost, 
    addNewPost, 
    renderEditPost, 
    updatePost, 
    deletePost
} = require("../controllers/dashboard.controller");

const { isAuthenticated } = require("../helpers/auth");

router.all("/*", (req, res, next) => {

    req.app.locals.layout = "admin"
    next();
    
});

// Mostrar dashboard
router.get("/dashboard", isAuthenticated, renderDashboard);

// Configuración del perfil
router.get("/dashboard/perfil", isAuthenticated, renderProfile);

// Editar perfil
router.put("/dashboard/perfil", isAuthenticated, updateProfile);

// Mostrar todos los posts
router.get("/dashboard/blog", isAuthenticated, renderBlog);

// Mostrar formulario de nuevo post
router.get("/dashboard/blog/nuevo-post", isAuthenticated, renderNewPost);

// Añadir nuevo post
router.post("/dashboard/blog/nuevo-post", isAuthenticated, addNewPost);

// Mostrar formulario de editar post
router.get("/dashboard/blog/editar/:id", isAuthenticated, renderEditPost);

// Editar post
router.put("/dashboard/blog/editar/:id", isAuthenticated, updatePost);

// Eliminar post
router.delete("/dashboard/blog/eliminar/:id", isAuthenticated, deletePost);




module.exports = router;