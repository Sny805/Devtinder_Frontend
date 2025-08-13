import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    if (location.hostname === "localhost") {
        return io(BASE_URL, {
            transports: ["websocket"],
        });
    } else {
        return io("https://namaste-node-js-rhsn.onrender.com", {
            transports: ["websocket"],
            path: "/socket.io",
        });
    }
};
