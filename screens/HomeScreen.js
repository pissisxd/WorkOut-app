import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weights, setWeights] = useState('');
  

  const addWorkout = async () => {
    if (!exercise || !sets || !reps || !weights) {
      alert('Täytä kaikki kentät!');
      return;
    }

    try {
      const savedHistory = await AsyncStorage.getItem('workouts');
      const workoutHistory = savedHistory ? JSON.parse(savedHistory) : {};

      const currentDate = new Date().toISOString().split('T')[0];

      if (!workoutHistory[currentDate]) {
        workoutHistory[currentDate] = [];
      }
      workoutHistory[currentDate].push({
        exercise,
        sets: parseInt(sets),
        reps: reps.split('-').map(Number),
        weights: weights.split('-').map(Number),
      });

      await AsyncStorage.setItem('workouts', JSON.stringify(workoutHistory));

      setExercise('');
      setSets('');
      setReps('');
      setWeights('');

    } catch (error) {
      console.error('Virhe treenin lisäämisessä:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lisää uusi treeni</Text>
      <TextInput
        style={styles.input}
        placeholder="Harjoitus"
        value={exercise}
        onChangeText={setExercise}
        placeholderTextColor="#aaa" // Vaaleampi teksti placeholderissa
      />
      <TextInput
        style={styles.input}
        placeholder="Sarjat (esim. 3)"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Toistot (esim. 5-6-7)"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Painot (esim. 50-55-60)"
        value={weights}
        onChangeText={setWeights}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
            <TouchableOpacity style={styles.button} onPress={addWorkout}>
        <Text style={styles.buttonText}>Lisää treeni</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Tummanharmaa tausta
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff', // Valkoinen teksti otsikossa
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444', // Tummempi kehys
    backgroundColor: '#1e1e1e', // Tummanharmaa tausta input-kentissä
    color: '#fff', // Valkoinen teksti kentissä
    padding: 12,
    marginVertical: 10,
    borderRadius: 8, // Pyöristetyt kulmat
  },
  button: {
    backgroundColor: '#4CAF50', // Vihreä tausta
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Valkoinen teksti
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
