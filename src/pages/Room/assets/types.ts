import { GameState } from "../../../components/Game/assets/types";

export interface Room {
    id: string;
    number: number;
    maxPlayers: number;
    players: Array<string>;
    owner: string;
    game: GameState;
    hasGameStarted: boolean;
}