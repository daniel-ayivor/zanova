import { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const discountBanners = [
  {
    id: '1',
    title: 'Get 50% OFF',
    subtitle: 'Summer Collection',
    description: 'On all furniture items',
    buttonText: 'Shop Now',
    backgroundColor: '#374151',
    accentColor: '#F59E0B',
    icon: 'flash-outline' as const,
  },
  {
    id: '2',
    title: 'Free Shipping',
    subtitle: 'Limited Time',
    description: 'On orders over $100',
    buttonText: 'Learn More',
    backgroundColor: '#059669',
    accentColor: '#34D399',
    icon: 'rocket-outline' as const,
  },
  {
    id: '3',
    title: 'New Arrivals',
    subtitle: 'Just In',
    description: 'Fresh styles for your home',
    buttonText: 'Explore',
    backgroundColor: '#7C3AED',
    accentColor: '#A78BFA',
    icon: 'star-outline' as const,
  },
  {
    id: '4',
    title: 'Member Deal',
    subtitle: 'Exclusive',
    description: 'Extra 20% for members',
    buttonText: 'Join Now',
    backgroundColor: '#DC2626',
    accentColor: '#FCA5A5',
    icon: 'heart-outline' as const,
  }
];

interface DiscountBannerProps {
  autoRotate?: boolean;
  rotationInterval?: number;
  onBannerPress?: (banner: typeof discountBanners[0]) => void;
}

export default function DiscountBanner({ 
  autoRotate = true, 
  rotationInterval = 5000,
  onBannerPress 
}: DiscountBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Auto-rotate every 5 seconds (or custom interval)
  useEffect(() => {
    if (autoRotate) {
      startAutoRotate();
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoRotate, currentIndex]);

  const startAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % discountBanners.length;
      setCurrentIndex(nextIndex);
    }, rotationInterval) as unknown as number;
  };

  const handleBannerPress = (index: number) => {
    setCurrentIndex(index);
    if (onBannerPress) {
      onBannerPress(discountBanners[index]);
    }
    // Reset timer on manual press
    if (autoRotate) {
      startAutoRotate();
    }
  };

  const currentBanner = discountBanners[currentIndex];

  return (
    <View style={{ marginBottom: 16 }}>
      {/* Banner Container */}
      <TouchableOpacity 
        onPress={() => handleBannerPress(currentIndex)}
        activeOpacity={0.9}
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 5,
        }}
      >
        <View style={{ 
          backgroundColor: currentBanner.backgroundColor,
          borderRadius: 20,
          padding: 24,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              {/* Badge */}
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 20,
                  alignSelf: 'flex-start',
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>
                  {currentBanner.subtitle}
                </Text>
              </View>
              
              {/* Main Title */}
              <Text style={{ color: '#FFF', fontSize: 32, fontWeight: 'bold', marginBottom: 4 }}>
                {currentBanner.title}
              </Text>
              
              {/* Description */}
              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600', marginBottom: 16, opacity: 0.9 }}>
                {currentBanner.description}
              </Text>
              
              {/* Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFF',
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
                onPress={(e) => {
                  e.stopPropagation(); // Prevent triggering the main banner press
                  if (onBannerPress) {
                    onBannerPress(currentBanner);
                  }
                }}
              >
                <Ionicons name={currentBanner.icon} size={18} color={currentBanner.backgroundColor} />
                <Text style={{ color: currentBanner.backgroundColor, fontSize: 14, fontWeight: '600' }}>
                  {currentBanner.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Right Icon */}
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 22,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 16,
              }}
              onPress={(e) => {
                e.stopPropagation(); // Prevent triggering the main banner press
                // Handle favorite action here
                console.log('Favorite pressed for:', currentBanner.title);
              }}
            >
              <Ionicons name="heart-outline" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {/* Indicator Dots */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16, gap: 8 }}>
        {discountBanners.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBannerPress(index)}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === currentIndex ? currentBanner.accentColor : 'rgba(0,0,0,0.2)',
            }}
          />
        ))}
      </View>
    </View>
  );
}