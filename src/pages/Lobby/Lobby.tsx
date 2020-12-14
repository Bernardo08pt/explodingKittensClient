import React, { useContext, useEffect, useState, useCallback } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//Assets
import { events } from '../../socketProvider/assets/events';
import { lobbyStyles } from './assets/styles';
import { Room } from '../Room/assets/types';

interface Props {
    onEnterRoom: (room: Room) => void; 
}

const Lobby: React.FC<Props> = ({
    onEnterRoom
}) => {
    const classes = lobbyStyles();

    const [rooms, setRooms] = useState<Array<Room>>([]); 
    const [error, setError] = useState<boolean>(false); 

    const { emit, subscribe, unsubscribe } = useContext(SocketContext);

    useEffect(() => {
        const { GET_ROOMS, GET_ROOMS_RESPONSE, ENTER_ROOM_RESPONSE, LEAVE_ROOM_RESPONSE, NEW_ROOM_CREATED } = events;

        emit(GET_ROOMS);

        subscribe(GET_ROOMS_RESPONSE, (allRooms: Array<Room>) => 
            setRooms(allRooms)
        );

        subscribe(ENTER_ROOM_RESPONSE, (room: Room) => {
            if (room) {
                onEnterRoom(room);
            } else {
                setError(true);
            }
        });
       
        subscribe(NEW_ROOM_CREATED, (room: Room) => setRooms(r => [...r, room]));

        return () => {
            unsubscribe(GET_ROOMS_RESPONSE);
            unsubscribe(ENTER_ROOM_RESPONSE);
            unsubscribe(LEAVE_ROOM_RESPONSE);
            unsubscribe(NEW_ROOM_CREATED);
        }
    }, [subscribe, unsubscribe, emit, onEnterRoom]);

    const handleCreateNewGame = useCallback(() => 
        emit(events.CREATE_ROOM)
    , [emit]);

    const handleEnterRoom = useCallback((roomId: string) => 
        emit(events.ENTER_ROOM, roomId)
    , [emit]);

    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
                <Typography variant={"h4"} className={classes.title}>Lobby</Typography>
                <List>
                    {rooms && rooms.map(room => 
                         <ListItem 
                            key={room.number} 
                            button 
                            onClick={() => handleEnterRoom(room.id)}
                        >
                            <ListItemText 
                                primary={`Room #${room.number}`} 
                                secondary={`Player number ${room.players.length}/${room.maxPlayers}`}
                            />
                        </ListItem>
                    )}
                </List>
                <Box className={classes.buttonContainer}>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleCreateNewGame}
                    >
                        Create new room
                    </Button>
                    <Typography variant="body1">{ error ? "An error ocurred while creating the room" : ""}</Typography>
                </Box>
            </Paper>
        </Container>
    )
}

export default Lobby;