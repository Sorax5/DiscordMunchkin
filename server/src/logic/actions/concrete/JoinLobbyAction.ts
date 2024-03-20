import {AbstractHandler} from "../AbstractHandler";
import {LobbyController} from "../../controllers/LobbyController";
import {PlayerController} from "../../controllers/PlayerController";
import {Client} from "../../models/Client";

export class JoinLobbyAction extends AbstractHandler {
    private lobbyController: LobbyController;
    private playerController: PlayerController;

    constructor(lobbyController: LobbyController, playerController: PlayerController){
        super("joinLobby"); // "joinLobby <player> <lobby>
        this.lobbyController = lobbyController;
        this.playerController = playerController;
    }

    public handle(message: string, client: Client): void {
        super.handle(message, client);

        let args = this.getArgs(message);
        let pIdentifier = args[1];
        let lIdentifier = args[2];

        let player = this.playerController.getPlayer(pIdentifier);

        this.lobbyController.joinLobby(player, lIdentifier);
    }
}