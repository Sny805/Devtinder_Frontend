import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice";
import addConnectionsReducer from "./connectionsSlice";
import addRequestReducer from "./requestsSlice"


const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: addConnectionsReducer,
        requests: addRequestReducer
    }
})

export default appStore