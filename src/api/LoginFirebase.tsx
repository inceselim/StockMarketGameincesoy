import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { logged } from '../redux/features/authSlice';

export const LoginFirebase = async ({ userEmail, userPassword }: any) => {
    try {
        let response = await auth().signInWithEmailAndPassword(userEmail, userPassword)
        if (response) {
            console.log(response)
        }
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
        Alert.alert(error.message)
    }
}