const dashCtrl = {}

// Models
const BlogPost = require("../models/BlogPost");
const User = require("../models/User");

// Modules
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require("fs-extra");




// GET - Mostrar dashboard
dashCtrl.renderDashboard = (req, res) => {
    res.render("dashboard/dashboard", {
        title: "Dahsboard — Munay"
    })
}

// GET - Mostrar configuración de perfil
dashCtrl.renderProfile = async (req, res) => {

    const user = await User.findOne({ username: req.user.username }).lean();

    res.render("dashboard/editar-perfil", {
        user,
        title: "Editar perfil — Munay"
    });
}

// PUT - Editar perfil
dashCtrl.updateProfile = async (req, res) => {

    const { name, username, email, bio } = req.body;

    // Subir la imagen a Cloudinary
    const uploadedImg = await cloudinary.uploader.upload(req.file.path);

    const user = await User.findByIdAndUpdate(req.user.id, { name, username, email, avatar: uploadedImg.url, bio });

    // Guardar datos en la db
    try {
        await user.save();

        req.flash("success_msg", "El perfil ha sido modificado correctamente.")
        res.redirect("/dashboard/perfil")

    } catch (err) {
        console.log(err)
        res.render("dashboard/editar-perfil", {
            user,
            title: "Editar perfil — Munay"
        });
    }
};

// GET - Mostrar todos los posts 
dashCtrl.renderBlog = async (req, res) => {

    // Query
    const blogPost = await BlogPost.find()
        .populate("author")
        .lean()
        .sort({ createdAt: "desc" });

    // Render
    res.render("dashboard/blog", {
        blogPost,
        title: "Blog — Munay"
    });
};

// GET - Mostrar formulario de nueva entrada
dashCtrl.renderNewPost = (req, res) => {

    // Mostrar formulario para añadir nuevo post
    res.render("dashboard/nuevo-post", {
        title: "Crear nueva entrada — Munay"
    });

};

// POST - Añadir nuevo post
dashCtrl.addNewPost = async (req, res) => {

    // Extraer los datos del formulario
    const { title, description, content } = req.body;

    try {

        // Asignar el autor
        const author = await User.findOne({ username: req.user.username }).lean();

        // Subir la imagen a Cloudinary
        const uploadedImg = await cloudinary.uploader.upload(req.file.path);

        // Crear un nuevo post como modelo
        const newBlogPost = new BlogPost({
            title,
            description,
            content,
            coverURL: uploadedImg.url,
            public_id: uploadedImg.public_id,
            author: author._id
        });

        // Guardar post en la db
        await newBlogPost.save();

        // author.blogPosts.push(newBlogPost._id);

        // // ARREGLAR - no me permite guardar los posts en el array del modelo de usuario
        // await author.save()


        // Borrar imagen del servidor
        await fs.unlink(req.file.path);

        res.redirect("/dashboard/blog")

    } catch (err) {
        console.log(err)
        res.render("dashboard/nuevo-post", {
            title: "Crear nueva entrada — Munay"
        });
    }
};

// Editar un post del Blog
dashCtrl.renderEditPost = async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id).lean();
    res.render("dashboard/editar-post", {
        blogPost,
        title: "Editar entrada — Munay"
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
            title: "Editar entrada — Munay"
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