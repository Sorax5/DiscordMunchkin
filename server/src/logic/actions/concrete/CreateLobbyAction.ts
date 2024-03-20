import {AbstractHandler} from "../AbstractHandler";
import {LobbyController} from "../../controllers/LobbyController";
import {request} from "express";
import {PlayerController} from "../../controllers/PlayerController";
import {Client} from "../../models/Client";

export class CreateLobbyAction extends AbstractHandler {
    private lobbyController: LobbyController;
    private playerController: PlayerController;

    constructor(lobbyController: LobbyController, playerController: PlayerController) {
        super("createLobby");
        this.lobbyController = lobbyController;
        this.playerController = playerController;
    }


    handle(request: string, client: Client): void {
        super.handle(request, client);
        let args = this.getArgs(request);
        let identifier = args[0];

        let player = this.playerController.getPlayer(identifier);
        this.lobbyController.createLobby(player);
    }
}