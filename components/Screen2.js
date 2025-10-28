import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Screen2 = ({ route, navigation, db }) => {
  //Name and background color being passed from screen 1.
  const { name, bgColor, userID } = route.params;

  //Initialize messages state
  const [messages, setMessages] = useState([]);

  //Message send function
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
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
    // Moving user name and bg color from Screen1
    navigation.setOptions ({
      title: name, 
      style: {backgroundColor: bgColor},
    });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    //onSnapshot listener
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      });
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [navigation, name, bgColor]);

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name,
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