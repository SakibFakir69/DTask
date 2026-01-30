import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle,
  Edit3,
  Trash2,
  Flag,
  ChevronRight
} from "lucide-react-native";
import { getTaskDetails } from "@/DB/modules/tasks/task.details";
import { deleteTask } from "@/DB/modules/tasks/task.delete";

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTaskDetails(id as string);
      setTask(result);
    };
    fetchData();
  }, [id]);

  // --- CRUD Operations ---
  
  const handleEdit = () => {
    // Navigate to your edit screen or open an edit modal
    // router.push(`/edit-task/${id}`);
    Alert.alert("Edit Mode", "Navigate to edit screen or open modal here.");
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to permanently delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
          const isDelete=  deleteTask(id as string);
          console.log(isDelete)
            
            router.back();
          } 
        }
      ]
    );
  };

  if (!task) return (
    <View className="flex-1 bg-[#0A0A0A] items-center justify-center">
      <Text className="text-gray-500 animate-pulse">Loading task details...</Text>
    </View>
  );

  const completedSubtasks = task.subtasks?.filter((s: any) => s.is_completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <StatusBar barStyle="light-content" />
      
      {/* Header with Management Actions */}
      <View className="flex-row items-center justify-between px-6 py-10 border-b border-white/5">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="items-center justify-center w-10 h-10 rounded-full bg-white/5"
        >
          <ArrowLeft color="#fff" size={20} />
        </TouchableOpacity>
        
        <View className="flex-row space-x-2">
          <TouchableOpacity 
            onPress={handleEdit}
            className="items-center justify-center w-10 h-10 rounded-full bg-white/5"
          >
            <Edit3 color="#108b7f" size={18} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleDelete}
            className="items-center justify-center w-10 h-10 rounded-full bg-red-500/10"
          >
            <Trash2 color="#ef4444" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        {/* Title & Description Section */}
        <View className="mt-8">
          <View className="flex-row items-center mb-3">
            <View className={`px-3 py-1 rounded-lg ${task.priority === 'High' ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
              <Text className={`text-[10px] font-bold uppercase tracking-tighter ${task.priority === 'High' ? 'text-red-400' : 'text-emerald-400'}`}>
                {task.priority} Priority
              </Text>
            </View>
            <View className="w-1 h-1 mx-2 rounded-full bg-white/20" />
            <Text className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">#{task.id}</Text>
          </View>
          
          <Text className="text-4xl font-bold leading-tight text-white">{task.title}</Text>
          <Text className="mt-4 text-base leading-6 text-gray-400/80">
            {task.description || "No description provided for this task."}
          </Text>
        </View>

        {/* Info Grid */}
        <View className="flex-row mt-8 space-x-4">
          <View className="flex-1 p-4 border bg-white/5 border-white/10 rounded-3xl">
            <View className="flex-row items-center mb-2">
              <Calendar color="#108b7f" size={16} />
              <Text className="ml-2 text-xs font-bold text-gray-500 uppercase">Deadline</Text>
            </View>
            <Text className="text-base font-semibold text-white">
              {new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </Text>
          </View>

          <View className="flex-1 p-4 border bg-white/5 border-white/10 rounded-3xl">
            <View className="flex-row items-center mb-2">
              <Flag color="#108b7f" size={16} />
              <Text className="ml-2 text-xs font-bold text-gray-500 uppercase">Status</Text>
            </View>
            <Text className="text-base font-semibold text-white">
              {progress === 100 ? 'Completed' : 'Active'}
            </Text>
          </View>
        </View>

        {/* Progress Card */}
        <View className="mt-6 overflow-hidden bg-[#286b65] rounded-[32px] p-6">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-2xl font-bold text-white">Task Progress</Text>
              <Text className="font-medium text-yellow-200/60">{completedSubtasks} of {totalSubtasks} steps done</Text>
            </View>
            <Text className="text-3xl font-black text-white">{Math.round(progress)}%</Text>
          </View>
          <View className="w-full h-4 overflow-hidden rounded-full bg-black/20">
            <View style={{ width: `${progress}%` }} className="h-full bg-yellow-400 rounded-full" />
          </View>
        </View>

        {/* Subtasks Section */}
        <View className="mt-10 mb-32">
          <Text className="mb-6 text-xl font-bold text-white">Subtasks</Text>
          {task.subtasks?.map((sub: any) => (
            <TouchableOpacity 
              key={sub.id} 
              activeOpacity={0.7}
              className={`flex-row items-center p-5 mb-3 rounded-2xl border ${sub.is_completed ? 'bg-[#1a3836]' : 'bg-[#2d716b] border-white/10'}`}
            >
              <View className="mr-4">
                {sub.is_completed ? (
                  <View className="items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
                    <CheckCircle2 color="#34d399" size={18} />
                  </View>
                ) : (
                  <Circle color="white" size={22} />
                )}
              </View>
              <Text className={`flex-1 text-base font-medium ${sub.is_completed ? 'text-gray-500 line-through' : 'text-gray-100'}`}>
                {sub.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Primary Action Button */}
      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity className="w-full bg-[#108b7f] py-4 rounded-2xl shadow-xl shadow-emerald-900/40 items-center justify-center">
          <Text className="text-lg font-bold text-white">Mark as Fully Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}