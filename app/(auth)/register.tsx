import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConnectionDB } from "@/DB/database";
import { signUpSchema, SignUpFormData } from '@/zod/auth/auth';
import { router } from 'expo-router';

const RegistrationPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', pin: '' }
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const db = await ConnectionDB();
      await db.executeSql(
        `INSERT INTO Users (name, email, password, pin) VALUES (?, ?, ?, ?)`,
        [data.name, data.email, data.password, parseInt(data.pin)]
      );
      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "Email already exists or database error.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#0a1a1a]">
      <View className="items-center flex-1 p-6">
        
        {/* Header Section */}
        <View className="items-center mt-12 mb-8">
          <View className="w-16 h-16 bg-[#1a2e2e] rounded-full items-center justify-center mb-4">
            <Text className="text-3xl">🔥</Text>
          </View>
          <Text className="text-gray-400 text-[10px] font-bold tracking-[2px] uppercase mb-1">
            Track. Achieve. Repeat.
          </Text>
          <Text className="text-3xl font-bold text-white">Create Account</Text>
          <Text className="text-gray-400 text-center mt-2 max-w-[250px]">
            Join your offline-first productivity space.
          </Text>
        </View>

        {/* Form Section */}
        <View className="w-full max-w-sm">
          
          {/* Name Field */}
          <Text className="mb-1 ml-1 text-sm text-gray-300">Full Name</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-[#162929] border ${errors.name ? 'border-red-400' : 'border-[#2a4545]'} rounded-2xl p-4 text-white mb-3 focus:border-[#00ffa3]`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="John Doe"
                placeholderTextColor="#4a5d5d"
              />
            )}
          />
          {errors.name && <Text className="mb-2 ml-1 text-xs text-red-400">{errors.name.message}</Text>}

          {/* Email Field */}
          <Text className="mb-1 ml-1 text-sm text-gray-300">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-[#162929] border ${errors.email ? 'border-red-400' : 'border-[#2a4545]'} rounded-2xl p-4 text-white mb-3 focus:border-[#00ffa3]`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="name@example.com"
                placeholderTextColor="#4a5d5d"
              />
            )}
          />
          {errors.email && <Text className="mb-2 ml-1 text-xs text-red-400">{errors.email.message}</Text>}

          <View className="flex-row mb-3 space-x-4">
            {/* Password Field */}
            <View className="flex-1">
              <Text className="mb-1 ml-1 text-sm text-gray-300">Password</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`bg-[#162929] border ${errors.password ? 'border-red-400' : 'border-[#2a4545]'} rounded-2xl p-4 text-white focus:border-[#00ffa3]`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    placeholder="********"
                    placeholderTextColor="#4a5d5d"
                  />
                )}
              />
            </View>

            {/* PIN Field */}
            <View className="w-24">
              <Text className="mb-1 ml-1 text-sm text-center text-gray-300">PIN</Text>
              <Controller
                control={control}
                name="pin"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`bg-[#162929] border ${errors.pin ? 'border-red-400' : 'border-[#2a4545]'} rounded-2xl p-4 text-white text-center focus:border-[#00ffa3]`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                    maxLength={4}
                    placeholder="0000"
                    placeholderTextColor="#4a5d5d"
                  />
                )}
              />
            </View>
          </View>
          {(errors.password || errors.pin) && (
            <Text className="mb-2 ml-1 text-xs text-red-400">
              {errors.password?.message || errors.pin?.message}
            </Text>
          )}

          {/* Submit Button */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-[#00c2a0] rounded-2xl py-5 mt-4 items-center shadow-lg shadow-[#00c2a0]/40"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#0a1a1a" />
            ) : (
              <Text className="text-[#0a1a1a] font-bold text-lg">Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <TouchableOpacity className="flex-row mt-8" onPress={()=> router.push('/(auth)/login')}>
          <Text className="text-gray-400">Already have an account? </Text>
          <Text className="text-[#00ffa3] font-bold">Sign In</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default RegistrationPage;