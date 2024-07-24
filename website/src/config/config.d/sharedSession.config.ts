import { Socket } from "socket.io";
import { sessionConfig } from "./session.config";
import sharedSession from "express-socket.io-session";

const sharedSessionConfig = sharedSession(sessionConfig, {
    autoSave: true
}) as unknown as (socket: Socket, next: (err?: any) => void) => void;

export { sharedSessionConfig };