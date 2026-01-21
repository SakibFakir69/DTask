import { View, Text, TouchableOpacity } from "react-native";
import {
  CheckCircle2,
  Circle,
  Plus,
  LayoutGrid,
  FileText,
  BarChart2,
  Settings,
} from "lucide-react-native";
import { router } from "expo-router";

export const TaskCard = ({
    id,
  label,
  title,
  progress,
  subtasks,
  completed = false,
}: any) => (
  <TouchableOpacity onPress={()=> router.push(`/task/${id}`)}>
    
    <View className="bg-[#1a3836] p-5 rounded-3xl mb-4">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-[10px] text-yellow-200 font-black tracking-tighter mb-1">
            {" "}
            {label}
          </Text>
          <Text className="text-lg font-bold text-white">{title}</Text>
        </View>
        {completed ? (
          <CheckCircle2 color="#2D9B78" size={24} />
        ) : (
          <Circle color="#333" size={24} />
        )}
      </View>

      <View className="mt-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-xs text-[#108b7f]">{subtasks} subtasks</Text>
          <Text className="text-xs text-gray-500">{progress}%</Text>
        </View>
        <View className="h-1.5 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
          <View
            style={{ width: `${progress}%`, backgroundColor: "red" }}
            className="h-full rounded-full"
          />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
