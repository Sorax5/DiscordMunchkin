/**
 * Player class
 */
export class Player {
    private readonly identifier: string;
    private readonly name: string;

    constructor(identifier: string, name: string) {
        this.identifier = identifier;
        this.name = name;
    }

    /**
     * Get the player's identifier
     */
    public getIdentifier(): string {
        return this.identifier;
    }

    /**
     * Get the player's name
     */
    public getName(): string {
        return this.name;
    }
}