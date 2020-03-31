const {Schema, model} = require("mongoose");
const bcrypt = required(bcryptjs);

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

// Almacear la contraseña encriptada en la base de datos
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

// Comparar contraseña con la que introduce el usuario
UserSchema.methods.matchPassword = function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model("User", UserSchema);

