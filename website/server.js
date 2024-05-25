const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const logger = require('./middleware/logger');
const error404 = require('./middleware/error-404');
const noCache = require('./middleware/no-cache-middleware');
const get_user = require('./middleware/get_user');


const bookRouter = require('./routes/book');
const mainRouter = require('./routes/main_route');
const usersRouter = require('./routes/users_route');


const db = require('./database');


const verify = (username, password, done) => {
    db.users.findByUsername(username, (err, user) => {
        if (err) {
            return done(err)
        };
        if (!user) {
            return done(null, false)
        };
        if (!db.users.verifyPassword(user, password)) {
            return done(null, false)
        };
        return done(null, user);
    })
};

const options = {
    usernameField: "username",
    passwordField: "password",
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    db.users.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        };
        cb(null, user);
    });
});


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(session({ secret: 'SECRET' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger);
app.use(noCache);
app.use(get_user);

app.use('/', bookRouter);
app.use('/api/books', mainRouter);
app.use('/api/users', usersRouter);

app.use('/public', express.static(__dirname + '/public'));
app.use(error404);

async function startServer(PORT, uri) {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Mongodb подключено!!!')
        app.listen(PORT, async () => {
            console.log(`Server is located in http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Ошибка при подключении к MongoDB:', err);
    };
};

const PORT = process.env.PORT || 3000;

const uri = 'mongodb://mongodb:27017/mybooks';

startServer(PORT, uri);
