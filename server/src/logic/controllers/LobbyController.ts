import {Lobby} from "../models/Lobby";
import {Player} from "../models/Player";
import {LobbySubject} from "../observers/LobbySubject";

export class LobbyController extends LobbySubject{
    private lobbies: Lobby[];

    public constructor(){
        super();
        this.lobbies = [];
    }

    public createLobby(master: Player): Lobby{
        if (this.isInLobby(master)){
            this.NotifyPlayerIsAlreadyInLobby(master);
        }

        const lobby = new Lobby(master);
        this.lobbies.push(lobby);
        this.NotifyLobbyCreated(lobby);
        return lobby;
    }

    public joinLobby(player: Player, lobbyIdentifier: string): void{
        if (this.isInLobby(player)){
            this.NotifyPlayerIsAlreadyInLobby(player);
        }

        const lobby = this.getLobby(lobbyIdentifier);
        lobby.addOpponent(player);
        this.NotifyPlayerJoinLobby(lobby, player);
    }

    public leaveLobby(player: Player): void{
        const lobby = this.lobbies.find(l => l.getMaster().getIdentifier() === player.getIdentifier() || l.getOpponents().some(p => p.getIdentifier() === player.getIdentifier()));
        if (!lobby){
            throw new Error("Player is not in a lobby");
        }

        if (lobby.getMaster().getIdentifier() === player.getIdentifier()){
            this.lobbies = this.lobbies.filter(l => l.getIdentifier() !== lobby.getIdentifier());
        } else {
            lobby.removeOpponent(player);
        }

        this.NotifyPlayerLeaveLobby(lobby, player);
    }

    public isInLobby(player: Player): boolean{
        return this.lobbies.some(lobby => lobby.getMaster().getIdentifier() === player.getIdentifier() || lobby.getOpponents().some(p => p.getIdentifier() === player.getIdentifier()));
    }

    public getLobby(identifier: string): Lobby{
        const lobby = this.lobbies.find(l => l.getIdentifier() === identifier);
        if (!lobby){
            throw new Error("Lobby not found");
        }

        return lobby;
    }

    public getLobbies(): Lobby[]{
        return this.lobbies;
    }
}