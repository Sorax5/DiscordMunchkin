import {IHandler} from "./IHandler";
import {Client} from "../models/Client";

export abstract class AbstractHandler implements IHandler {
    private nextHandler: IHandler;
    private command: string;

    constructor(command: string) {
        this.command = command;
    }

    handle(request: string, client: Client): void {
        if(!this.getCommand(request)) {
            this.nextHandler.handle(request, client);
        }
    }

    setNext(handler: IHandler): IHandler {
        this.nextHandler = handler;
        return handler;
    }

    private getCommand(request : string): boolean {
        let command = request.split(' ')[0];
        return command === this.command;
    }

    protected getArgs(request: string): string[] {
        return request.split(' ').slice(1);
    }

}