import React, { useCallback, useContext, useEffect, useState } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
//Components
import GameArea from '../../components/Game/GameArea';
//Assets
import { events } from '../../socketProvider/assets/events';
import { roomStyles } from './assets/styles';
//Utils
import { reorderArrayFromPosition } from '../../utils/helperFunctions';
import { GameState } from '../../components/Game/assets/types';

interface Props {
    id: string;
    number: number;
    initialPlayers: Array<string>;
    owner: string;
    initialGameState: GameState;
    onExitRoom: () => void;
}

const Room: React.FC<Props> = ({
    id,
    number,
    initialPlayers,
    initialGameState,
    owner,
    onExitRoom
}) => {
    const classes = roomStyles();
    const { emit, subscribe, unsubscribe, user } = useContext(SocketContext);
    
    const [players, setPlayers] = useState(reorderArrayFromPosition(initialPlayers, initialPlayers.findIndex(player => player === user)));
    const [gameState, setGameState] = useState<GameState | null>(initialGameState);

    useEffect(() => {
        const { NEW_PLAYER_JOINED, PLAYER_LEFT, LEAVE_ROOM_RESPONSE, START_GAME_RESPONSE } = events;

        subscribe(NEW_PLAYER_JOINED, (username: string) => setPlayers(p => [...p, username]));
        subscribe(PLAYER_LEFT, (username: string) => setPlayers(p => p.filter(player => player !== username)));
        subscribe(LEAVE_ROOM_RESPONSE, () => onExitRoom());
        subscribe(START_GAME_RESPONSE, (data: GameState) => setGameState(data));

        return () => {
            unsubscribe(NEW_PLAYER_JOINED);
            unsubscribe(PLAYER_LEFT);
            unsubscribe(LEAVE_ROOM_RESPONSE);
            unsubscribe(START_GAME_RESPONSE);
        }
    }, [subscribe, unsubscribe, onExitRoom]);

    const handleLeaveRoom = useCallback(() =>
        emit(events.LEAVE_ROOM, id)
    , [emit, id]); 

    const handleStartGameRoom = useCallback(() =>
        emit(events.START_GAME, id)
    , [emit, id]); 

    return (
        <Container component="main" maxWidth="lg">
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant={"h4"}>Room #{number}</Typography>        
                    </Grid>
                    <Grid item xs={6}>
                        <Box className={classes.roomActionsContainer}>
                            { owner === user && !gameState && 
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleStartGameRoom}
                                    className={classes.startButton}
                                >
                                    Start Game
                                </Button>
                            }
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                onClick={handleLeaveRoom}
                                className={classes.endButton}
                            >
                                Exit
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        {!!gameState 
                            ? <GameArea initialGameState={gameState} />
                            : players.map((player, index) => <Typography key={index}>{ player }</Typography>)
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Room;