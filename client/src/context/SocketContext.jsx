import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("https://bug-free-invention-9r4q5p4xjrrh9rrq-4000.app.github.dev"))
    }, [])

    useEffect(() => {
        currentUser && socket?.emit("newUser", currentUser.id)
    }, [currentUser, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}