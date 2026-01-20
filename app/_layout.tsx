import { Slot } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import OnboardingUI from "@/onboarding/OnboardingUI";
import { getToken } from "@/utils/authSecure";
import { getOnboardingDone } from "@/utils/onBoarding";
import Toast from 'react-native-toast-message';


type AppState = "loading" | "onboarding" | "auth" | "tabs";

export default function RootLayout() {
  const [state, setState] = useState<AppState>("loading");

  useEffect(() => {
    const checkAppFlow = async () => {
      const onboardingDone = await getOnboardingDone();
      
      const token = await getToken();
     

      console.log(onboardingDone, "onboarding done");

      if (!onboardingDone) {
        setState("onboarding");
      } else if (token) {
        setState("tabs");
      } else {
        setState("auth");
      }
    };

    checkAppFlow();
  }, []);

  //  Loading
  if (state === "loading") {
    return (
      <View className="items-center justify-center flex-1 bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //  Onboarding
  if (state === "onboarding") {
    return <OnboardingUI />;
  }

  //  App navigation
  return (
    <SafeAreaProvider>
      <Slot />
      <Toast/>
    </SafeAreaProvider>
  );
}
