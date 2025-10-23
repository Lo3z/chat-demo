import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from 'react-native-safe-area-context';

const Screen2 = ({ route, navigation }) => {
  //Name and background color being passed from screen 1.
  const { name, bgColor } = route.params;
  //Initialize messages state
  const [messages, setMessages] = useState([]);
  //Message send function
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  };
  //Render bubble color
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#fff"
        },
      }}
    />
  }

  useEffect(() => {
    //Messages when you enter the chat.
    setMessages([
      {
        _id: 1,
        text: "Hello Developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: 'You have entered the chat.',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  useEffect(() => {
    navigation.setOptions ({
      title: name, 
      style: {backgroundColor: bgColor},
    });
  }, [navigation, name, bgColor]);

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   zIndex: 1
  }
});

export default Screen2;