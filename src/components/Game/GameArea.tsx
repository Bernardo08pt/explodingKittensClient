import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SnackbarContent from '@material-ui/core/SnackbarContent';
//Components
import PlayerArea from './PlayerArea';
import OpponentArea from './OpponentArea';
import FacedownCard from './FacedownCard';
//Assets
import { gameAreaStyles } from './assets/styles';
import { GameState, Player } from './assets/types';
import { reorderArrayFromPosition } from '../../utils/helperFunctions';
import { events } from '../../socketProvider/assets/events';
import { Card as CardType } from './assets/types';
import PlayingCard from './PlayingCard';

interface Props {
    roomId: string;
    initialGameState: GameState;
}

const GameArea: React.FC<Props> = ({
    roomId,
    initialGameState
}) => {
    const classes = gameAreaStyles();

    const { subscribe, unsubscribe, emit, user } = useContext(SocketContext);

    const [gameState, setGameState] = useState<GameState>(initialGameState);

    const playerSitOrder: Player[] = useMemo(() => 
        reorderArrayFromPosition(gameState.players, gameState.players.findIndex(player => player.username === user))
    , [gameState, user]);
    
    const youArePlaying = useMemo(() => gameState.playerTurn === user, [gameState, user]);

    useEffect(() => {
        const { UPDATE_GAME_STATE } = events;

        subscribe(UPDATE_GAME_STATE, (data: GameState) => setGameState(data));

        return () => {
            unsubscribe(UPDATE_GAME_STATE);
        }
    }, [subscribe, unsubscribe]);

    const handleDrawCard = useCallback(() => {
        if (youArePlaying) {
            emit(events.DRAW_CARD, roomId);
        }
    }, [emit, roomId, youArePlaying]);

    const handlePlayCard = useCallback((card: CardType) => {
        if (!youArePlaying) {
            return;
        }

        emit(events.PLAY_CARD, {card, roomId});
    }, [youArePlaying, emit, roomId]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <SnackbarContent 
                    style={{marginTop: "10px", justifyContent: "center", fontWeight: "bold"}}
                    message={`It's ${youArePlaying ? "your" : gameState.playerTurn} time to play`}  
                />
            </Grid>
            <Grid item xs={12} className={classes.playerArea}>
                { playerSitOrder[2] && 
                    <OpponentArea 
                        player={playerSitOrder[2]} 
                        isPlaying={playerSitOrder[2].username === gameState.playerTurn}
                        numberOfTurns={gameState.numberOfTurns}
                    /> 
                }
            </Grid>
            <Grid item xs={3} className={classes.playerArea}>
                { playerSitOrder[1] && 
                    <OpponentArea 
                        player={playerSitOrder[1]} 
                        isPlaying={playerSitOrder[1].username === gameState.playerTurn}
                        numberOfTurns={gameState.numberOfTurns}
                    /> 
                }
            </Grid>
            <Grid item xs={6} >
                <Box className={classes.deckArea} onClick={handleDrawCard}>
                    {gameState.discardPile.length > 0 && 
                        <PlayingCard card={gameState.discardPile[gameState.discardPile.length - 1]} />
                    }
                    <FacedownCard cards={gameState.cardsRemaining} />
                </Box>
            </Grid>
            <Grid item xs={3} className={classes.playerArea}>
                { playerSitOrder[3] && 
                    <OpponentArea 
                        player={playerSitOrder[3]} 
                        isPlaying={playerSitOrder[3].username === gameState.playerTurn}
                        numberOfTurns={gameState.numberOfTurns}
                    /> 
                }
            </Grid>
            <Grid item xs={12} className={classes.playerArea}>
                { playerSitOrder[0] && 
                    <PlayerArea 
                        roomId={roomId}
                        player={playerSitOrder[0]} 
                        isPlaying={youArePlaying}
                        onPlayCard={handlePlayCard}
                        numberOfTurns={gameState.numberOfTurns}
                    /> 
                }
            </Grid>
        </Grid>
    )
}

export default GameArea;