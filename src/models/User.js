const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String }
}, {
    timestamps: true
});

// Almacear la contraseña encriptada en la base de datos
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Comparar contraseña con la que introduce el usuario
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model("User", UserSchema);

