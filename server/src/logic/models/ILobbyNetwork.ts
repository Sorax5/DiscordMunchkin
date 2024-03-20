import {Lobby} from "./Lobby";
import {Player} from "./Player";

export interface ILobbyNetwork{
    SendPlayerJoinLobby(lobby: Lobby, player: Player): void;
    SendPlayerLeaveLobby(lobby: Lobby, player: Player): void;
    SendLobbyDestroyed(lobby: Lobby): void;
    SendLobbyCreated(lobby: Lobby): void;
    SendPlayerIsAlreadyInLobby(player: Player): void;
    SendPlayerIsNotInLobby(player: Player): void;
}