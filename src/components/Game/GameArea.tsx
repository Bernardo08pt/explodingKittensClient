import React from 'react';
//MaterialUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//Components
import PlayerArea from './PlayerArea/PlayerArea';
import PlayingCard from './PlayingCard';
//Assets
import { gameAreaStyles } from './assets/styles';

interface Props {
    players: Array<string>;
}

const GameArea: React.FC<Props> = ({
    players
}) => {
    const classes = gameAreaStyles();

    return (
        <Grid container>
            <Grid item xs={12} className={classes.playerArea}>
                { players[2] && <PlayerArea player={players[2]} position="top" /> }
            </Grid>
            <Grid item xs={3} className={classes.playerArea}>
                { players[1] && <PlayerArea player={players[1]} position="left" /> }
            </Grid>
            <Grid item xs={6} >
                <Box className={classes.deckArea}>
                    <PlayingCard />
                </Box>
            </Grid>
            <Grid item xs={3} className={classes.playerArea}>
                { players[3] && <PlayerArea player={players[3]} position="right" /> }
            </Grid>
            <Grid item xs={12}>
                <PlayerArea player={players[0]} position="bottom" />
            </Grid>
        </Grid>
    )
}

export default GameArea;