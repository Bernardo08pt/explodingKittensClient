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

interface Card {
    name: string;
    effect: string;
}