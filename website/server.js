const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser'); ////////////////////////////
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');

const logger = require('./middleware/logger');
const error404 = require('./middleware/error-404');
const noCache = require('./middleware/no-cache-middleware');
const get_user = require('./middleware/get_user');

const router_index = require('./routes/book');
const bookRouter = require('./routes/main_route');
const usersRouter = require('./routes/users_route');

const uri = 'mongodb://mongodb:27017/mybooks';

const User = require('./models/User');

const app = express();

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Некорректное имя' });
            };
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Некорректный пароль' });
            };
            return done(null, user);
        } catch (err) {
            return done(err);
        };
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    };
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: uri })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger);
app.use(noCache);
app.use(get_user);

app.use('/', router_index);
app.use('/api/books', bookRouter);
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

startServer(PORT, uri);
