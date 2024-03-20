import {AbstractHandler} from "../AbstractHandler";
import {PlayerController} from "../../controllers/PlayerController";
import {Player} from "../../models/Player";
import {Client} from "../../models/Client";

export class PlayerConnectedAction extends AbstractHandler {
    private playerController: PlayerController;

    constructor(playerController: PlayerController) {
        super("playerConnected");
        this.playerController = playerController;
    }

    handle(request: string, client: Client): void {
        super.handle(request, client);
        let args = this.getArgs(request);
        let identifier = args[0];
        let name = args[1];
        let player = new Player(identifier, name);
        this.playerController.addPlayer(player);
        client.setIdentifier(identifier);
    }
}