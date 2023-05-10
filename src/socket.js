import io from "socket.io-client";

let socket;

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";


const connectSocket = (uid) => {
    socket = io(BASE_URL, {
        query: `uid=${uid}`
    })
}

export { socket, connectSocket }