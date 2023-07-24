// starting with the server for the app. 

const path = require('path');
const express = require('express');
const exSess = require('express-session');
const handlebars = require('express-handlebars');
const help = require('./utils/helpers'); // folder for utils
const routes = require('./controllers'); // folder/file for routes


const app = express();

const PORT = process.env.PORT || 3001;


//sequelize

const sequelize = require('./config/connection'); //need connection.js file under a config folder

const SequelizeStore = require('connect-session-sequelize')(session.Store);

//cookie
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 300000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};


//setting up the application
app.use(exSess(session));

const handle = handlebars.create({ help });
app.engine('handlebars', handle.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//sync sequelize

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log (`Server Online. Listening on PORT ${PORT}`);
    });
});