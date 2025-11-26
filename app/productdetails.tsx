import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Product, products } from './(tabs)/home';
// import { products, Product } from './home';

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [productData, setProductData] = useState<Product| null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  console.log('All params:', params);
  console.log('ProductId param:', params.productId);

  useEffect(() => {
    if (params.productId) {
      const productId = Number(params.productId);
      console.log('Looking for product with ID:', productId);
      
      // Find product by ID in your products array
      const foundProduct = products.find(p => p.id === productId);
      console.log('Found product:', foundProduct);
      
      if (foundProduct) {
        setProductData(foundProduct);
        setSelectedColor(foundProduct.colors[0]);
      }
    }
  }, [params.productId]);

  if (!productData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading product...</Text>
          <Text style={{ marginTop: 10, color: '#666', fontSize: 12 }}>
            Product ID: {params.productId}
          </Text>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={{ marginTop: 20, padding: 10, backgroundColor: '#F3F4F6', borderRadius: 8 }}
          >
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ... rest of your component remains the same, using productData
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 42,
              height: 42,
              backgroundColor: '#F3F4F6',
              borderRadius: 21,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 42,
              height: 42,
              backgroundColor: '#F3F4F6',
              borderRadius: 21,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="heart-outline" size={22} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={{ paddingVertical: 20, backgroundColor: '#F9FAFB', marginHorizontal: 20, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 24, overflow: 'hidden' }}>
          <Image
            source={{ uri: productData.image }}
            style={{ width: '90%', height: 300, resizeMode: 'contain' }}
          />
        </View>

        {/* Product Info */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#111827', marginBottom: 8 }}>
                {productData.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="star" size={16} color="#FBBF24" />
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}>
                    {productData.rating}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: '#6B7280' }}>({productData.reviews} reviews)</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#111827' }}>
                ${productData.price}
              </Text>
              {productData.oldPrice && (
                <Text style={{ fontSize: 16, color: '#9CA3AF', textDecorationLine: 'line-through' }}>
                  ${productData.oldPrice}
                </Text>
              )}
            </View>
          </View>

          {/* Description */}
          <View style={{ marginTop: 20, marginBottom: 24 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 8 }}>
              Description
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 22 }}>
              {productData.description}
            </Text>
          </View>

          {/* Color Selection */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
              Color
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {productData.colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: color,
                    borderWidth: 3,
                    borderColor: selectedColor === color ? '#111827' : 'transparent',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                />
              ))}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
              Quantity
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: '#F3F4F6',
                  borderRadius: 22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="remove" size={20} color="#111827" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: '600', minWidth: 30, textAlign: 'center' }}>
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: '#F3F4F6',
                  borderRadius: 22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="add" size={20} color="#111827" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stock Status */}
          <View style={{ marginBottom: 100 }}>
            {productData.inStock ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 8, height: 8, backgroundColor: '#10B981', borderRadius: 4 }} />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#10B981' }}>In Stock</Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 8, height: 8, backgroundColor: '#EF4444', borderRadius: 4 }} />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#EF4444' }}>Out of Stock</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#F3F4F6' }}>
        <TouchableOpacity
          disabled={!productData.inStock}
          style={{
            backgroundColor: productData.inStock ? '#111827' : '#D1D5DB',
            paddingVertical: 18,
            borderRadius: 16,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: productData.inStock ? 0.2 : 0,
            shadowRadius: 8,
            elevation: productData.inStock ? 4 : 0,
          }}
          activeOpacity={0.8}
        >
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
            {productData.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}