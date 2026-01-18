
import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "onboarding_done";

export const setOnboardingDone = async () => {
  await AsyncStorage.setItem(ONBOARDING_KEY, "true");
};

export const getOnboardingDone = async () => {
  return await AsyncStorage.getItem(ONBOARDING_KEY);
};
