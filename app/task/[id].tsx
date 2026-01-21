

import { View, Text } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'


export default function TaskDetails() {
  const{id} = useLocalSearchParams();
  console.log(id)

  return (
    <View>
      <Text>{id}</Text>



    </View>
  )
}