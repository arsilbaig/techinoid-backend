const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');


router.get('/blogs', blogController.getBlogs);


router.get('/blogs:id', blogController.getBlogById);


router.post('/create', blogController.createBlog);


router.put('/update:id', blogController.updateBlog);


router.delete('/delete:id', blogController.deleteBlog);

module.exports = router;
