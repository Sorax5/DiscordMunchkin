import {Player} from "./Player";

export interface IGlobalNetwork {
    SendPlayerConnected(player: Player): void;
    SendPlayerDisconnected(identifier: string): void;
}