import {Client} from "./Client";
import {AbstractNetwork} from "./AbstractNetwork";
import {Player} from "./Player";
import {AbstractHandler} from "../actions/AbstractHandler";
import {PlayerController} from "../controllers/PlayerController";
import {PlayerConnectedAction} from "../actions/concrete/PlayerConnectedAction";
import {PlayerDeconnectedAction} from "../actions/concrete/PlayerDeconnectedAction";
import { IGlobalObserver } from "../observers/IGlobalObserver";
import {LobbyController} from "../controllers/LobbyController";
import {ILobbyObserver} from "../observers/ILobbyObserver";
import { Lobby } from "./Lobby";
import {CreateLobbyAction} from "../actions/concrete/CreateLobbyAction";
import {LeaveLobbyAction} from "../actions/concrete/LeaveLobbyAction";
import {JoinLobbyAction} from "../actions/concrete/JoinLobbyAction";

export class ClientManager extends AbstractNetwork implements IGlobalObserver, ILobbyObserver {
    private readonly playerController: PlayerController;
    private readonly lobbyController: LobbyController;
    private handler: AbstractHandler;

    constructor(playerController: PlayerController, lobbyController: LobbyController) {
        super();
        this.playerController = playerController;
        this.lobbyController = lobbyController;
        this.playerController.subscribe(this);
        this.lobbyController.subscribe(this);

        this.handler = new PlayerConnectedAction(this.playerController);
        this.handler.setNext(new PlayerDeconnectedAction(this.playerController));
        this.handler.setNext(new CreateLobbyAction(this.lobbyController, this.playerController));
        this.handler.setNext(new LeaveLobbyAction(this.lobbyController, this.playerController));
        this.handler.setNext(new JoinLobbyAction(this.lobbyController, this.playerController));
    }

    public OnPlayerJoinLobby(lobby: Lobby, player: Player): void {
        this.SendPlayerJoinLobby(lobby, player);
    }
    public OnPlayerLeaveLobby(lobby: Lobby, player: Player): void {
        this.SendPlayerLeaveLobby(lobby, player);
    }
    public OnLobbyDestroyed(lobby: Lobby): void {
        this.SendLobbyDestroyed(lobby);
    }
    public OnLobbyCreated(lobby: Lobby): void {
        this.SendLobbyCreated(lobby);
    }
    public OnPlayerConnected(player: Player): void {
        this.SendPlayerConnected(player);
    }
    public OnPlayerDisconnected(identifier: string): void {
        this.SendPlayerDisconnected(identifier);
    }
    public OnPlayerIsAlreadyInLobby(player: Player): void {
        this.SendPlayerIsAlreadyInLobby(player);
    }

    public OnMessageReceived(message: string, client: Client): void {
        this.handler.handle(message, client);
    }
}