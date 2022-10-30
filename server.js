const express = require('express');
const router = express.Router();
const path = require('path');
const handlebars = require('express-handlebars');
const sequelize = require('./config/connection');
const index = require('./controllers/index');
const user = require('./controllers/user-routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars stuff
const hbs = handlebars.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setup static Public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Setup base Routes
app.use('/', index);
app.use('/user', user);

// Start server
// sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}, at http://localhost:3001`);
    });
// });