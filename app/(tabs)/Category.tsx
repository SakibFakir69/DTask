import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { X, Check, Palette, Type } from 'lucide-react-native';
import {PRESET_COLORS} from '@/constant/consant'
import { addCreateCategory, createCategoryTable } from '@/DB/modules/category/category';
import Toast from 'react-native-toast-message';



type CategoryForm = {
  name: string;
  color: string;
};

export default function CreateCategory() {
  const { control, handleSubmit, watch, setValue } = useForm<CategoryForm>({
    defaultValues: { name: '', color: '#34d399' }
  });

  const selectedColor = watch('color');
  const categoryName = watch('name');

  const onSubmit = async (data: CategoryForm) => {
    try {
      await createCategoryTable();
      const { color, name  } = data;
      
      await addCreateCategory({color,name})

      Toast.show({
        type:"success",
        text1:"Category created",
        text2:"Saved successfully",
        
      })
      router.back();
      
      
    } catch (error:any) {

      Toast.show({
        type:"error",
        text1:`${error?.name}`,
        text2:`${error?.message}`
      })
      console.log("error on category", error);
      
      
      
    }
    router.back();
  };

  return (
    <View className="flex-1 bg-[#091515] p-6 pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-8">
        <Text className="text-2xl font-bold text-white">New Category</Text>
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-white/10">
          <X size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Preview Card */}
      <View className="items-center justify-center p-10 mb-8 border bg-white/5 rounded-3xl border-white/10">
        <Text className="mb-4 text-xs font-bold tracking-widest text-gray-500 uppercase">Preview</Text>
        <View 
          style={{ backgroundColor: `${selectedColor}20`, borderColor: `${selectedColor}50` }}
          className="flex-row items-center px-6 py-3 border rounded-full"
        >
          <View style={{ backgroundColor: selectedColor }} className="w-3 h-3 mr-3 rounded-full" />
          <Text style={{ color: selectedColor }} className="text-lg font-bold">
            {categoryName || "Category Name"}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Name Input */}
        <View className="mb-8">
          <View className="flex-row items-center mb-3">
            <Type size={16} color="#94a3b8" />
            <Text className="ml-2 text-sm font-semibold text-white">Category Name</Text>
          </View>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="e.g. Work, Study..."
                placeholderTextColor="#334155"
                className="p-4 text-white border bg-white/5 rounded-2xl border-white/10"
              />
            )}
          />
        </View>

        {/* --- HORIZONTAL COLOR PICKER --- */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Palette size={16} color="#94a3b8" />
              <Text className="ml-2 text-sm font-semibold text-white">Select Color</Text>
            </View>
            <Text className="text-xs text-gray-500">Scroll for more →</Text>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {PRESET_COLORS.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <TouchableOpacity
                  key={color}
                  onPress={() => setValue('color', color)}
                  style={{ 
                    backgroundColor: color,
                    transform: [{ scale: isSelected ? 1.1 : 1 }]
                  }}
                  className={`w-14 h-14 rounded-2xl mr-3 items-center justify-center ${isSelected ? 'border-2 border-white' : ''}`}
                >
                  {isSelected && <Check size={20} color="white" strokeWidth={4} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)}
        className="flex-row items-center justify-center py-4 bg-emerald-500 rounded-2xl"
      >
        <Check size={22} color="white" />
        <Text className="ml-2 text-lg font-bold text-white">Create Category</Text>
      </TouchableOpacity>
    </View>
  );
}