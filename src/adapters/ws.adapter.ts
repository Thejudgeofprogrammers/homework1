import { INestApplication, WebSocketAdapter } from "@nestjs/common";
import { MessageMappingProperties } from "@nestjs/websockets";
import { Observable, fromEvent, EMPTY } from "rxjs";
import { filter, mergeMap } from "rxjs/operators";
import * as WebSocket from 'ws';

export class WsAdapter implements WebSocketAdapter {
    constructor(private app: INestApplication) {};

    create(port: number, options: any = {}): any {
        return new WebSocket.Server({ port, ...options });  
    };

    bindClientConnect(server, callback: Function) {
        server.on('connection', callback);   
    };

    bindMessageHandlers(
        client: WebSocket, 
        handlers: MessageMappingProperties[], 
        process: (data: any) => Observable<any>
    ) {
        fromEvent(client, 'message')
        .pipe(
            mergeMap(data => this.bindMessageHandler(data, handlers, process)),
            filter(result => result)
        )
        .subscribe(response => client.send(JSON.stringify(response)));
    };

    bindMessageHandler(
        buffer,
        handlers: MessageMappingProperties[],
        process: (data: any) => Observable<any>
    ) {
        const message = JSON.parse(buffer.data);
        const messageHandler = handlers.find(
            handler => handler.message = message.event
        );
        if (!messageHandler) {
            return EMPTY;
        };
        return process(messageHandler.callback(message.data));
    };

    close(server) {
        server.close();
    };
};
