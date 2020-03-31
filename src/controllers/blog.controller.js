const blogCtrl = {};

// Mostrar todos los posts

blogCtrl.renderBlog = (req, res) => {
    res.render("blog/blog");
};

// Nuevo post

blogCtrl.renderBlogForm = (req, res) => {
    res.render("blog/nuevo-post")
};

blogCtrl.addNewPost = (req, res) => {
    res.send("add post")
};

// Editar post

blogCtrl.renderEditForm = (req, res) => {
    res.send("edit post")
};

blogCtrl.updateBlogPost = (req, res) => {
    res.send("update post")
};

// Eliminar post

blogCtrl.deleteBlogPost = (req, res) => {
    res.send("delete post")
};

module.exports = blogCtrl;