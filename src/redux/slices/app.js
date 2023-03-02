import { createSlice } from "@reduxjs/toolkit";
// import axios from "../../utils/axios";



const initialState = {
    sideBar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    }
};

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // Toggle Sidebar
        toggleSideBar(state, action) {
            state.sideBar.open = !state.sideBar.open
        },
        updateSideBarType(state, action) {
            state.sideBar.type = action.payload.type
        }
    },
});

// Reducer
export default slice.reducer;

