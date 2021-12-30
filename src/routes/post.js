const express = require('express'),
    router = express.Router(),
    Post = require("../controller/post")

router.post('/', Post.create)
router.get('/', Post.get)
// router.get('/:id', Post.getByID)
router.get('/:slug', Post.getBySlug)

module.exports.router = router;
