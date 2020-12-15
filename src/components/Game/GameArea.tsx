import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
//Components
import PlayerArea from './PlayerArea';
import PlayingCard from './PlayingCard';
import OpponentArea from './OpponentArea';
//Assets
import { gameAreaStyles } from './assets/styles';
import { GameState, Player } from './assets/types';
import { reorderArrayFromPosition } from '../../utils/helperFunctions';
import { events } from '../../socketProvider/assets/events';

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

    useEffect(() => {
        const { UPDATE_GAME_STATE } = events;

        subscribe(UPDATE_GAME_STATE, (data: GameState) => setGameState(data));

        return () => {
            unsubscribe(UPDATE_GAME_STATE);
        }
    }, [subscribe, unsubscribe]);

    const handleDrawCard = useCallback(() => {
        if (gameState.playerTurn === user) {
            emit(events.DRAW_CARD, roomId);
        }
    }, [gameState, user, emit, roomId])

    return (
        <Grid container>
            <Grid item xs={12} className={classes.playerArea}>
                { playerSitOrder[2] && 
                    <OpponentArea player={playerSitOrder[2]} /> 
                }
            </Grid>
            <Grid item xs={3} className={classes.playerArea}>
                { playerSitOrder[1] && 
                    <OpponentArea player={playerSitOrder[1]} /> 
                }
            </Grid>
            <Grid item xs={6} >
                <Box className={classes.deckArea} onClick={handleDrawCard}>
                    <PlayingCard>
                        <Typography variant={"h6"}>{gameState.cardsRemaining}</Typography>
                    </PlayingCard>
                </Box>
            </Grid>
            <Grid item xs={3} className={classes.playerArea}>
                { playerSitOrder[3] && 
                    <OpponentArea player={playerSitOrder[3]} /> 
                }
            </Grid>
            <Grid item xs={12} className={classes.playerArea}>
                { playerSitOrder[0] && 
                    <PlayerArea 
                        roomId={roomId}
                        player={playerSitOrder[0]} 
                    /> 
                }
            </Grid>
        </Grid>
    )
}

export default GameArea;