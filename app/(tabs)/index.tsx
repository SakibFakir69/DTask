import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckCircle2, Circle, Plus, LayoutGrid, FileText, BarChart2, Settings } from "lucide-react-native";
import CurrentDate from "@/utils/day";
import { router } from "expo-router";


export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#0D0D0D]">
      <ScrollView className="flex-1 px-4">
        
        {/* Header Section */}
        <View className="flex-row items-center justify-between mt-4">
          <View>
            <Text className="text-xs tracking-widest text-gray-400">TRACK. ACHIEVE. REPEAT.</Text>
            <Text className="text-2xl font-bold text-white">
              <CurrentDate/>
            </Text>
          </View>
          <View className="bg-[#1A1A1A] px-3 py-1 rounded-full flex-row items-center">
            <Text className="mr-1 text-emerald-500">🔥</Text>
            <Text className="font-bold text-emerald-500">7</Text>
          </View>
        </View>

        {/* Category Filter */}
        <View className="flex-row gap-2 mt-6 space-x-4">
          {["All", "Work", "Personal", "Health"].map((cat, i) => (
            <TouchableOpacity 
              key={cat} 
              className={`px-5 py-2 rounded-full ${i === 0 ? 'bg-[#00A897]' : 'bg-[#173632]'}`}
            >
              <Text className="font-medium text-white">{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Progress Card */}
        <View className="bg-[#0F2321] mt-6 p-6 rounded-3xl flex-row items-center">
          
          <View className="relative items-center justify-center w-20 h-20 border-4 border-[#2D9B78] rounded-full">
             <Text className="text-lg font-bold text-white">65%</Text>
          </View>
          <View className="ml-6">
            <Text className="text-[#2D9B78] text-xs font-bold tracking-widest">DAILY PROGRESS</Text>
            <Text className="text-xl font-bold text-white">4 of 6 tasks done</Text>
            <View className="bg-[#3D2616] self-start px-2 py-0.5 rounded mt-1">
                <Text className="text-[#FF8C39] text-[10px] font-bold">Great Pace!</Text>
            </View>
          </View>
        </View>

        <Text className="mt-8 mb-4 text-xl font-bold text-white">Todays Tasks</Text>

        {/* Task List */}
        <TaskCard 
          label="WORK" 
          title="Finish UI Plan" 
          progress={50} 
          subtasks="2 of 4" 
         
        />
        <TaskCard 
          label="HEALTH" 
          title="Morning Yoga" 
          progress={100} 
          subtasks="1 of 1" 
       
          completed 
        />
        <TaskCard 
          label="PERSONAL" 
          title="Buy Groceries" 
          progress={0} 
          subtasks="0 of 3" 
       
        />

        {/* Almost There Banner */}
        <View className="bg-[#141414] p-4 rounded-2xl flex-row items-center mt-2 mb-10">
            <View className="bg-[#1A3D32] p-2 rounded-lg">
                <BarChart2 size={20} color="#2D9B78" />
            </View>
            <View className="ml-4">
                <Text className="font-bold text-white">Almost there!</Text>
                <Text className="text-xs text-gray-500">3 more tasks to keep your 7-day streak</Text>
            </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity onPress={()=> router.push('/task/AddTask')} className="absolute bottom-24 right-6 bg-[#FF724C] w-14 h-14 rounded-full items-center justify-center shadow-lg">
        <Plus color="white" size={30} />
      </TouchableOpacity>

    
    
    </SafeAreaView>
  );
}

// Sub-components
const TaskCard = ({ label, title, progress, subtasks, completed = false }:any) => (
  
  <View className="bg-[#1a3836] p-5 rounded-3xl mb-4">
    
    <View className="flex-row items-start justify-between">
      <View>
        <Text  className="text-[10px] text-yellow-200 font-black tracking-tighter mb-1"> {label}</Text>
        <Text className="text-lg font-bold text-white">{title}</Text>
      </View>
      {completed ? <CheckCircle2 color="#2D9B78" size={24} /> : <Circle color="#333" size={24} />}
    </View>
    
    <View className="mt-4">
        <View className="flex-row justify-between mb-2">
            <Text className="text-xs text-[#108b7f]">{subtasks} subtasks</Text>
            <Text className="text-xs text-gray-500">{progress}%</Text>
        </View>
        <View className="h-1.5 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
            <View style={{ width: `${progress}%`, backgroundColor: "red" }} className="h-full rounded-full" />
        </View>
    </View>
  </View>
);

const NavItem = ({ icon, label, active = false }:any) => (
  <View className="items-center">
    {icon}
    <Text className={`text-[10px] mt-1 ${active ? 'text-[#2D9B78]' : 'text-gray-500'}`}>{label}</Text>
  </View>
);