const { Schema, model } = require("mongoose");

const PatientSchema = new Schema({
    name: { type: String, required: true },
    gender: { type: String },
    birthdate: { type: Date },
    birthplace: { type: String },
    address: { type: String },
    summary: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
}, {
    timestamps: true
});


module.exports = model("Patient", PatientSchema);