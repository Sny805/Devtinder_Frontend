import io from "socket.io-client"
import { BASE_URL } from "./constants"


export const createSocketConnection = () => {
    if (location.hostname === "localhost") {
        return io(BASE_URL)
    }
    else {
        return io("/", { path: "https://namaste-node-js-rhsn.onrender.com/socket.io" })
    }

}