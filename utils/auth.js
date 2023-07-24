const withAuth = (req, res, next) => {
    if (!req.exSess.loggedIn) {
        res.redirect('/login');
    } else {
        next()
    }
};

module.exports = withAuth;