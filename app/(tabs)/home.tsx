import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import DiscountBanner from '@/components/carousel/herobanner';
import HeaderScreen from '@/components/header';

const { width } = Dimensions.get('window');

export type Category = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  colors: string[];
  inStock: boolean;
  image: string;
};

export const categories: Category[] = [
  { id: 'all', name: 'All', icon: 'home-outline' },
  { id: 'chairs', name: 'Chairs', icon: 'cafe-outline' },
  { id: 'tables', name: 'Tables', icon: 'grid-outline' },
  { id: 'sofas', name: 'Sofas', icon: 'bed-outline' },
  { id: 'storage', name: 'Storage', icon: 'gift' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Wardrobe Aneboda',
    price: 30.99,
    oldPrice: 45.99,
    rating: 4.8,
    reviews: 124,
    category: 'chairs',
    description: 'A modern wardrobe chair featuring a cushy curved back and thick padding. Perfect for contemporary apartments and offices.',
    colors: ['#FCD34D', '#1F2937', '#EF4444', '#3B82F6'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
  },
  {
    id: 2,
    name: 'Kastoria',
    price: 90.00,
    rating: 4.6,
    reviews: 89,
    category: 'chairs',
    description: 'Elegant minimalist stool with wooden legs and comfortable cushioned seat.',
    colors: ['#FCD34D', '#D1D5DB', '#6B7280'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80',
  },
  {
    id: 3,
    name: 'Promi',
    price: 130.00,
    rating: 4.9,
    reviews: 203,
    category: 'sofas',
    description: 'Cozy accent chair with plush cushioning and contemporary design.',
    colors: ['#FCD34D', '#10B981', '#8B5CF6'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
  },
  {
    id: 4,
    name: 'Nordic Table',
    price: 85.00,
    rating: 4.7,
    reviews: 156,
    category: 'tables',
    description: 'Scandinavian-inspired side table with clean lines and natural wood finish.',
    colors: ['#D4A574', '#1F2937', '#F3F4F6'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=400&q=80',
  },
  {
    id: 5,
    name: 'Minimalist Stool',
    price: 65.00,
    rating: 4.5,
    reviews: 67,
    category: 'chairs',
    description: 'Simple yet elegant stool perfect for kitchen islands and bar counters.',
    colors: ['#FCD34D', '#EF4444', '#3B82F6'],
    inStock: false,
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=400&q=80',
  },
  {
    id: 6,
    name: 'Storage Cabinet',
    price: 149.00,
    rating: 4.8,
    reviews: 178,
    category: 'storage',
    description: 'Spacious storage solution with multiple compartments and modern aesthetics.',
    colors: ['#8B7355', '#1F2937', '#F3F4F6'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&q=80',
  },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();
  
  const handleViewAllProductClick = () => {
    console.log('Navigating to products page');
    router.push('/(tabs)/product');
  };

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product.id);
    router.push({
      pathname: '/productdetails',
      params: { productId: product.id.toString() }
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    console.log('Category changed to:', categoryId);
    setActiveCategory(categoryId);
  };

  const filteredProducts = products.filter(
    (product) => activeCategory === 'all' || product.category === activeCategory
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <HeaderScreen />
        </View>

        {/* Discount Banner */}
        <View style={styles.bannerContainer}>
          <DiscountBanner />
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => handleCategoryChange(cat.id)}
                style={[
                  styles.categoryButton,
                  activeCategory === cat.id && styles.categoryButtonActive
                ]}
              >
                <Ionicons
                  name={cat.icon}
                  size={18}
                  color={activeCategory === cat.id ? '#FFF' : '#374151'}
                />
                <Text style={[
                  styles.categoryText,
                  activeCategory === cat.id && styles.categoryTextActive
                ]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity onPress={handleViewAllProductClick}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {filteredProducts.length === 0 ? (
            <Text style={styles.noProductsText}>
              No products found in this category
            </Text>
          ) : (
            <View style={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => handleProductClick(product)}
                  style={styles.productCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                    />
                    <TouchableOpacity style={styles.heartButton}>
                      <Ionicons name="heart-outline" size={16} color="#6B7280" />
                    </TouchableOpacity>
                    {!product.inStock && (
                      <View style={styles.outOfStockBadge}>
                        <Text style={styles.outOfStockText}>Out of stock</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>
                      {product.name}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={12} color="#FBBF24" />
                      <Text style={styles.ratingText}>
                        {product.rating} ({product.reviews})
                      </Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currentPrice}>${product.price}</Text>
                      {product.oldPrice && (
                        <Text style={styles.oldPrice}>
                          ${product.oldPrice}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  categoriesSection: {
    marginTop: 28,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  seeAllText: {
    color: '#0d9488',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryButtonActive: {
    backgroundColor: '#0d9488',
    borderColor: '#0d9488',
    shadowOpacity: 0.2,
    elevation: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  productsSection: {
    paddingHorizontal: 20,
    marginTop: 28,
    paddingBottom: 40,
  },
  noProductsText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 20,
    fontSize: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: (width - 56) / 2,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  outOfStockText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  oldPrice: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
});