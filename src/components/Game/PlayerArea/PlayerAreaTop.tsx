import React from 'react';
//MaterialUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PlayingCard from '../PlayingCard';
//Assets
import { playerAreaHorizontalStyles } from '../assets/styles';

interface Props {
    player: string;
}

const PlayerAreaTop: React.FC<Props> = ({
    player
}) => {
    const classes = playerAreaHorizontalStyles();

    return (
        <>
            <Grid item xs={12} className={classes.title}>
                <Typography variant={"h6"}>{player}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.cardTray}> 
                <PlayingCard />
                <PlayingCard />
                <PlayingCard />
                <PlayingCard />
            </Grid>
            <Grid item xs={12} className={classes.cardTray}> 
                <PlayingCard />
                <PlayingCard />
                <PlayingCard />
            </Grid>
        </>
    )
}

export default PlayerAreaTop;