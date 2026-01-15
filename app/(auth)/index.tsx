


import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function index() {
    const hasOnboard =AsyncStorage.getItem("hasOnboard");
    console.log(hasOnboard);
    
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}