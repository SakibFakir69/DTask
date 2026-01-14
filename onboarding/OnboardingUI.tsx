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


// add three image 
// add skip and next function

export default function OnboardingUI() {
  const { height, width } = useWindowDimensions();
  const onBoardingUiRef = useRef(null);

  // skip button
  // next button
 const NextButton = ({ ...props }) => (
    <TouchableOpacity 
      {...props} 
     style={onBoardingStyle.nextButton}
    >
      <Text style={onBoardingStyle.buttonText}>Next</Text>
    </TouchableOpacity>
  );

  const SkipButton = ({ ...props }) => (
    <TouchableOpacity 
      {...props} 
      style={onBoardingStyle.skipButton}
     
    >
      <Text style={onBoardingStyle.skipText}>Skip</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ height: height, backgroundColor: "#fff" }}>
      <LinearGradient colors={["#0F2321", "#0D3935"]} style={{ flex: 1 }}>
        <Onboarding
          ref={onBoardingUiRef}
          SkipButtonComponent={SkipButton}
          NextButtonComponent={NextButton}
          bottomBarHighlight={false}


          onDone={()=> console.log("done")}
          onSkip={()=>{
            console.log("skip")
          }}
          
          titleStyles={{
            color: "#ccc",
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
              image: (
                <Image
                  source={require("../assets/Gemini_Generated_Image_wxh97hwxh97hwxh9.png")}
                  style={{ height: height * 0.45, width: width - 8 }}
                  resizeMode="contain"
                />
              ),
              title: "Premium Experience",
              subtitle: "Beautiful dark gradient background",
            },
            {
              backgroundColor: "transparent",
              image: (
                <Image
                  source={require("../assets/Gemini_Generated_Image_xby4qvxby4qvxby4.png")}
                  style={{ height: height * 0.45, width: width - 8 }}
                  resizeMode="contain"
                />
              ),
              title: "Stay Focused",
              subtitle: "Clean and modern design",
            },
          ]}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}


