const dashCtrl = {}

// Models
const BlogPost = require("../models/BlogPost");
const User = require("../models/User");

// Modules

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});

// GET - Mostrar dashboard
dashCtrl.renderDashboard = (req, res) => {
    res.render("dashboard/dashboard", {
        title: "Dahsboard — Munay",
        active: { dashboard: true }
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
    

    const uploadedImg = req.file.location;
    

    const user = await User.findByIdAndUpdate(req.user.id, { name, username, email, avatar: uploadedImg, bio });

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
        title: "Blog — Munay",
        active: { blog: true }
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

        // Datos de la imagen
        const uploadedImg = req.file.location;
        const key = req.file.key;

        // Crear un nuevo post como modelo
        const newBlogPost = new BlogPost({
            title,
            description,
            content,
            coverURL: uploadedImg,
            key,
            author: author._id
        });

        // Guardar post en la db
        await newBlogPost.save();

        res.redirect("/dashboard/blog")

    } catch (err) {
        console.log(err)
        res.render("dashboard/nuevo-post", {
            title: "Crear nueva entrada — Munay",
            description: description
        });
    }
};

// GET - Renderizar vista de edición de entrada
dashCtrl.renderEditPost = async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id).lean();
    res.render("dashboard/editar-post", {
        blogPost,
        title: "Editar entrada — Munay"
    });
};

// PUT - Editar entrada
dashCtrl.updatePost = async (req, res) => {

    const { title, description, content } = req.body;

    const uploadedImg = req.file.location;

    const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, { 
        title, 
        description, 
        content,
        coverURL: uploadedImg });

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
    
    const blogPost = await BlogPost.findById(req.params.id)
    console.log(blogPost.key);
    
    // Elimina la imagen del bucket de S3
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: blogPost.key
    }

    s3.deleteObject(params, (error) => {
        if (error) {
          console.log(error)
        }
      });


    // Encuentra post por id y lo elimina de la base de datos
    await BlogPost.findByIdAndDelete(req.params.id);

    res.redirect("/dashboard/blog")
};



module.exports = dashCtrl;