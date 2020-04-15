const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const BlogPostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    //   author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    author: { type: String },
    category: { type: String }
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