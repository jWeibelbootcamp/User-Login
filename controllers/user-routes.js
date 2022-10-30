const router = require('express').Router();
const User = require('../models/User');

// Login a User from Landing page (default '/'). Render the Account page.
router.get('/', (req, res) => {
    res.render('account')
});

// not sure about this yet we'll see
router.post('/', (req, res, next) => {
});

// Register a new User from the Landing page. Render the Account page.
router.post('/', (req, res) => {
    const {username, email, password, password2} = req.body;
    let error = [];
    
    // make sure all field have a value
    if(!username || !email || !password || !password2) {
        error.push({ msg: "Please complete all fields." })
    };

    // check if passwords match.
    if(password !== password2) {
        error.push({ msg: "Passwords do not match." })
    };

    // check password length.
    if(password.length < 8) {
        error.push({ msg: "Password must be at least 8 characters long." })
    };

    // display an error message if there is one.
    if(error.length > 0) {
        res.render('landing', {
            error: error,
            username: username,
            email: email,
            password: password,
            password2: password2
        })
    } else {
        // check if user with that email already exists.
        User.findOne({ email : email }).exec((err, user) => {
            console.log(user);
            if(user) {
                error.push({ msg: "A user with that email already exists." })
            // pass.    
            } else {
                const newUser = new User({
                    username : username, 
                    email : email,
                    password : password
                });
            };
        });
    };
    res.render('account');
});

// Logout a User from the Account Page (button). Render the Landing page.
router.get('/account', (req, res) => {
    res.render('landing')
});

module.exports = router; 