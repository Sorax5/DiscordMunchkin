import {AbstractNetwork} from "./AbstractNetwork";
import {Player} from "./Player";
import {IConnexion} from "./IConnexion";
import {IGlobalNetwork} from "./IGlobalNetwork";
import {ILobbyNetwork} from "./ILobbyNetwork";
import {Lobby} from "./Lobby";

type MessageCallback = (data: string, client: Client) => void;

export class Client implements IGlobalNetwork, ILobbyNetwork{
    private connexion : IConnexion;
    private identifier? : string;

    private messageCallbacks: MessageCallback[] = [];

    constructor(connexion: IConnexion){
        this.connexion = connexion;
        this.connexion.subscribe(this.OnMessageReceived.bind(this));
    }

    public SendPlayerConnected(player: Player): Promise<void> {
        let p = JSON.stringify(player);
        let command = "playerConnected";
        return this.connexion.send( command + " " + p);
    }

    public SendPlayerDisconnected(identifier: string): Promise<void> {
        let command = "playerDisconnected";
        return this.connexion.send(command + " " + identifier);
    }

    public SendLobbyCreated(lobby: Lobby): Promise<void> {
        let l = JSON.stringify(lobby);
        let command = "lobbyCreated";
        return this.connexion.send(command + " " + l);
    }

    public SendLobbyDestroyed(lobby: Lobby): Promise<void> {
        let command = "lobbyDestroyed";
        let l = JSON.stringify(lobby);
        return this.connexion.send(command + " " + l);
    }

    public SendPlayerJoinLobby(lobby: Lobby, player: Player): Promise<void> {
        let command = "playerJoinLobby";
        let l = JSON.stringify(lobby);
        let p = JSON.stringify(player);

        return this.connexion.send(command + " " + l + " " + p);
    }

    public SendPlayerLeaveLobby(lobby: Lobby, player: Player): Promise<void> {
        let command = "playerLeaveLobby";
        let l = JSON.stringify(lobby);
        let p = JSON.stringify(player);

        return this.connexion.send(command + " " + l + " " + p);
    }

    public SendPlayerIsAlreadyInLobby(player: Player): Promise<void> {
        let command = "playerIsAlreadyInLobby";
        let p = JSON.stringify(player);

        return this.connexion.send(command + " " + p);
    }

    public SendPlayerIsNotInLobby(player: Player): Promise<void> {
        let command = "playerIsNotInLobby";
        let p = JSON.stringify(player);

        return this.connexion.send(command + " " + p);
    }

    public subscribe(callback: (data: string, client: Client) => void){
        this.messageCallbacks.push(callback);
    }

    public unsubscribe(callback: (data: string, client: Client) => void){
        this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    }

    private OnMessageReceived(data: string){
        this.messageCallbacks.forEach(callback => callback(data, this));
    }

    public setIdentifier(identifier: string){
        this.identifier = identifier;
    }

    public getIdentifier(){
        return this.identifier;
    }

    public disconnect(){
        this.connexion.disconnect();
    }
}