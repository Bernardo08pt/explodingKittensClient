import React from 'react';
//MaterialUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//Components
import PlayingCard from './PlayingCard';
//Assets
import { playerAreaStyles } from './assets/styles';
import { Player } from './assets/types';

interface Props {
    player: Player;
}

const OpponentArea: React.FC<Props> = ({
    player
}) => {
    const classes = playerAreaStyles();
    const { username, cards } = player;

    return (
        <Grid container>
            <Grid item xs={12} className={classes.title}>
                <Typography variant={"h6"}>{username}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.cardTray}>
                    <PlayingCard>
                        <Typography variant={"h6"}>{cards}</Typography>
                    </PlayingCard>
                </Box>
            </Grid>
        </Grid>
    )
}

export default OpponentArea;