import React, { ReactNode, createContext, useContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserContextState {
    user: User | null;
}

export interface User {
    userName: string;
    userPassword: string;
}

type UserAction = { type: 'LOGIN'; payload: User } | { type: 'REGISTER'; payload: User } | { type: 'LOGOUT' };

const initialState: UserContextState = {
    user: null,
};

const UserContext = createContext<{ state: UserContextState; dispatch: React.Dispatch<UserAction> } | undefined>(
    undefined
);
// Reducer fonksiyonu
const userReducer = (state: UserContextState, action: UserAction): UserContextState => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'REGISTER':
            console.log("")
            console.log("userReducer:", action)
            console.log("")

            const storeData = async (value: User) => {
                try {
                    const jsonValue = JSON.stringify(value);
                    await AsyncStorage.setItem('userData', jsonValue);
                } catch (e) {
                    // saving error
                }
            };
            storeData({
                userName: action.payload.userName,
                userPassword: action.payload.userPassword
            })
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

interface UserContextProviderProps {
    children: ReactNode;
}

// Context sağlayıcısı bileşeni
const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContextProvider, UserContext };