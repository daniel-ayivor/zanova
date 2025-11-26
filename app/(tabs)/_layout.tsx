// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme, View } from 'react-native';
import "../../global.css"

export default function RadioTabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#155e75', // Teal-800
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#FFFF' : '#FFFFFF',
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <View className="items-center">
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={focused ? size + 2 : size}
                color={focused ? '#155e75' : '#6B7280'}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="product"
        options={{
          title: 'Products',
          tabBarIcon: ({ focused, size }) => (
            <View className="items-center relative">
              <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
                size={focused ? size + 2 : size}
                color={focused ? '#155e75' : '#6B7280'}
              />
              {focused && (
                <View className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-800 border border-white dark:border-gray-800" />
              )}
            </View>
          ),
        }}
      />
     
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused, size }) => (
            <View className="items-center relative">
              <Ionicons
                name={focused ? 'cart' : 'cart-outline'}
                size={focused ? size + 2 : size}
                color={focused ? '#155e75' : '#6B7280'}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ focused, size }) => (
            <View className="items-center">
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={focused ? size + 2 : size}
                color={focused ? '#155e75' : '#6B7280'}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, size }) => (
            <View className="items-center">
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={focused ? size + 2 : size}
                color={focused ? '#155e75' : '#6B7280'}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}