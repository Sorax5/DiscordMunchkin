import {ILobbyObserver} from "./ILobbyObserver";
import {Lobby} from "../models/Lobby";
import {Player} from "../models/Player";

export abstract class LobbySubject {
    private observers: ILobbyObserver[] = [];

    public subscribe(observer: ILobbyObserver): void {
        this.observers.push(observer);
    }

    public unsubscribe(observer: ILobbyObserver): void {
        this.observers = this.observers.filter((obs: ILobbyObserver) => obs !== observer);
    }

    public NotifyPlayerJoinLobby(lobby: Lobby, player: Player): void {
        this.observers.forEach(observer => observer.OnPlayerJoinLobby(lobby, player));
    }

    public NotifyPlayerLeaveLobby(lobby: Lobby, player: Player): void {
        this.observers.forEach(observer => observer.OnPlayerLeaveLobby(lobby, player));
    }

    public NotifyLobbyDestroyed(lobby: Lobby): void {
        this.observers.forEach(observer => observer.OnLobbyDestroyed(lobby));
    }

    public NotifyLobbyCreated(lobby: Lobby): void {
        this.observers.forEach(observer => observer.OnLobbyCreated(lobby));
    }

    public NotifyPlayerIsAlreadyInLobby(player: Player): void {
        this.observers.forEach(observer => observer.OnPlayerIsAlreadyInLobby(player));
    }
}