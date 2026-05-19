import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DayDetailScreen = ({ route, navigation }) => {
  const { date, workoutHistory } = route.params;

  // Tarkistetaan, että workoutHistory on olemassa ja että päivämäärä löytyy siitä
  const [dayWorkouts, setDayWorkouts] = useState([]);

  useEffect(() => {
    // Varmistetaan, että workoutHistory on olemassa ja että päivämäärä löytyy
    if (workoutHistory && workoutHistory[date]) {
      setDayWorkouts(workoutHistory[date]);
    } else {
      // Jos ei löydy, asetetaan tyhjä taulukko
      setDayWorkouts([]);
    }
  }, [date, workoutHistory]);

  const getWeekdayAndDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
  };
  

  const deleteWorkout = async (workoutToDelete) => {
    try {
      const savedHistory = await AsyncStorage.getItem('workouts');
      const workoutHistory = savedHistory ? JSON.parse(savedHistory) : {};

      const updatedWorkouts = workoutHistory[date].filter((workout) => {
        return JSON.stringify(workout) !== JSON.stringify(workoutToDelete);
      });

      workoutHistory[date] = updatedWorkouts;
      await AsyncStorage.setItem('workouts', JSON.stringify(workoutHistory));
      setDayWorkouts(updatedWorkouts);
    } catch (error) {
      console.error('Virhe treenin poistamisessa:', error.message);
    }
  };

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.exercise}>{item.exercise}</Text>
      <Text style={styles.sets}>Sarjat: {item.sets}</Text>
      <Text style={styles.reps}>Toistot: {item.reps.join(' - ')}</Text>
      <Text style={styles.weights}>Painot: {item.weights.join(' - ')} kg</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteWorkout(item)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}> {getWeekdayAndDate(date)}</Text>
      {dayWorkouts.length === 0 ? (
        <Text style={styles.noWorkoutsText}>Ei treenejä valitulla päivällä</Text>
      ) : (
        <FlatList
          data={dayWorkouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
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
  exercise: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  sets: {
    fontSize: 16,
    color: '#b0b0b0',
    marginVertical: 4,
  },
  reps: {
    fontSize: 16,
    color: '#b0b0b0',
    marginVertical: 4,
  },
  weights: {
    fontSize: 16,
    color: '#b0b0b0',
    marginVertical: 4,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  noWorkoutsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000', // Punainen väri ilmoitukseen
    textAlign: 'center',
  },
});

export default DayDetailScreen;
