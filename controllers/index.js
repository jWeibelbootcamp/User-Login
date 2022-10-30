const router = require('express').Router();

// Renders Landing.handlebars when user navigates to root '/'. 
router.get('/', (req, res) => {
    res.render('landing');
});

module.exports = router;