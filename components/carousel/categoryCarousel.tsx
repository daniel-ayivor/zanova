// components/CategoryCarousel.tsx
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  {
    id: '1',
    name: 'Clothing',
    icon: 'shirt-outline',
    color: '#ec4899' // pink-500
  },
  {
    id: '2',
    name: 'Foodstuffs',
    icon: 'fast-food-outline',
    color: '#22c55e' // green-500
  },
  {
    id: '3',
    name: 'Cleaning',
    icon: 'sparkles-outline',
    color: '#3b82f6' // blue-500
  },
  {
    id: '4',
    name: 'Electronics',
    icon: 'phone-portrait-outline',
    color: '#8b5cf6' // violet-500
  },
  {
    id: '6',
    name: 'Beauty',
    icon: 'sparkles-outline',
    color: '#ef4444' // red-500
  }
];

interface CategoryCarouselProps {
  onCategoryPress?: (category: typeof categories[0]) => void;
  title?: string;
}

export default function CategoryCarousel({ 
  onCategoryPress,
  title = "Categories"
}: CategoryCarouselProps) {
  const handlePress = (category: typeof categories[0]) => {
    if (onCategoryPress) {
      onCategoryPress(category);
    }
  };

  return (
    <View className="mb-6">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-4 px-4">
        <Text className="text-xl font-bold text-gray-800">{title}</Text>
        <TouchableOpacity>
          <Text className="text-blue-600 font-medium">See all</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Scroll */}
      <ScrollView 
     horizontal
        className=' flex rounded-full px-16 gap-8'
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handlePress(category)}
            className="bg-white rounded-xl shadow-sm px-4 py-3 items-center min-w-[80px] border border-gray-100"
            activeOpacity={0.7}
          >
            {/* Icon */}
            <View 
              className="w-12 h-12 rounded-full items-center justify-center mb-2"
              style={{ backgroundColor: `${category.color}20` }} // 20 = 12% opacity
            >
              <Ionicons 
                name={category.icon as any} 
                size={24} 
                color={category.color} 
              />
            </View>
            
            {/* Category Name */}
            <Text className="text-gray-700 text-sm font-medium text-center">
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}