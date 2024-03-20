import {AbstractHandler} from "../AbstractHandler";
import {LobbyController} from "../../controllers/LobbyController";
import {PlayerController} from "../../controllers/PlayerController";
import {Client} from "../../models/Client";

export class LeaveLobbyAction extends AbstractHandler{
    private lobbyController: LobbyController;
    private playerController: PlayerController;

    constructor(lobbyController: LobbyController, playerController: PlayerController) {
        super("leaveLobby");
        this.lobbyController = lobbyController;
        this.playerController = playerController;
    }

    handle(request: string, Client: Client): void {
        super.handle(request, Client);
        let args = this.getArgs(request);
        let identifier = args[0];

        let player = this.playerController.getPlayer(identifier);
        this.lobbyController.leaveLobby(player);
    }
}