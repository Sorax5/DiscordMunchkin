import {Player} from "./Player";

export class Lobby {
    private opponents: Player[];
    private readonly master: Player;
    private readonly identifier: string;

    public constructor(master: Player){
        this.master = master;
        this.opponents = [];
        this.identifier = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    public addOpponent(opponent: Player): void{
        this.opponents.push(opponent);
    }

    public removeOpponent(opponent: Player): void{
        this.opponents = this.opponents.filter(p => p.getIdentifier() !== opponent.getIdentifier());
    }

    public getMaster(): Player{
        return this.master;
    }

    public getOpponents(): Player[]{
        return this.opponents;
    }

    public getIdentifier(): string{
        return this.identifier;
    }
}