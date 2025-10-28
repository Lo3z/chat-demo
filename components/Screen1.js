import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Screen1 = ({ navigation }) => {
  // Created states for name and background color between pages.
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#b0c4de');

  const auth = getAuth();

  const signInUser = () => {
    const user = auth.currentUser;

    //Navigates straight to chat if user is already logged in, passing their chosen Name and background color
    if (user) {
      navigation.navigate("Screen2", {
        userID: user.uid,
        name: name,
        bgColor: bgColor,
      });
      return
    }

    //Logs in user
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Screen2", {
          userID: result.user.uid,
          name: name,
          bgColor: bgColor,
        });
        Alert.alert("Signed in successfully!");
      })
      .catch((error) => {
        Alert.alert("unable to sign in, try again later.");
      })
  };

  return (
    <KeyboardAvoidingView //Use KeyboardAvoidingView so keyboard won't cover the color buttons
      style={[styles.container, {backgroundColor: bgColor}]}
      behavior={Platform.OS === "ios" ? 'padding': 'height'}
    >
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
        onPress={signInUser}
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
    </KeyboardAvoidingView>
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
    marginTop: 15,
    marginBottom: 15,
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