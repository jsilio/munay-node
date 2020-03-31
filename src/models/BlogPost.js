const {Schema, model} = require("mongoose");

new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model("Blog", BlogPostSchema);