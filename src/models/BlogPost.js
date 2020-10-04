const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const BlogPostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    content: { type: String },
    slug: { type: String, required: true, unique: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    coverURL: { type: String },
    key: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    top: { type: Boolean, default: false }
}, {
    timestamps: true
})

// Guardar los títulos de forma valida para mostrar como url de cada entrada
BlogPostSchema.pre("validate", function(next) {

    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    next();
});

module.exports = model("BlogPost", BlogPostSchema);