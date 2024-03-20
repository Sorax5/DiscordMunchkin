import {Player} from "../models/Player";

export interface IGlobalObserver {
    OnPlayerConnected(player: Player): void;
    OnPlayerDisconnected(identifier: string): void;
}