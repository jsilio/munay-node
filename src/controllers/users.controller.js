const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");


// Mostar formulario de registro

usersCtrl.renderSignUp = (req, res) => {
    res.render("dashboard/registro", {
        title: "Registro - Munay Admin",
        layout: "auth"
    });
}

// Guardar registro

usersCtrl.signUp = async (req, res) => {

    const {name, username, email, password} = req.body;

    // Verifica si el email o el username ya está registrado
    const userMail = await User.findOne({email: email}).lean();
    const userAlias = await User.findOne({username: username}).lean();

    if (userMail) {

        req.flash("error_msg", "Este correo ya se encuentra registrado.");
        res.redirect("/dashboard/registro");
    }  
    
    else if (userAlias) {
        
        req.flash("error_msg", "Este nombre de usuario ya se encuentra en uso.");
        res.redirect("/dashboard/registro");

    } 
    
    else {

        const newUser = new User({name, username, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.redirect("/dashboard/login");

    }

}

// Mostrar formulario de login

usersCtrl.renderSignIn = (req, res) => {
    res.render("dashboard/login", {
        title: "Iniciar sesión - Munay Admin",
        layout: "auth"
    });
}


// Realizar inicio de sesión

usersCtrl.signIn = passport.authenticate("local", {
    failureRedirect: "/dashboard/login",
    successRedirect: "/dashboard",
    failureFlash: true
});

// usersCtrl.signIn = (req, res) => {
//     res.send("Sign in");
// }


// Cerrar sesión

usersCtrl.logOut = (req, res) => {
    res.send("Log out");
}


module.exports = usersCtrl;