
import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OnboardingUI from '@/onboarding/OnboardingUI';

export default function index() {
  const isOnboardingComplete = AsyncStorage.getItem("hasOnboard");
  console.log(isOnboardingComplete , ' onboaridng ');

  if(!isOnboardingComplete)
  {
    return <OnboardingUI/>

  }
  /// auth check
  

  return (
    <View>
      <Text>index</Text>
    </View>
  )
}