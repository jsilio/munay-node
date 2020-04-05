const { Schema, model } = require("mongoose");

const BlogPostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String },
    category: { type: String }
}, {
    timestamps: true
})

module.exports = model("BlogPost", BlogPostSchema);