export interface GameState {
    cardsRemaining: number;
    discardPile: Array<Card>;
    players: Array<Player>;
    playerTurn: string;
}

export interface Player {
    username: string;
    cards: number;
    isAlive: boolean;
}

type CardType = 
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
    name: string;
    type: CardType;
}

