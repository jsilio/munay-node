const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
    author: { type: String, required: true },
    text: { type: String, required: true},
}, {
    timestamps: true
})


module.exports = model("Comment", CommentSchema);