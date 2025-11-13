import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryItem({ name, icon }) {
  return (
    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
      <View style={{ backgroundColor: '#E8F5E9', padding: 12, borderRadius: 40 }}>
        <Ionicons name={icon} size={24} color="#4CAF50" />
      </View>
      <Text style={{ fontSize: 13, marginTop: 5 }}>{name}</Text>
    </View>
  );
}
