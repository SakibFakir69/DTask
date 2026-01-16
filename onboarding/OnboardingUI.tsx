import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Onboarding from "react-native-onboarding-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { onBoardingStyle } from "@/styles/onboardinng/onBoarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// add three image
// add skip and next function

export default function OnboardingUI() {
  const { height, width } = useWindowDimensions();
  const onBoardingUiRef = useRef(null);

  // skip button
  // next button
  const NextButton = ({ ...props }) => (
    <TouchableOpacity {...props} style={onBoardingStyle.nextButton}>
      <Text style={onBoardingStyle.buttonText}>Next</Text>
    </TouchableOpacity>
  );

  const SkipButton = ({ ...props }) => (
    <TouchableOpacity {...props} style={onBoardingStyle.skipButton}>
      <Text style={onBoardingStyle.skipText}>Skip</Text>
    </TouchableOpacity>
  );
// done
  const handelDone = async()=>{
    try {
      await AsyncStorage.setItem("hasOnboard","true");
      router.push('/(auth)/register');
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <SafeAreaView style={{ height: height, backgroundColor: "#fff" }}>
      <LinearGradient colors={["#0F2321", "#0D3935"]}
      
      style={{ flex: 1 }}
      
      >

        <Onboarding
          ref={onBoardingUiRef}
          SkipButtonComponent={SkipButton}
          NextButtonComponent={NextButton}
          bottomBarHighlight={false}
          onDone={handelDone}
          onSkip={handelDone}
          titleStyles={{
            color: "#fff",
            fontSize: 26,
            fontWeight: "bold",
            marginTop: -90,
          }}
          subTitleStyles={{
            color: "#ccc",
            fontSize: 16,
            marginTop: -40,
          }}
          imageContainerStyles={{
            padding: 10,
            paddingBottom: 30,
          }}
          containerStyles={{
            borderWidth: 2,
            borderColor: "transparent",
            padding: 30,
          }}
          pages={[
            {
              backgroundColor: "transparent",
              image: <View></View>,
              title: "Welcome",
              subtitle: "Organize your work. Simplify your life",
            
             
            },
            {
              backgroundColor: "transparent",
              image: (
                <Image
                  source={require("../assets/undraw_to-do-app_esjl-removebg-preview.png")}
                  style={{ height: height * 0.45, width: width - 8 }}
                  resizeMode="contain"
                />
              ),
              title: "Stay Organized",
              subtitle: "Simple tools for better productivity",
            },
            {
              backgroundColor: "transparent",
              image:<View></View>,
              title: "Keep Moving",
              subtitle: "Consistent progress, every day",
            },
          ]}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
