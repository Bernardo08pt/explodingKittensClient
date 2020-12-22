import React from 'react';
//MaterialUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//Components
import FacedownCard from './FacedownCard';
//Assets
import { playerAreaStyles } from './assets/styles';
import { Player } from './assets/types';

interface Props {
    player: Player;
    isPlaying: boolean;
    numberOfTurns: number;
}

const OpponentArea: React.FC<Props> = ({
    player,
    isPlaying,
    numberOfTurns
}) => {
    const classes = playerAreaStyles();
    const { username, cards } = player;

    return (
        <Grid container className={isPlaying ? classes.playing : ""}>
            <Grid item xs={12} className={classes.title}>
                <Typography variant={"h6"}>{username}</Typography>
                <Typography variant={"h6"}>{`Number of turns remaining: ${isPlaying ? numberOfTurns : 0}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.cardTray}>
                    <FacedownCard cards={cards} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default OpponentArea;