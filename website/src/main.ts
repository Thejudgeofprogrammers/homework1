console.clear()

import "reflect-metadata";
import * as http from 'http';
import { Server as SocketIOServer} from 'socket.io';
import express from "express";
import path from "path";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { configDotenv, container, sessionConfig, swaggerOptions, passport, sharedSessionConfig } from "./config"
import { AppController, UsersController, AuthController, BooksController } from "./modules";
import { logger, getUserData, disableCache } from './middlewares';
import { Comment } from "./models";
import { ICommentDTO } from "./dtos/comment";

const app = express();
const server: http.Server = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server);

const uri: string = configDotenv.uri;
const port: number = Number(configDotenv.port);

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(disableCache);
app.use(logger);
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());
app.use(getUserData);

io.use(sharedSessionConfig);

const controllers = [
    container.get<AppController>(AppController),
    container.get<AuthController>(AuthController),
    container.get<BooksController>(BooksController),
    container.get<UsersController>(UsersController)
];

controllers.forEach(controller => {
    app.use('/', controller.router);
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

    const createComment = (msg: ICommentDTO, bookId: string[] | string) => {
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
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

async function startServer(PORT: number, uri: string) {
    try {
        await mongoose.connect(uri);
        console.log('Mongodb подключено!!!');
        server.listen(PORT, () => {
            console.log(`Server is located in http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Ошибка при подключении к MongoDB:', err);
    };
};

startServer(port, uri);
