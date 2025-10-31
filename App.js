// Import the screens we are navigating
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

// React imports
import { useEffect, useState } from "react";
import { LogBox, Alert } from "react-native";

// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Firebase imports
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// AsyncStorage/NetInfo imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo }from '@react-native-community/netinfo';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwgNrR7vaYPAxqDjR84uC2-Mj_5D1Lrww",
  authDomain: "chat-demo-20500.firebaseapp.com",
  projectId: "chat-demo-20500",
  storageBucket: "chat-demo-20500.firebasestorage.app",
  messagingSenderId: "771773129301",
  appId: "1:771773129301:web:63ecce4adaac31e7702adc"
};

// Initialize Firebase
const app = getApps().length > 0? getApp(): initializeApp(firebaseConfig);
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Initialize with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Cloud Firestore/Storage and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize stack navigation
const Stack = createNativeStackNavigator();

// Initialize network connectivity state
const App = () => {
  const connectionStatus = useNetInfo();

  // UseEffect state to check network connection
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert ("Connection lost.");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      {/* App will launch to this screen */}
      <Stack.Navigator
        initialRouteName="Screen1"
      >
        <Stack.Screen
          name="Screen1"
          component={Screen1}
        />
        <Stack.Screen
          name="Screen2"
        >
          {props => <Screen2 
            isConnected={connectionStatus.isConnected} 
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;