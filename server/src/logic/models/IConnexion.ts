import {Client} from "./Client";

export interface IConnexion{
    send(data: string): Promise<void>;
    disconnect(): void;

    subscribe(callback1: (data: string) => void): void;
    unsubscribe(callback1: (data: string) => void): void;
}