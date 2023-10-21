import {Dimensions, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').width;

const style = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    marginBottom: 5,
  },
  headerButton: {
    height: 50,
    width: screenWidth / 3 - 15,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 2,
    marginRight: 5,
  },
  headerButtonText: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default style;
