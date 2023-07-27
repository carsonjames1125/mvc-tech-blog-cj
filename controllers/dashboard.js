const router = require('express').Router();

const { User, Post, comment } = require('../models');

const withAuth = require('../utils/auth');

const sequelize = require('../config/connection');

// all posts made by the user get route 

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.exSess.userId,
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
            model: comment,
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
    })
 .then((dbPostData) => {
    const posts = dbPostData.map((post)=> post.get({ plain:true }));
    res.render('dashboard', { posts, loggedIn: true, username: req.exSess.username,});
}).catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
});

// get route for editing one post

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: comment,
                attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
        ],
}) .then((dbPostData) => {
    if (!dbPostData) {
        res.status(404).json({ message: 'There is no post available with that ID.'});
        return;
    }
    const post = dbPostData.get({ plain: true });
    res.render('edit-post', { post, loggedIn: true, username: req.exSess.username });
}).catch((err) => {
    console.log(err);
    res.status(500).json(err);
});
});

// getting a new post

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { username: req.exSess.username });
});

module.exports = router;


