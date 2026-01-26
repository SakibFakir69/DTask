import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  MoreHorizontal,
  Sparkles,
  Zap
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

// Assume your DB helpers are here
import { getTaskWithSubtasks } from "@/DB/modules/tasks/task.details";
import { ConnectionDB } from "@/DB/database";

//  update ( complete task)
// put subtask and title
// delete task 
// think ui 


export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [subtasks, setSubtasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Brand Colors
  const COLORS = {
    primaryDark: "#0F2321",
    accentTeal: "#00A897",
    accentLight: "#E6F6F5",
  };

  useEffect(() => {
    fetchTaskData();
  }, [id]);

  const fetchTaskData = async () => {
    try {
      setLoading(true);
      const taskId = Array.isArray(id) ? id[0] : id;
      const result = (await getTaskWithSubtasks(String(taskId))) as any[];

      if (result && result.length > 0) {
        setData(result[0]);
        const extracted = result
          .filter((row) => row.subtask_id !== null)
          .map((row) => ({
            id: row.subtask_id,
            title: row.subtask_title,
            completed: row.subtask_completed === 1,
          }));
        setSubtasks(extracted);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubtask = async (subtaskId: number, currentState: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      const db = await ConnectionDB();
      await db.runAsync("UPDATE Subtasks SET is_completed = ? WHERE id = ?", [currentState ? 0 : 1, subtaskId]);
      setSubtasks(prev => prev.map(s => s.id === subtaskId ? { ...s, completed: !currentState } : s));
    } catch (e) {
      Alert.alert("Error", "Update failed");
    }
  };

  const progress = subtasks.length > 0 
    ? Math.round((subtasks.filter(s => s.completed).length / subtasks.length) * 100) 
    : 0;

  if (loading) return (
    <View className="items-center justify-center flex-1 bg-white">
      <ActivityIndicator size="large" color={COLORS.accentTeal} />
    </View>
  );

  return (
    <View className="flex-1 bg-[#090D19]">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pb-4 pt-14">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="items-center justify-center w-10 h-10 rounded-2xl bg-slate-50"
        >
          <ChevronLeft size={22} color={COLORS.primaryDark} />
        </TouchableOpacity>
        <Text  className="text-lg font-bold text-emerald-400">Details</Text>
      
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        
        {/* Priority Badge & Title */}
        <View className="px-6 mt-4">
          <View style={{ backgroundColor: COLORS.accentLight }} className="self-start px-3 py-1 mb-3 rounded-full">
            <Text style={{ color: COLORS.accentTeal }} className="text-[10px] font-black uppercase tracking-widest">
              {data?.priority} Priority
            </Text>
          </View>
          <Text  className="text-3xl font-bold tracking-tight text-white">
            {data?.title || "not founed"}
          </Text>

          {/* Progress Card - Using #0F2321 */}
          <View  className="mt-6 bg-[#285c59] p-6 rounded-[32px] shadow-xl shadow-black/20">
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <Text className="text-xs font-bold tracking-wider uppercase text-slate-400">Completion</Text>
                <Text className="mt-1 text-4xl font-black text-white">{progress}%</Text>
              </View>
              <View style={{ backgroundColor: 'rgba(0, 168, 151, 0.2)' }} className="p-4 rounded-3xl">
                <Zap color={COLORS.accentTeal} size={28} fill={COLORS.accentTeal} />
              </View>
            </View>
            <View className="w-full h-3 overflow-hidden rounded-full bg-white/10">
              <View style={{ width: `${progress}%`, backgroundColor: COLORS.accentTeal }} className="h-full rounded-full" />
            </View>
          </View>
        </View>

        {/* Schedule Grid */}
        <View className="flex-row w-full gap-4 px-6 m-4 ">
          
          <View className="flex-1 p-4  bg-[#285c59] rounded-3xl ">
            <Calendar size={20} color={COLORS.accentTeal} />
            <Text className="text-white text-[10px] font-bold uppercase mt-3">Due Date</Text>
            <Text style={{ color: COLORS.primaryDark }} className="mt-1 font-bold">
              {new Date(data?.due_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </Text>
          </View>
          
          <View className="flex-1 p-4 border bg-[#285c59] rounded-3xl ">
            <Clock size={20} color={COLORS.accentTeal} />
            <Text className="text-white text-[10px] font-bold uppercase mt-3">Time</Text>
            <Text style={{ color: COLORS.primaryDark }} className="mt-1 font-bold">
              {new Date(data?.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>

       

        {/* Checklist */}
        <View className="px-6 mt-8">
          <Text  className="mb-4 text-xl font-bold text-white">Subtasks</Text>
          
          {subtasks.map((sub) => (
            <TouchableOpacity 
              key={sub.id}
              onPress={() => toggleSubtask(sub.id, sub.completed)}
              activeOpacity={0.8}
              className={`flex-row items-center p-5 mb-4 rounded-3xl text-white ${
                sub.completed ? 'bg-slate-500 text-white' : 'bg-[#1a3836] border text-white  shadow-sm '
              }`}
            >
              {sub.completed ? (
                <CheckCircle2 size={24} color={COLORS.accentTeal} />
              ) : (
                <Circle size={24} color="#CBD5E1" />
              )}
              <Text className={`ml-4 flex-1 font-semibold text-[16px] ${
                sub.completed ? 'text-slate-300 line-through' : 'text-white'
              }`}>
                {sub.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Primary Action Button */}
      <View className="absolute left-0 right-0 px-6 bottom-10">
        <TouchableOpacity 
          
          className="flex-row items-center bg-emerald-500 justify-center h-18 py-5 rounded-[24px]"
        >
          <Sparkles size={22} color="white" />
          <Text className="ml-3 text-lg font-black tracking-widest text-white uppercase">Complete Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}