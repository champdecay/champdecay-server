const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    name: String,
    slug: String,
    content: String,
    featured_image: String,
    excerpt: String,
    tags: [String],
}, { timestamps: true })

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;