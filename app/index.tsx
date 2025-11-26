import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/auth/login');
  };

  const handleBrowseAsGuest = () => {
    router.push('/home');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80' }}
      className="flex-1"
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <SafeAreaView className="flex-1">
        {/* Overlay */}
        <View className="absolute inset-0 bg-black/40" />
        
        <View className="flex-1 px-6 pt-10 pb-6 justify-between">
          {/* Hero Section */}
          <View className="mt-10">
            <View className="bg-white/90 self-start px-4 py-2 rounded-full mb-6 shadow-lg">
              <Text className="text-amber-900 text-sm font-semibold">🪑 Premium Furniture</Text>
            </View>
            
            <Text className="text-white mt-96 text-4xl font-bold leading-tight">
              Furnish Your{'\n'}
              Space With Style
            </Text>
            
            <Text className="text-white/90 text-base mt-4 leading-6">
              Explore modern furniture crafted for comfort,{'\n'}
              beauty, and everyday living.
            </Text>
          </View>

     

          {/* CTA Section */}
          <View className="mb-4">
            <TouchableOpacity
              className="bg-amber-900 rounded-3xl py-5 px-8 flex-row items-center justify-center mb-4 shadow-2xl shadow-amber-900/50"
              onPress={handleStart}
              activeOpacity={0.9}
            >
              <Text className="text-white text-lg font-bold mr-2">Get Started</Text>
              <Text className="text-white text-xl font-bold">→</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="items-center py-3"
              onPress={handleBrowseAsGuest}
            >
              <Text className="text-white/90 text-base font-semibold">Browse as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Decorative Elements */}
        <View className="absolute w-48 h-48 rounded-full bg-amber-900/10 -top-12 -right-12" />
        <View className="absolute w-36 h-36 rounded-full bg-amber-900/10 bottom-32 -left-10" />
      </SafeAreaView>
    </ImageBackground>
  );
}