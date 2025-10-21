import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Screen2 = ({ route, navigation }) => {
  //Name and background color being passed from screen 1.
  const { name, bgColor } = route.params;

  useEffect(() => {
    navigation.setOptions ({
      title: name, 
      style: {backgroundColor: bgColor},
    });
  }, [navigation, name, bgColor]);

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text>Hello Screen2!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Screen2;