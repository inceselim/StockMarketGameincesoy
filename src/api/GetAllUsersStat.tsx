import database from '@react-native-firebase/database';

export const GetAllUsersStat = async () => {
    //verileri çekmek için
    try {
        const response = (await database().ref('/users').once('value')).val();
        return response;
    } catch (error) {
        console.log('FB Data Error', error);
    }
};
