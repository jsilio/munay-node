const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const PatientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    slug: { type: String, required: true, unique: true },
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

PatientSchema.pre("validate", function(next) {

    if (this.firstName) {
        const fullName = this.firstName + " " + this.lastName;
        this.slug = slugify(fullName, { lower: true, strict: true });
    }

    next();
});

module.exports = model("Patient", PatientSchema);