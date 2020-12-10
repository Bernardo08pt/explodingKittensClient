import React, { useContext, useEffect, useState } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//Assets
import { events } from '../../socketProvider/assets/events';
import { roomStyles } from './assets/styles';

interface Props {
    id: string;
    number: number;
    initialPlayers: Array<string>;
}

const Room: React.FC<Props> = ({
    id,
    number,
    initialPlayers
}) => {
    const classes = roomStyles();
    
    const [players, setPlayers]= useState(initialPlayers);

    const { subscribe, unsubscribe } = useContext(SocketContext);

    useEffect(() => {
        const { NEW_PLAYER_JOINED } = events;

        subscribe(NEW_PLAYER_JOINED, (username: string) => {
            setPlayers(p => [...p, username]);
        });

        return () => unsubscribe(NEW_PLAYER_JOINED);
    }, [subscribe, unsubscribe]);

    return (
        <Container component="main" maxWidth="lg">
            <Paper className={classes.paper}>
                <Typography variant={"h4"}>Room #{number}</Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"h6"}>{players[1]}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"}>{players[2]}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"}>{players[0]}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Room;