import io from "socket.io-client";

let socket;

const connectSocket = (uid) => {
    socket = io("http://localhost:8000", {
        query: `uid=${uid}`
    })
}

export { socket, connectSocket }