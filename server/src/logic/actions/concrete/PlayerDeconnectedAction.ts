import {AbstractHandler} from "../AbstractHandler";
import {PlayerController} from "../../controllers/PlayerController";
import {Client} from "../../models/Client";

export class PlayerDeconnectedAction extends AbstractHandler {
    private playerController: PlayerController;

    constructor(playerController: PlayerController) {
        super("playerDeconnected");
        this.playerController = playerController;
    }

    handle(request: string, client: Client): void {
        super.handle(request, client);
        let args = this.getArgs(request);
        let identifier = args[0];
        this.playerController.removePlayer(identifier);
    }
}