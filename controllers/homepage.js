const router = require('express').Router();

const { Post, User, Comment } = require('../models');

const sequelize = require('../config/connection');



// get route for all of the posts

router.get('/', async (req, res) => {
    try {
        // grabs all posts listed in the database
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            order: [['created_at', 'DESC']],
        })
        // editing recieved data to serialize when incoming
        const posts = dbPostData.map((post) => post.get({ plain:true }));
        console.log(posts)
        res.render('homepage',
        { posts,
        loggedIn: req.exSess.loggedIn,
        username: req.exSess.username,
        userId: req.exSess.userId });
    } catch (err) {
        res.status(500).json(err);
    }
});