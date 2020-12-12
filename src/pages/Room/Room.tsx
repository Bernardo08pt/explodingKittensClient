import React, { useCallback, useContext, useEffect, useState } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//Components
import GameArea from '../../components/Game/GameArea';
//Assets
import { events } from '../../socketProvider/assets/events';
import { roomStyles } from './assets/styles';
//Utils
import { reorderArrayFromPosition } from '../../utils/helperFunctions';

interface Props {
    id: string;
    number: number;
    initialPlayers: Array<string>;
    onExitRoom: () => void;
}

const Room: React.FC<Props> = ({
    id,
    number,
    initialPlayers,
    onExitRoom
}) => {
    const classes = roomStyles();
    
    const { emit, subscribe, unsubscribe, user } = useContext(SocketContext);
    
    const [players, setPlayers] = useState(reorderArrayFromPosition(initialPlayers, initialPlayers.findIndex(player => player === user)));

    useEffect(() => {
        const { NEW_PLAYER_JOINED, PLAYER_LEFT, LEAVE_ROOM_RESPONSE } = events;

        subscribe(NEW_PLAYER_JOINED, (username: string) => {
            setPlayers(p => [...p, username]);
        });

        subscribe(PLAYER_LEFT, (username: string) => {
            setPlayers(p => p.filter(player => player !== username));
        });

        subscribe(LEAVE_ROOM_RESPONSE, () => onExitRoom());

        return () => {
            unsubscribe(NEW_PLAYER_JOINED);
            unsubscribe(PLAYER_LEFT);
        }
    }, [subscribe, unsubscribe, onExitRoom]);

    const handleLeaveRoom = useCallback(() => {
        emit(events.LEAVE_ROOM, id);
    }, [emit, id]); 

    return (
        <Container component="main" maxWidth="lg">
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={11}>
                        <Typography variant={"h4"}>Room #{number}</Typography>        
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={handleLeaveRoom}
                        >
                            Exit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <GameArea 
                            players={players}    
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Room;