const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authToken = require('../middlewares/verifyToken')


router.get('/blogs', blogController.getBlogs);


router.get('/blogs/:id', blogController.getBlogById);


router.post('/blogs/create',authToken, blogController.createBlog);

router.put('/blogs/update/:id', authToken, blogController.updateBlog);


router.delete('/blogs/delete/:id', authToken, blogController.deleteBlog);


router.delete('/blogs/delete', authToken, blogController.deleteBlogs);

module.exports = router;
