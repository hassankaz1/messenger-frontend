import { createSlice } from "@reduxjs/toolkit";
import BackendApi from "../../backendApi";
import { showSnackbar } from "./app";


const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    current_user: null,
}


const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        signOut(state, action) {
            state.isLoggedIn = false;
            state.token = "";
            state.current_user = null;
        },
        updateCurrentUser(state, action) {
            state.current_user = action.payload.user;
        },
    },
});

export default slice.reducer;


export function LoginUser(formValues) {
    return async (dispatch, getState) => {
        // Make API call here

        //   dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
        try {
            const res = await BackendApi.login(formValues)
            console.log(res)
            window.localStorage.setItem("uid", res.user.id);

            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                token: res.token
            }))

            dispatch(slice.actions.updateCurrentUser({ user: res.user }))

            dispatch(showSnackbar({ severity: "success", message: "Logged In Successful" }))
        } catch (err) {
            dispatch(showSnackbar({ severity: "error", message: err[0] }))

        }
    };
}

export function RegisterUser(formValues) {
    return async (dispatch, getState) => {
        // Make API call here

        //   dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
        try {
            const res = await BackendApi.register(formValues)
            console.log(res)
            window.localStorage.setItem("uid", res.newUser.id);
            // console.log(window.localStorage.getItem("uid"))

            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                token: res.token
            }))

            dispatch(slice.actions.updateCurrentUser({ user: res.newUser }))

            dispatch(showSnackbar({ severity: "success", message: "Registered Successful" }))
        } catch (err) {
            dispatch(showSnackbar({ severity: "error", message: err[0] }))

        }
    };
}

export function LogoutUser() {
    return async (dispatch, getState) => {
        window.localStorage.removeItem("uid");
        dispatch(slice.actions.signOut());
    };
}