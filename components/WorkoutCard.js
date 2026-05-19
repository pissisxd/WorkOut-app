import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutCard = ({ exercise, sets, reps, weight }) => {
  return (
    <View style={styles.card}>
      <Text>{exercise}</Text>
      <Text>{sets} sarjaa x {reps} toistoa - {weight} kg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
});

export default WorkoutCard;
