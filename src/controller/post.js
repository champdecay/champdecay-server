var slugify = require('slugify')
const Post = require("../models/post")

exports.create = async (req, res) => {
    const { name, content, featured_image, excerpt, tags } = req.body
    try {
        const post = await Post.create({ name, slug: slugify(name), content, featured_image, excerpt, tags })
        res.status(201).json(post)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.get = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ 'createdAt': -1 })
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getByID = async (req, res) => {
    const { id } = req.params
    try {
        const posts = await Post.findById(id, 'name')
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
}
