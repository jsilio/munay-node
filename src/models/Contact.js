const { Schema, model } = require("mongoose");

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
}, {
    timestamps: true
})

module.exports = model("Contact", ContactSchema);