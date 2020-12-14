import React, { useContext, useMemo, useState } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//Components
import PlayerArea from './PlayerArea';
import PlayingCard from './PlayingCard';
//Assets
import { gameAreaStyles } from './assets/styles';
import { GameState } from './assets/types';
import { reorderArrayFromPosition } from '../../utils/helperFunctions';
import OpponentArea from './OpponentArea';
import { Typography } from '@material-ui/core';

interface Props {
    initialGameState: GameState;
}

const GameArea: React.FC<Props> = ({
    initialGameState
}) => {
    const classes = gameAreaStyles();

    const { user } = useContext(SocketContext);

    const [gameState] = useState<GameState>(initialGameState);
    const playerSitOrder = useMemo(() => 
        reorderArrayFromPosition(gameState.players, gameState.players.findIndex(player => player.username === user))
    , [gameState, user]);

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
                <Box className={classes.deckArea}>
                    <PlayingCard >
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
                    <PlayerArea player={playerSitOrder[0]} /> 
                }
            </Grid>
        </Grid>
    )
}

export default GameArea;