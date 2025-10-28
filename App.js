// Import the screens we are navigating
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Firebase imports
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const Stack = createNativeStackNavigator();

const App = () => {
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
          {props => <Screen2 db={db} {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;