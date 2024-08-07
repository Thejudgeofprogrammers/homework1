import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

@Catch()
export class WsExceptionFilter implements ExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost) {
        const ctx = host.switchToWs();
        const client: Socket = ctx.getClient();
        
        client.emit('error-info', {
            name: exception.name,
            message: exception.message,
            timeStamp: new Date().toISOString()
        });    
    };
};
