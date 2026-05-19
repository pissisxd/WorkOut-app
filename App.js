import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import DayDetailScreen from './screens/DayDetailScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Tuodaan Ionicons ikoni

const Tab = createBottomTabNavigator();



export default function App() {
  const [latestDate, setLatestDate] = useState(null);

  useEffect(() => {
    const getLatestWorkoutDate = async () => {
      const savedHistory = await AsyncStorage.getItem('workouts');
      if (savedHistory) {
        const workoutHistory = JSON.parse(savedHistory);
        const dates = Object.keys(workoutHistory);
        const latest = dates.sort((a, b) => new Date(b) - new Date(a))[0];
        setLatestDate(latest);
      }
    };

    getLatestWorkoutDate();
  }, []);

  

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Piilotetaan yläpalkki
          tabBarStyle: {
            backgroundColor: '#121212', // Tumman taustaväri
          },
          tabBarActiveTintColor: '#ffffff', // Aktiivisen välilehden väri
          tabBarInactiveTintColor: '#b0b0b0', // Inaktiivisen välilehden väri
        }}
      >
        <Tab.Screen
          name="Koti"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Historia"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="book-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Päiväkohtaset"
          component={DayDetailScreen}
          initialParams={{ date: latestDate }} // Asetetaan latestDate DayDetailScreenille
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
