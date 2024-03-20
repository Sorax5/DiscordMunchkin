import * as WebSocket from 'ws';
import {WebsocketConnexion} from "./network/WebsocketConnexion";
import {Client} from "./logic/models/Client";
import {ClientManager} from "./logic/models/ClientManager";
import {PlayerController} from "./logic/controllers/PlayerController";
import {LobbyController} from "./logic/controllers/LobbyController";

const server = new WebSocket.Server({ port: 8080 });
let playerController = new PlayerController();
let lobbyController = new LobbyController();
let clientManager = new ClientManager(playerController, lobbyController);
playerController.subscribe(clientManager);

server.on('connection', (ws) => {
    let wbsConn = new WebsocketConnexion(ws);
    let client = new Client(wbsConn);
    clientManager.addClient(client);
});