import { WebSocket } from 'ws';
import {IConnexion} from "../logic/models/IConnexion";
import {Client} from "../logic/models/Client";

type MessageCallback = (data: string) => void;

export class WebsocketConnexion implements IConnexion {
    private ws: WebSocket;
    private messageCallbacks: MessageCallback[] = [];

    constructor(ws: WebSocket){
        this.ws = ws;
        this.ws.on('message', (data) => {
            this.messageCallbacks.forEach(callback => callback(data.toString()));
        });
    }

    disconnect(): void {
        return this.ws.close();
    }
    send(data: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.ws.send(data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    subscribe(callback: (data: string) => void): void {
        this.messageCallbacks.push(callback);
    }

    unsubscribe(callback: (data: string) => void): void {
        this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    }
}
