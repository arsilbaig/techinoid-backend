const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authToken = require('../middlewares/verifyToken')


router.get('/blogs', blogController.getBlogs);


router.get('/blogs/:id', blogController.getBlogById);


router.post('/create', authToken, blogController.createBlog);


router.put('/update/:id', authToken, blogController.updateBlog);


router.delete('/delete/:id', authToken, blogController.deleteBlog);

module.exports = router;
