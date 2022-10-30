const router = require('express').Router();

// Login a User from Landing page (default '/'). Render the Account page.
router.get('/', (req, res) => {
    res.render('account')
});

// not sure about this yet we'll see
router.post('/', (req, res, next) => {
});

// Register a new User from the Landing page. Render the Account page.
router.post('/', (req, res) => {
    res.render('account')
});

// Logout a User from the Account Page (button). Render the Landing page.
router.get('/account', (req, res) => {
    res.render('landing')
});

module.exports = router; 