import { configureStore } from "@reduxjs/toolkit";
import chatRoomSlice from "./chatRoomSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer : {
        user : userSlice,
        chatRoom : chatRoomSlice,
    }
})