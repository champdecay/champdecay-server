const express = require('express'),
    router = express.Router(),
    Post = require("../controller/post")

router.post('/', Post.create)
router.get('/', Post.get)
router.get('/:id', Post.getByID)

module.exports.router = router;
