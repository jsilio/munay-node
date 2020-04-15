const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
}, async (username, password, done) => {

    // Verificar si el usuario existe en la db
    const user = await User.findOne({username}).lean();

    if (!user){
        return done(null, false, {message: "El usuario no existe."});
    } else {
        // Verificar si la contraseña coincide
       const match = await user.matchPassword(password);

        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: "La contraseña es incorrecta."})
        }

    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})