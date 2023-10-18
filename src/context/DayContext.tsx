import React, { ReactNode, createContext, useContext, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface IPlay {
    isPlaying: boolean;
    togglePlaying: () => void;
}

const PlayContext = createContext<IPlay | any>(undefined);

interface PlayContextProviderProps {
    children: ReactNode;
}

// Context sağlayıcısı bileşeni
const PlayContextProvider: React.FC<PlayContextProviderProps> = ({ children }: any) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlaying = () => {
        setIsPlaying(!isPlaying);
    };
    return (
        <PlayContext.Provider value={{ isPlaying, togglePlaying }}>
            {children}
        </PlayContext.Provider>
    );
};

export { PlayContextProvider, PlayContext };