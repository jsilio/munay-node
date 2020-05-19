const { Schema, model } = require("mongoose");

const EvaluationSchema = new Schema({
    consultationReason: {
        problemDescription: { type: String },
        startCourse: { type: String }
    },

    sociodemographicData: {
        education: { type: String },
        workStatus: { type: String },
        workHistory: { type: String }
    },

    familyData: {
        interestData: { type: String },
        maritalStatus: { type: String },
        partner: { type: Boolean },
        partnerEducation: { type: String },
        partnerWork: { type: String }
    },

    psychosocialArea: {
        supportCircle: { type: String },
        recreationalActivities: { type: String }
    },

    psychiatricHistory: {
        symptoms: { type: String },
        treatment: { type: String },
        duration: { type: String },
        location: { type: String },
        problem: { type: String }
    },

    physicalHealth: {
        healthStatus: { type: String },
        medication: { type: String },
        symptoms: { type: String }
    }

}, {
    timestamps: true
});


module.exports = model("Evaluation", EvaluationSchema);