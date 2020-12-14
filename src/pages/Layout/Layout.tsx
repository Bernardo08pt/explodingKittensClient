import React, { useContext, useEffect, useState } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//Components
import Register from '../Register/Register';
import Lobby from '../Lobby/Lobby';
import Loading from '../../components/Loading/Loading';
//Assets
import { events } from "../../socketProvider/assets/events";
import { Room } from '../Room/assets/types';
import RoomComponent from '../Room/Room';

const Layout: React.FC = () => {
    const [isCheckingRegister, setIsCheckingRegister] = useState(true);
    const [isRegisted, setIsRegisted] = useState(false);
    const [room, setRoom] = useState<Room | null>(null);
    const { isSocketConnected, subscribe, unsubscribe } = useContext(SocketContext);
    
    useEffect(() => {
      const { CHECK_IF_LOGGED_IN_RESULT, LEAVE_ROOM_RESPONSE } = events;

      subscribe(CHECK_IF_LOGGED_IN_RESULT, (result: { loggedIn: boolean, room: Room | null}) => {
        setIsRegisted(result.loggedIn);
        setRoom(result.room);
        setIsCheckingRegister(false);
      });

      return () => { 
        unsubscribe(CHECK_IF_LOGGED_IN_RESULT);
        unsubscribe(LEAVE_ROOM_RESPONSE);
      }
    }, [isSocketConnected, subscribe, unsubscribe]);

    return (
      <>
        {isSocketConnected && !isCheckingRegister 
            ? isRegisted 
              ? !!room
                ? <RoomComponent 
                    id={room.id} 
                    number={room.number} 
                    initialPlayers={room.players}
                    initialGameState={room.game}
                    owner={room.owner}
                    onExitRoom={() => setRoom(null)} 
                  /> 
                : <Lobby onEnterRoom={(roomEntered: Room) => setRoom(roomEntered)} />  
              : <Register onRegister={() => setIsRegisted(true)} /> 
            : <Loading />
        }
      </>
    )
  }
  
  export default Layout;