import { createAsyncThunk, applyMiddleware, createSlice, PayloadAction } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth';

export interface LoginState {
    isLogin: boolean
    userData: string | null | any
    userID: string | null | any
    loading: boolean
    error: string
    loginCounter: number
}

const initialState: LoginState = {
    isLogin: false,
    userData: "",
    userID: "",
    loading: false,
    error: "",
    loginCounter: 0
}
export const LoginUser = createAsyncThunk("LoginUser", async ({ userEmail, password }: any) => {
    console.log(userEmail)
    console.log(password)
    try {
        let response = await auth().signInWithEmailAndPassword(userEmail, password)
        if (response) {
            console.log(response)
            console.log('Welcome Message', 'Welcome the App');
            initialState.userData = response.user.email
            console.log(initialState.userData)
            initialState.isLogin = true
        }
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
        console.error(error.message)
    }
})


export const LogOutUser = createAsyncThunk("LogOutUser", async () => {
    await auth().signOut().then(() => {
        console.log('REDUX Sign Out', 'Redux Sign Out')
        initialState.userData = ""
        console.log(initialState.userData)
        initialState.isLogin = false
    }
    )
})



export const LogUser: any = createAsyncThunk("LogUser", async () => {
    console.log('REDUX USER LOG')
    initialState.userData = auth().currentUser?.email
    initialState.userID = auth().currentUser?.uid
})


const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logged: (state) => {
            state.isLogin = !state.isLogin
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLogin = false;
            state.error = "";
        })
        builder.addCase(LoginUser.fulfilled, (state) => {
            state.isLogin = true
        })
        builder.addCase(LoginUser.rejected, (state) => {
            state.isLogin = false;
            state.error = "Fetch Error !"
        })
    }
})

export const { logged } = authSlice.actions
export let selectUserEmail = (state: any) => initialState.userData
export let selectUserID = (state: any) => initialState.userID

export const selectLogin = (state: any) => initialState.isLogin

export default authSlice.reducer