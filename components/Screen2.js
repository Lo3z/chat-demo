import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs, addDoc, onSnapshot, query, orderBy, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView, { Marker }  from 'react-native-maps';

const Screen2 = ({ route, navigation, db, isConnected, storage }) => {
  //Name and background color being passed from screen 1.
  const { name, bgColor, userID } = route.params;

  //Initialize messages state
  const [messages, setMessages] = useState([]);

  //Message send function
  const onSend = (newMessages) => {
    console.log('onSend called with: ', newMessages);
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

  let unsubMessages;

  useEffect(() => {
    // Importing user name and bg color from Screen1
    navigation.setOptions ({
      title: name, 
      style: {backgroundColor: bgColor},
    });

    // Checking if network connection
    if (isConnected === true) {
      // Unregister current onSnapshot listener to avoid registering multiple listeners when UseEffect is re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages= null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      //onSnapshot listener
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({ 
            id: doc.id, 
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        });
        cacheMessages(newMessages)
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected, navigation, name, bgColor]);

  // Cached Messages
  const cacheMessages = async(messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Loading messages from cache if no network connection:
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  // Enable/Disable InputToolbar based on connection
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  // Location data custom view
  const renderCustomView = (props) => {
    const {currentMessage} = props;
    if(currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker 
            coordinate={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
            }}
          />
        </MapView>
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        renderActions={(props) => (
          <CustomActions
            {...props}
            onSend={onSend}
            storage={storage}
            user={{
              _id: userID,
              name: name,
            }}
          />
        )}
        renderCustomView={renderCustomView}
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