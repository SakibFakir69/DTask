import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import {
  ChevronRight,
  Plus,
  X,
  CheckCircle2,
  Briefcase,
  User,
  ShoppingCart,
  Heart,
  Trash2,
  ListTodo,
  AlignLeft,
  Clock,
} from "lucide-react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addSubTask, addTask } from "@/DB/modules/tasks/task.add";
import { createTaskTables } from "@/DB/modules/tasks/task";
import Toast from "react-native-toast-message";

// Schema types
type FormData = {
  id?:string,
  title: string;
  description: string;
  priority: string;
  category_id: string;
  startTime: Date;
  endTime: Date;
};

const CATEGORIES = [
  {
    id: "1",
    name: "Work",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/50",
    icon: Briefcase,
  },
  {
    id: "2",
    name: "Personal",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/50",
    icon: User,
  },
  {
    id: "3",
    name: "Shopping",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/50",
    icon: ShoppingCart,
  },
  {
    id: "4",
    name: "Health",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/50",
    icon: Heart,
  },
];

export default function AddTask() {
  const [loading, setLoading] = useState(false);
  const [subtasks, setSubtasks] = useState<{ id: string; title: string }[]>([]);
  const [currentSubtask, setCurrentSubtask] = useState("");

  // Visibility states for pickers
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      category_id: "1",
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const addSubtask = () => {
    if (currentSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        { id: Date.now().toString(), title: currentSubtask },
      ]);
      setCurrentSubtask("");
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      await createTaskTables();

     const taskId= await addTask({
        title: data.title,
        description: data.description,
        priority: data.priority,
        category_id: data.category_id,
        startTime: data.startTime.toISOString(),
        endTime: data.endTime.toISOString(),
        due_date: new Date().toISOString(),
   
      });
      console.log(subtasks , ' subtask');
      //  insert subtask
         
    if (subtasks.length > 0) {
      for (const sub of subtasks) {
        await addSubTask({
          task_id:taskId,          
          title: sub.title,          
          is_completed: false,     
        });
      }
    }
      
      Toast.show({
        type: "success",
        text1: "Task Created Successfully",
      });
      router.back();
    } catch (error:any) {
      console.error("Submission Error:", error);
     
      Toast.show({
        type:"error",
        text1:`${error.message}`
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#091515]"
    >
      <View className="flex-1 p-6 pt-12">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-white">New Task</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full bg-white/10"
          >
            <X size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Title Input */}
          <View className="mb-6">
            <Text className="mb-2 text-xs font-bold tracking-widest text-emerald-500/80">
              TITLE
            </Text>
            <Controller
              control={control}
              rules={{ required: "Task name is required" }}
              name="title"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="What needs to be done?"
                  placeholderTextColor="#334155"
                  className={`py-2 text-xl text-white border-b ${errors.title ? "border-red-500" : "border-white/10"}`}
                />
              )}
            />
            {errors.title && (
              <Text className="mt-1 text-xs text-red-500">
                {errors.title.message}
              </Text>
            )}
          </View>

          {/* Description */}
          <View className="mb-6">
            <View className="flex-row items-center mb-2">
              <AlignLeft size={14} color="#10b981" />
              <Text className="ml-2 text-xs font-bold tracking-widest uppercase text-emerald-500/80">
                Description
              </Text>
            </View>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Add details..."
                  placeholderTextColor="#334155"
                  multiline
                  className="p-4 text-base text-white bg-white/5 rounded-xl border border-white/10 min-h-[100]"
                  textAlignVertical="top"
                />
              )}
            />
          </View>

          {/* Duration / Time Selection */}
          <View className="mb-6">
            <Text className="mb-3 text-sm font-semibold text-white">
              Duration
            </Text>
            <View className="flex-row justify-between">
              {/* Start Time Controller */}
              <Controller
                control={control}
                name="startTime"
                render={({ field: { value } }) => (
                  <TouchableOpacity
                    onPress={() => setStartPickerVisible(true)}
                    className="flex-row items-center flex-1 p-4 mr-2 border bg-white/5 rounded-2xl border-white/10"
                  >
                    <Clock size={18} color="#10b981" />
                    <View className="ml-3">
                      <Text className="text-[10px] text-gray-500 uppercase font-bold">
                        Start
                      </Text>
                      <Text className="font-medium text-white">
                        {formatTime(value)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />

              {/* End Time Controller */}
              <Controller
                control={control}
                name="endTime"
                render={({ field: { value } }) => (
                  <TouchableOpacity
                    onPress={() => setEndPickerVisible(true)}
                    className="flex-row items-center flex-1 p-4 ml-2 border bg-white/5 rounded-2xl border-white/10"
                  >
                    <Clock size={18} color="#ef4444" />
                    <View className="ml-3">
                      <Text className="text-[10px] text-gray-500 uppercase font-bold">
                        End
                      </Text>
                      <Text className="font-medium text-white">
                        {formatTime(value)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          {/* Priority Controller */}
          <View className="mb-6">
            <Text className="mb-3 text-sm font-semibold text-white">
              Priority
            </Text>
            <Controller
              control={control}
              name="priority"
              render={({ field: { onChange, value } }) => (
                <View className="flex-row p-1 bg-white/5 rounded-xl">
                  {["Low", "Medium", "High"].map((p) => (
                    <TouchableOpacity
                      key={p}
                      onPress={() => onChange(p)}
                      className={`flex-1 py-3 rounded-lg items-center ${value === p ? "bg-[#1A2E2E] border border-emerald-500/30" : ""}`}
                    >
                      <Text
                        className={`${value === p ? "text-emerald-400" : "text-gray-400"} font-medium`}
                      >
                        {p}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </View>

          {/* Subtasks (Manual state management for arrays) */}
          <View className="mb-6">
            <Text className="mb-3 text-sm font-semibold text-white">
              Subtasks
            </Text>
            <View className="flex-row items-center px-4 mb-4 border bg-white/5 rounded-xl border-white/10">
              <TextInput
                value={currentSubtask}
                onChangeText={setCurrentSubtask}
                placeholder="Add a subtask..."
                placeholderTextColor="#334155"
                className="flex-1 py-3 text-white"
                onSubmitEditing={addSubtask}
              />
              <TouchableOpacity
                onPress={addSubtask}
                className="bg-emerald-500/20 p-1.5 rounded-lg"
              >
                <Plus size={18} color="#10b981" />
              </TouchableOpacity>
            </View>
            {/* problem *** */}
            {subtasks.map((item) => (
              <View
                key={item.id}
                className="flex-row items-center p-3 mb-2 border bg-white/5 rounded-xl border-white/5"
              >
                <Text className="flex-1 text-gray-300">{item.title}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setSubtasks(subtasks.filter((s) => s.id !== item.id))
                  }
                >
                  <Trash2 size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Category Controller */}
          <View className="mb-10">
            <Text className="mb-3 text-sm font-semibold text-white">
              Category
            </Text>
            <Controller
              control={control}
              name="category_id"
              render={({ field: { onChange, value } }) => (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="flex-row"
                >
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => onChange(cat.id)}
                      className={`flex-row items-center px-4 py-2.5 rounded-full mr-3 border ${value === cat.id ? `${cat.bg} ${cat.border}` : "bg-white/5 border-transparent"}`}
                    >
                      <Text
                        className={`ml-1 ${value === cat.id ? cat.color : "text-gray-400"} font-medium`}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            />
          </View>
        </ScrollView>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className="flex-row items-center justify-center py-4 shadow-lg bg-emerald-500 rounded-2xl shadow-emerald-500/40"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <CheckCircle2 size={22} color="white" />
              <Text className="ml-2 text-lg font-bold text-white">
                Save Task
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Time Picker Modals */}
        <DateTimePickerModal
          isVisible={isStartPickerVisible}
          mode="time"
          onConfirm={(date) => {
            setValue("startTime", date);
            setStartPickerVisible(false);
          }}
          onCancel={() => setStartPickerVisible(false)}
        />
        <DateTimePickerModal
          isVisible={isEndPickerVisible}
          mode="time"
          onConfirm={(date) => {
            setValue("endTime", date);
            setEndPickerVisible(false);
          }}
          onCancel={() => setEndPickerVisible(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
