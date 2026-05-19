import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HistoryScreen = ({ navigation }) => {
  const [workoutHistory, setWorkoutHistory] = useState({});

  // Funktio treenihistorian lataamiseen
  const loadHistory = async () => {
    const savedHistory = await AsyncStorage.getItem('workouts');
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }
  };

  // Lataa historia aina, kun käyttäjä menee HistoryScreeniin
  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  // Funktio viikonpäivän ja päivämäärän näyttämiseen
  const getWeekdayAndDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Treenihistoria</Text>
      <FlatList
        data={Object.keys(workoutHistory)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.historyItem}
            onPress={() => navigation.navigate('Päiväkohtaset', { date: item, workoutHistory })}
          >
            <Text style={styles.historyText}>
              {getWeekdayAndDate(item)} {/* Näytetään viikonpäivä ja päivämäärä */}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  historyText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default HistoryScreen;
