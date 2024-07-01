// Библиотеки
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const socketIO = require('socket.io');
const sharedSession = require('socket.io-express-session');
const http = require('http');

// Middleware
const { logger, get_user, noCache } = require('./middlewares');

// Routes
const { mainRouter, bookRouter, usersRouter } = require('./controllers');

// Model
const { User, Comment } = require('./models');

// Настройка портов
const uri = 'mongodb://mongodb:27017/mybooks';
const PORT = process.env.PORT || 3000;

// Объявление серверов
const app = express();
const server = http.Server(app)
const io = socketIO(server);

// Настройки сессии
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: uri })
});

io.use(sharedSession(sessionMiddleware, {
    autoSave: true
}));

// Аутентификация
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

// Настройка кодировок и папок для хранения файлов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use('/public', express.static(__dirname + '/public'));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// подключение Middleware
app.use(logger);
app.use(noCache);
app.use(get_user);

// Настройка и подключение Route
app.use('/', mainRouter);
app.use('/api/books', bookRouter);
app.use('/api/users', usersRouter);

// Чат у книги
io.on('connection', (socket) => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);

    const { roomName } = socket.handshake.query;
    Comment.find({ bookId: roomName })
        .sort({ date: 1 })
        .then(messages => {
            socket.emit('load-messages', messages);
        })
        .catch(err => console.error(err));

    const createComment = (msg, bookId) => {
        if (!msg.text) {
            throw new Error('Text is required');
        };
        const comment = new Comment({
            ...msg,
            bookId: bookId
        });
        return comment.save();
    };

    socket.join(roomName);

    socket.on('message-to-room', async (msg) => {
        try {
            const savedComment = await createComment(msg, roomName);
            socket.to(roomName).emit('message-to-room', savedComment);
            socket.emit('message-to-room', savedComment);
        } catch (error) {
            console.error(error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});
async function startServer(PORT, uri) {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('Mongodb подключено!!!');

        server.listen(PORT, async () => {
            console.log(`Server is located in http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Ошибка при подключении к MongoDB:', err);
    };
};

startServer(PORT, uri);
