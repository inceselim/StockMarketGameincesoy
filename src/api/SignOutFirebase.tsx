import auth from '@react-native-firebase/auth';

const SignOut = () => {
    auth().signOut().then(() => console.log('User signed out!'))
};

export default SignOut;

