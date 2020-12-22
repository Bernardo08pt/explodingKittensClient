export interface GameState {
    cardsRemaining: number;
    discardPile: Array<Card>;
    players: Array<Player>;
    playerTurn: string;
    numberOfTurns: number;
}

export interface Player {
    username: string;
    cards: number;
    isAlive: boolean;
}

export type CardType = 
    "defuse"
    | "explosive"
    | "seeTheFuture"
    | "shuffle"
    | "favor"
    | "nope"
    | "skip"
    | "attack"
    | "tacoCat"
    | "catermelon"
    | "hairyPotatoCat"
    | "beardCat"
    | "rainbowCat";

export interface Card {
    id: number;
    name: string;
    type: CardType;
}

