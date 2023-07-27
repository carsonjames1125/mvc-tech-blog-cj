const router = require('express').Router();

const { User, Post, comment } = require('../..models');

const withAuth = require('../../utils/auth');


// creating a new post in the apllication

router.post('/', withAuth, async (req,res) => {
    try {
        const newPost = await Post.create({ ...req.body, userId: req.exSess.userId });
        console.log('New post', newPost);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// editing a post within the application

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePst = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!updatePst) {
            res.status(404).json({ message: 'This ID has no content' });
            return;
        }
        res.status(200).json(updatePst);
    } catch (err) {
        res.status(500).json(err);
    }
});


// deleting a post within the application


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const delComm = await comment.destroy({
            where: { postId: req.params.id },
        });
            const postData = await Post.destroy({
                where: {
                    id: req.params.id, 
                    userId: req.exSess.userId,
                },
            });
        if (!postData) {
            res.status(404).json({
                message: `No User ID ${req.exSess.userId} found with the id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
