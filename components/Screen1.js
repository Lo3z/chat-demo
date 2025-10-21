import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Screen1 = ({ navigation }) => {
  // Created states for name and background color between pages.
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#b0c4de');

  return (
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        <Text>Hello Screen1!</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Type your username here'
        />
        <Button
          title="Start Chatting"
          // Passing both name and bgcolor to next screen.
          onPress={() => navigation.navigate('Screen2', {name: name, bgColor: bgColor})}
        />
        <Text>Choose a background color:</Text>
        {/* Buttons that will allow user to change background color. */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.colorButton, {backgroundColor: '#b6d7a8'}]}
            onPress={() => setBgColor('#b6d7a8')}/>
          <TouchableOpacity
            style={[styles.colorButton, {backgroundColor: '#b4a7d6'}]}
            onPress={() => setBgColor('#b4a7d6')}/>
          <TouchableOpacity
            style={[styles.colorButton, {backgroundColor: '#f9cb9c'}]}
            onPress={() => setBgColor('#f9cb9c')}/>
          <TouchableOpacity
            style={[styles.colorButton, {backgroundColor: '#ea9999'}]}
            onPress={() => setBgColor('#ea9999')}/>
          <TouchableOpacity
            style={[styles.colorButton, {backgroundColor: '#b0c4de'}]}
            onPress={() => setBgColor('#b0c4de')}/>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b0c4de',
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    MarginTop: 15,
    MarginBottom: 15,
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    MarginTop: 30,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius:50/2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default Screen1;