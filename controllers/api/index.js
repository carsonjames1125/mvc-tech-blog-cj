const router = require('express').Router();

const userRoutes = require('./users');

const postRoutes = require('./posts');

const commentRoutes = require('./comment-route');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router; 