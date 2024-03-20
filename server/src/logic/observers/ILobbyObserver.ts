import {Lobby} from "../models/Lobby";
import {Player} from "../models/Player";

export interface ILobbyObserver {
    OnPlayerJoinLobby(lobby : Lobby, player : Player): void;
    OnPlayerLeaveLobby(lobby : Lobby, player : Player): void;
    OnLobbyDestroyed(lobby : Lobby): void;
    OnLobbyCreated(lobby : Lobby): void;
    OnPlayerIsAlreadyInLobby(player: Player): void;
}