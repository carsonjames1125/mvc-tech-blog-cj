const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


// sign up for the user 

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        req.exSess.save(() => {
            req.exSess.userId = dbUserData.id;
            req.exSess.username = dbUserData.username;
            req.exSess.loggedIn = true;
            res.status(201).json({ message: `Account Created! UserName is ${dbUserData.username}`});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// login method for an existing user

router.post('/login', async (req,res) => {
    try {
        const dbUserData = await User.findOne({
            where: {username: req.body.username}
        });
        if (!dbUserData) {
            res.status(400).json({ message: `User id ${req.params.id} is not correct.`});
            return;
        }

        // password for login

        const passWord = await dbUserData.checkPassword(req.body.password)
        if (!passWord) {
        res.status(400).json({ message: 'Password is incorrect! Please Try Again!'});
        return;
        } // create a new session 
        req.exSess.save(() => {
            req.exSess.userId = dbUserData.id;
            req.exSess.username = dbUserData.username;
            req.exSess.loggedIn = true;
            // response
            res.status(200).json({ message: 'Log In Successful!'});
        });
        } catch (err) {
            res.status(400).json(err);
    }
});

// log out method for the user, delete the current session 

router.post('/logout', withAuth, async (req, res) => {
    try {
        if (req.exSess.loggedIn) {
            const dbUserData = await req.exSess.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
        
        } catch {
            res.status(400).end();
        }
});

module.exports = router;