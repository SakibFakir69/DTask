import OnboardingUI from "@/onboarding/OnboardingUI";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <View className="">
        <OnboardingUI />
      </View>
    </SafeAreaProvider>
  );
}
