import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentDate from "@/utils/day";
import { router } from "expo-router";
import { TaskCard } from "../components/TaskCard";
import { Plus, BarChart2 } from "lucide-react-native";
import { taskUserDataRetrive } from "@/DB/modules/tasks/task.retrive";

// delete based on swipe

export default function Index() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await taskUserDataRetrive();
        console.log(data, "all data");
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#0D0D0D]">
      <ScrollView className="flex-1 px-4">
        {/* Header Section */}
        <View className="flex-row items-center justify-between mt-4">
          <View>
            <Text className="text-xs tracking-widest text-gray-400">
              TRACK. ACHIEVE. REPEAT.
            </Text>
            <Text className="text-2xl font-bold text-white">
              <CurrentDate />
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
              className={`px-5 py-2 rounded-full ${i === 0 ? "bg-[#00A897]" : "bg-[#173632]"}`}
            >
              <Text className="font-medium text-white">{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Progress Card */}
        <View className="bg-[#1a3836] mt-6 p-6 rounded-3xl flex-row items-center">
          <View className="relative items-center justify-center w-20 h-20 border-4 border-[#2D9B78] rounded-full">
            <Text className="text-lg font-bold text-white">65%</Text>
          </View>
          <View className="ml-6">
            <Text className="text-[#2D9B78] text-xs font-bold tracking-widest">
              DAILY PROGRESS
            </Text>
            <Text className="text-xl font-bold text-white">
              4 of 6 tasks done
            </Text>
            <View className="bg-[#3D2616] self-start px-2 py-0.5 rounded mt-1">
              <Text className="text-[#FF8C39] text-[10px] font-bold">
                Great Pace!
              </Text>
            </View>
          </View>
        </View>

        <Text className="mt-8 mb-4 text-xl font-bold text-white">
          Todays Tasks
        </Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskCard
            id={item.id}
              label={item.category || "TASK"}
              title={item.title}
              progress={item.progress || 0}
              subtasks={item.subtasks || "0/0"}
              completed={item.completed}
            />
          )}
          
          //  renderRightActions={() =>console.log("dsf")}
           
          ListEmptyComponent={
            <View>
              <Text className="mt-10 text-center text-gray-500">
                No tasks found
              </Text>
            </View>
          }
        />

        {/* Almost There Banner */}
        <View className="bg-[#141414] p-4 rounded-2xl flex-row items-center mt-2 mb-10">
          <View className="bg-[#1A3D32] p-2 rounded-lg">
            <BarChart2 size={20} color="#2D9B78" />
          </View>
          <View className="ml-4">
            <Text className="font-bold text-white">Almost there!</Text>
            <Text className="text-xs text-gray-500">
              3 more tasks to keep your 7-day streak
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => router.push("/task/AddTask")}
        className="absolute bottom-24 right-6 bg-[#FF724C] w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Plus color="white" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
