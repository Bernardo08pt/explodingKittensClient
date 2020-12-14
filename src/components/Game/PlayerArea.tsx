import React from 'react';
//MaterialUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//Components
import PlayingCard from './PlayingCard';
//Assets
import { Player } from './assets/types';
import { playerAreaStyles } from './assets/styles';

interface Props {
    player: Player;
}

const PlayerArea: React.FC<Props> = ({
    player
}) => {
    const { username, cards } = player;
    const classes = playerAreaStyles();
    const halfPoint = Math.floor(cards / 2);
    
    return (
        <Grid container>
            <Grid item xs={12} className={classes.cardTray}> 
                {
                    Array(halfPoint).fill(null).map((i, index) => <PlayingCard key={index} />)
                }
            </Grid>
            <Grid item xs={12} className={classes.cardTray}> 
                {
                    Array(halfPoint + 1).fill(null).map((i, index) => <PlayingCard key={index} />)
                }
            </Grid>
            <Grid item xs={12} className={classes.title}>
                <Typography variant={"h6"}>{username}</Typography>
            </Grid>
        </Grid>
    )
}

export default PlayerArea;