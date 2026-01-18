import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectionDB } from "@/DB/database";
import { loginSchema, LoginFormData } from "@/zod/auth/auth";
import { router } from "expo-router";
import { saveToken } from "@/utils/authSecure";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onLogin = async (data: LoginFormData) => {
    try {
      const db = await ConnectionDB();

      const user = await db.getFirstAsync<{
        id?: number;
        email: string;
        password: string;
      }> ("SELECT * FROM users WHERE email = ? AND password = ?", [
        data.email,
        data.password,
      ]);
      

      if (user) {
         const token = `token_${user.id}_${Date.now()}`;
         await saveToken(token);
         
       
        
        
        Alert.alert("Success", "Welcome back!");
         router.replace('/(tabs)')
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Database Error", "Could not connect to the local database.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-[#0a1a1a]"
    >
      <View className="items-center flex-1 p-6">
        {/* Status Badge */}
        <View className="self-end mt-4 px-3 py-1 bg-[#1a2e2e] rounded-full">
          <Text className="text-[#00ffa3] text-[10px] font-bold"></Text>
        </View>

        {/* Header Section */}
        <View className="items-center mt-8 mb-10">
          <View className="w-16 h-16 bg-[#1a2e2e] rounded-full items-center justify-center mb-6">
            <Text className="text-3xl">🔥</Text>
          </View>
          <Text className="text-white text-xs font-bold tracking-[2px] uppercase mb-2">
            Track. Achieve. Repeat.
          </Text>
          <Text className="text-4xl font-bold text-white">Welcome Back</Text>
          <Text className="text-gray-400 text-center mt-3 max-w-[280px] leading-5">
            Log in to your offline-first productivity space and continue your
            streak.
          </Text>
        </View>

        {/* Form Fields */}
        <View className="w-full max-w-sm">
          <Text className="mb-2 ml-1 text-sm text-gray-300">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-[#162929]/50 border border-[#2a4545] rounded-2xl p-4 text-white mb-4 focus:border-[#00ffa3]"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="name@example.com"
                placeholderTextColor="#4a5d5d"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <View className="flex-row items-center justify-between mb-2 ml-1">
            <Text className="text-sm text-gray-300">Password</Text>
            <TouchableOpacity>
              <Text className="text-[#00ffa3] text-sm">Forgot?</Text>
            </TouchableOpacity>
          </View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex-row items-center bg-[#162929]/50 border border-[#2a4545] rounded-2xl px-4 mb-6 focus:border-[#00ffa3]">
                <TextInput
                  className="flex-1 py-4 text-white"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  placeholder="Enter your password"
                  placeholderTextColor="#4a5d5d"
                />
                <Text className="text-gray-400">👁️</Text>
              </View>
            )}
          />

          {/* Primary Action */}
          <TouchableOpacity
            onPress={handleSubmit(onLogin)}
            disabled={isSubmitting}
            className="w-full bg-[#00c2a0] rounded-2xl py-5 items-center shadow-xl shadow-[#00c2a0]/20"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#0a1a1a" />
            ) : (
              <Text className="text-[#0a1a1a] font-bold text-lg">Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Sync Indicator */}
          <View className="flex-row items-center justify-center mt-2 opacity-50">
            <Text className="text-xs text-gray-400">
              ☁️ Offline-first sync active
            </Text>
          </View>
        </View>

        {/* Footer Link */}
        <TouchableOpacity
          className="flex-row mt-10"
          onPress={() => router.push("/(auth)/register")}
        >
          <Text className="text-gray-400">Don t have an account? </Text>
          <Text className="text-[#00ffa3] font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
