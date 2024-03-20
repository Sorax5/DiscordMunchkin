import {Player} from "../models/Player";
import {GlobalSubject} from "../observers/GlobalSubject";

export class PlayerController extends GlobalSubject{
    private players : Player[];

    constructor(){
        super();
        this.players = [];
    }

    public addPlayer(player: Player): void {
        this.players.push(player);
        this.notifyPlayerConnected(player);
    }

    public removePlayer(identifier: string): void {
        this.players = this.players.filter((player: Player) => player.getIdentifier() !== identifier);
        this.notifyPlayerDisconnected(identifier);
    }

    public getPlayer(identifier: string): Player {
        return this.players.find((player: Player) => player.getIdentifier() === identifier);
    }
}