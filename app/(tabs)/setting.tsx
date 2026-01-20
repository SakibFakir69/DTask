import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Bell, FileJson, FileText, HelpCircle, Star, Heart, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";

export default function Setting() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#0D1514]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
          <ChevronLeft color="#2D9B78" size={24} />
          <Text className="ml-1 text-lg text-[#2D9B78]">Back</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Settings</Text>
        <View className="w-10" /> 
      </View>

      <ScrollView className="flex-1 px-4">
        
        {/* PREFERENCES SECTION */}
        <Text className="mt-6 mb-3 text-xs font-bold tracking-widest text-gray-500">PREFERENCES</Text>
        <View className="bg-[#162120] rounded-2xl overflow-hidden">
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <View className="bg-[#2D6AFA] p-2 rounded-lg mr-4">
                <Bell color="white" size={20} />
              </View>
              <Text className="text-lg text-white">Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#3e3e3e", true: "#2D9B78" }}
              thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </View>
        </View>

        {/* DATA EXPORT SECTION */}
        <Text className="mt-8 mb-3 text-xs font-bold tracking-widest text-gray-500">DATA EXPORT</Text>
        <View className="bg-[#162120] p-5 rounded-2xl">
          <Text className="mb-4 leading-5 text-gray-400">
            Export your tasks, notes, and habits. Track. Achieve. Repeat. is offline-first; all data remains on your device until you export it.
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-[#1A2827] flex-row items-center justify-center py-3 rounded-xl border border-[#2D3D3B]">
              <FileJson color="#2D9B78" size={18} />
              <Text className="ml-2 font-bold text-[#2D9B78]">JSON</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-[#1A2827] flex-row items-center justify-center py-3 rounded-xl border border-[#2D3D3B]">
              <FileText color="#2D9B78" size={18} />
              <Text className="ml-2 font-bold text-[#2D9B78]">PDF</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SUPPORT SECTION */}
        <Text className="mt-8 mb-3 text-xs font-bold tracking-widest text-gray-500">SUPPORT</Text>
        <View className="bg-[#162120] rounded-2xl overflow-hidden">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-[#1F2C2A]">
            <View className="flex-row items-center">
              <View className="bg-[#00C49A] p-2 rounded-lg mr-4">
                <HelpCircle color="white" size={20} />
              </View>
              <Text className="text-lg text-white">Help Center</Text>
            </View>
            <ChevronRight color="#4B5563" size={20} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <View className="bg-[#F25C7E] p-2 rounded-lg mr-4">
                <Star color="white" size={20} />
              </View>
              <Text className="text-lg text-white">Rate the App</Text>
            </View>
            <ChevronRight color="#4B5563" size={20} />
          </TouchableOpacity>
        </View>

        {/* DONATION CARD */}
        <View className="mt-10 overflow-hidden bg-orange-400 rounded-3xl" style={{ backgroundColor: '#FF8A65' }}>
            <View className="p-6">
                <Text className="text-2xl font-bold text-white">Support the App</Text>
                <Text className="mt-2 text-white opacity-90">
                    Love using Track. Achieve. Repeat.? Help us keep it ad-free and offline-first.
                </Text>
                <TouchableOpacity className="flex-row items-center self-start px-6 py-3 mt-4 bg-white rounded-full">
                    <Heart color="#FF8A65" size={20} fill="#FF8A65" />
                    <Text className="ml-2 font-bold text-[#FF8A65]">Donate</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* FOOTER */}
        <View className="items-center mt-10 mb-10">
          <Text className="text-[10px] tracking-[4px] text-gray-600 font-bold">TRACK. ACHIEVE. REPEAT.</Text>
          <Text className="mt-1 text-xs text-gray-700">Version 2.4.0 • All data stored locally</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}