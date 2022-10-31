const router = require('express').Router();
const passport = require('../config/passport');
const User = require('../models/User');

// Login a User from Landing page (default '/'). Render the Account page.
router.get('/', (req, res) => {
    res.render('account')
});

// not sure about this yet we'll see
router.post('/', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect : '/account',
        failureRedirect : '/',
    }) (req, res, next);
});

// Register a new User from the Landing page. 
router.post('/', (req, res) => {
    const {username, email, password, password2} = req.body;
    let error = [];
    
    // make sure all fields have a value
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
            // create new User.    
            } else {
                const newUser = new User({
                    username : username, 
                    email : email,
                    password : password
                });
                // encrypt password with bcrypt.
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password,salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then((value) => {
                        console.log(value);
                        res.redirect('/');
                    })
                    .catch(value => console.log(value));
                }));
            };
        });
    };
});

// Logout a User from the Account Page (button). Render the Landing page.
router.get('/account', (req, res) => {
    res.render('landing')
});

module.exports = router; 