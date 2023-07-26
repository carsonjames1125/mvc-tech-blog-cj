const router = require('express').Router();

const { Comment } = require('../../models');

const withAuth = require('../../utils/auth');


// get for the comments 

router.get('/', async (req, res) => {
    try{
        const dbComData = await Comment.findAll({});
        if (dbComData.length === 0) {
            res.status(404).json({ message: "No Comment Available"});
            return;
        };
        res.status(200).json(dbComData);
    } catch(err) {
        res.status(500).json(err);
    }
});


// get for a single post

router.get('/:id', async (req, res) => {
    try {
        const comData = await Comment.findAll({
            where: { id: req.params.id },
        });
        if (comData.length === 0) {
            res.status(404).json({ message: `The id ${req.params.id} does not have any comments.`});
            return;
        }
        res.status(200).json(comData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create a comment

router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newComm = await Comment.create({
            ...body,
            userId: req.exSess.userId,
        });
        res.status(200).json({ newComm, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a comment


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const dbComData = await Comment.destroy({
            where: {id: req.params.id},
        });
        if (!dbComData) {
            res.status(404).json({
                message: `Cannot Delete Comment with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json({dbComData, success: true});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;