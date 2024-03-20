import {IGlobalObserver} from "./IGlobalObserver";
import {Player} from "../models/Player";

export abstract class GlobalSubject {
    private observers: IGlobalObserver[] = [];

    public subscribe(observer: IGlobalObserver): void {
        this.observers.push(observer);
    }

    public unsubscribe(observer: IGlobalObserver): void {
        this.observers = this.observers.filter((obs: IGlobalObserver) => obs !== observer);
    }

    public notifyPlayerConnected(player: Player): void {
        this.observers.forEach((observer: IGlobalObserver) => observer.OnPlayerConnected(player));
    }

    public notifyPlayerDisconnected(identifier: string): void {
        this.observers.forEach((observer: IGlobalObserver) => observer.OnPlayerDisconnected(identifier));
    }
}