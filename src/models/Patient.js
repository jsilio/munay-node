const { Schema, model } = require("mongoose");

const PatientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    gender: { type: String },
    birthdate: { type: Date },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    birthplace: { type: String },
    residence: { type: String },
    summary: { type: String },
    address: { type: String},
    evaluation: {type: Schema.Types.ObjectId, ref: "Evaluation"},
}, {
    timestamps: true
});


module.exports = model("Patient", PatientSchema);