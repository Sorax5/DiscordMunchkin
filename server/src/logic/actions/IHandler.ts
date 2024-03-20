import {Client} from "../models/Client";

export interface IHandler {
    setNext(handler: IHandler): IHandler;
    handle(request: string, client: Client): void;
}