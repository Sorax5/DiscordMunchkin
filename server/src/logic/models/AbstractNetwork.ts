import {Player} from "./Player";
import {Client} from "./Client";
import {IGlobalNetwork} from "./IGlobalNetwork";
import {ILobbyNetwork} from "./ILobbyNetwork";
import { Lobby } from "./Lobby";

export abstract class AbstractNetwork implements IGlobalNetwork, ILobbyNetwork {
    private clients: Client[] = [];

    public addClient(client: Client): void {
        this.clients.push(client);
        client.subscribe(this.OnMessageReceived);
    }

    public removeClient(client: Client): void {
        this.clients = this.clients.filter(c => c !== client);
        client.unsubscribe(this.OnMessageReceived);
        client.disconnect();
    }

    public SendPlayerConnected(player: Player): void {
        let client = this.GetClient(player.getIdentifier());
        if (client === undefined) {
            return;
        }

        client.SendPlayerConnected(player);
    }

    public SendPlayerDisconnected(identifier: string): void {
        let client = this.GetClient(identifier);
        if (client === undefined) {
            return;
        }

        client.SendPlayerDisconnected(identifier);
        this.removeClient(client);
    }

    public SendPlayerJoinLobby(lobby: Lobby, player: Player): void {
        lobby.getOpponents().forEach((opponent: Player) => {
            let client = this.GetClient(opponent.getIdentifier());
            if (client === undefined) {
                return;
            }

            client.SendPlayerJoinLobby(lobby, player);
        });

        let client = this.GetClient(lobby.getMaster().getIdentifier());
        if (client === undefined) {
            return;
        }

        client.SendPlayerJoinLobby(lobby, player);
    }

    public SendPlayerLeaveLobby(lobby: Lobby, player: Player): void {
        lobby.getOpponents().forEach((opponent: Player) => {
            let client = this.GetClient(opponent.getIdentifier());
            if (client === undefined) {
                return;
            }

            client.SendPlayerLeaveLobby(lobby, player);
        });

        let client = this.GetClient(lobby.getMaster().getIdentifier());
        if (client === undefined) {
            return;
        }

        client.SendPlayerLeaveLobby(lobby, player);
    }

    public SendLobbyDestroyed(lobby: Lobby): void {
        lobby.getOpponents().forEach((opponent: Player) => {
            let client = this.GetClient(opponent.getIdentifier());
            if (client === undefined) {
                return;
            }

            client.SendLobbyDestroyed(lobby);
        });

        let client = this.GetClient(lobby.getMaster().getIdentifier());
        if (client === undefined) {
            return;
        }

        client.SendLobbyDestroyed(lobby);
    }

    public SendLobbyCreated(lobby: Lobby): void {
        let client = this.GetClient(lobby.getMaster().getIdentifier());
        if (client === undefined) {
            return;
        }

        client.SendLobbyCreated(lobby);
    }

    public SendPlayerIsAlreadyInLobby(player: Player): void {
        let client = this.GetClient(player.getIdentifier());
        if (client === undefined) {
            return;
        }

        client.SendPlayerIsAlreadyInLobby(player);
    }

    public SendPlayerIsNotInLobby(player: Player): void {
        let client = this.GetClient(player.getIdentifier());
        if (client === undefined) {
            return;
        }

        client.SendPlayerIsNotInLobby(player);
    }

    public GetClient(identifier: string): Client {
        return this.clients.find(c => c.getIdentifier() === identifier);
    }

    public abstract OnMessageReceived(message: string, client: Client): void;
}