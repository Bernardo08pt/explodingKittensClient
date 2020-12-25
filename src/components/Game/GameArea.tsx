import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
//Components
import PlayerArea from './PlayerArea';
import OpponentArea from './OpponentArea';
import FacedownCard from './FacedownCard';
import PlayingCard from './PlayingCard';
//Assets
import { gameAreaStyles } from './assets/styles';
import { GameState, Player } from './assets/types';
import { reorderArrayFromPosition } from '../../utils/helperFunctions';
import { events } from '../../socketProvider/assets/events';
import { Card as CardType } from './assets/types';

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
    const [futureCards, setFutureCards] = useState<Array<CardType>>([]);

    const playerSitOrder: Player[] = useMemo(() => 
        reorderArrayFromPosition(gameState.players, gameState.players.findIndex(player => player.username === user))
    , [gameState, user]);
    
    const youArePlaying = useMemo(() => gameState.playerTurn === user, [gameState, user]);

    useEffect(() => {
        const { UPDATE_GAME_STATE, SAW_THE_FUTURE } = events;

        subscribe(UPDATE_GAME_STATE, (data: GameState) => setGameState(data));
        subscribe(SAW_THE_FUTURE, (data: Array<CardType>) => setFutureCards(data));

        return () => {
            unsubscribe(UPDATE_GAME_STATE);
            unsubscribe(SAW_THE_FUTURE);
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
                    className={classes.informationBar}
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
            <Grid item xs={3} >
                <Box className={classes.deckArea} >
                    {gameState.discardPile.length > 0 && 
                        <>
                            <Typography variant={"h5"}>{`Discard Pile: ${gameState.discardPile.length}`}</Typography>
                            <PlayingCard size={"big"} card={gameState.discardPile[gameState.discardPile.length - 1]} />
                        </>
                    }
                </Box>
            </Grid>
            <Grid item xs={3} >
                <Box className={classes.deckArea} onClick={handleDrawCard}>
                    <Typography variant={"h5"}>{`Deck Cards: ${gameState.cardsRemaining}`}</Typography>
                    <FacedownCard size={"big"}/>
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
            <Dialog
                open={futureCards.length > 0}
                onClose={() => setFutureCards([])}
            >
                <DialogTitle>{"These are the top three cards from left to right"}</DialogTitle>
                <DialogContent>
                    <Grid container>
                        {futureCards.map(card => 
                            <Grid item xs={4}>
                            <PlayingCard 
                                key={card.id}
                                card={card}
                                size={"big"}
                            />
                            </Grid>
                            
                        )}
                    </Grid>
                </DialogContent>
            </Dialog>
        </Grid>
    )
}

export default GameArea;