import React from 'react';
//MaterialUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//Components
import PlayingCard from '../PlayingCard';
//Assets
import { playerAreaVerticalStyles } from '../assets/styles';

interface Props {
    player: string;
}

const PlayerAreaRight: React.FC<Props> = ({
    player
}) => {
    const classes = playerAreaVerticalStyles();

    return (
        <>
            <Grid item xs={4}>
                <Box alignItems={"center"} className={classes.column}>
                    <PlayingCard horizontal />
                    <PlayingCard horizontal />
                    <PlayingCard horizontal />
                    
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box alignItems={"center"}className={classes.column}>
                <PlayingCard horizontal />
                    <PlayingCard horizontal />
                    <PlayingCard horizontal />
                    <PlayingCard horizontal />
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box alignItems={"center"} className={classes.column}>
                    <Typography variant={"h6"}>{player}</Typography>
                </Box>
            </Grid>
        </>
    )
}

export default PlayerAreaRight;