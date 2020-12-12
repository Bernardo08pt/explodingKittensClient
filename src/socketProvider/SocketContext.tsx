import React, { createContext, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Cookies from 'js-cookie';
//Assets
import { events } from "./assets/events";

interface SocketContext {
  isSocketConnected: boolean;
  subscribe: (eventName: string, callback: Function) => void;
  unsubscribe: (eventName: string) => void;
  emit: (value: string, data?: any) => void;
  saveUser: (user: string) => void;
  user: string | null;
}

const SocketContext = createContext<SocketContext>({} as SocketContext);

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = socketIOClient(process.env.REACT_APP_API_URL ?? "http://localhost:4000");

    newSocket.on("connected", () => {
        setSocket(newSocket);

        const username = Cookies.get("user");
        
        if (username) {
          setUser(username);
        }

        newSocket.emit(events.CHECK_IF_LOGGED_IN, { username });
    });
  }, []);

  const subscribe = (eventName: string, callback: Function) => {
    socket?.on(eventName, (data: any) => callback(data));
  }

  const unsubscribe = (eventName: string) => {
    socket?.off(eventName);
  }

  const emit = (eventName: string, data?: any) => {
    socket?.emit(eventName, data);
  }

  const saveUser = (username: string) => {
    Cookies.set("user", username);
    setUser(username);
  }
  
  return (
    <SocketContext.Provider value={{ 
        isSocketConnected: !!socket, 
        subscribe, 
        unsubscribe, 
        emit,
        user,
        saveUser
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;