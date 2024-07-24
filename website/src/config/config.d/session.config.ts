import { configDotenv } from "./dotenv.config";
import session from "express-session";
import MongoStore from "connect-mongo";

const sessionConfig = session({
    secret: configDotenv.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ 
        mongoUrl: configDotenv.uri
    }),
    cookie: { secure: false }
});

export { sessionConfig };
