import HeaderScreen from "@/components/header";
import { Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Product, products } from "./home";
import { router } from "expo-router";

const { width } = Dimensions.get('window');

// Mock product data
// const products = [
//   {
//     id: 1,
//     name: 'Modern Wooden Chair',
//     price: 129.99,
//     image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
//     rating: 4.5,
//     category: 'chairs'
//   },
//   {
//     id: 2,
//     name: 'Minimalist Table',
//     price: 199.99,
//     image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=400&q=80',
//     rating: 4.8,
//     category: 'tables'
//   },
//   {
//     id: 3,
//     name: 'Comfortable Sofa',
//     price: 599.99,
//     image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
//     rating: 4.7,
//     category: 'sofas'
//   },
//   {
//     id: 4,
//     name: 'Storage Cabinet',
//     price: 299.99,
//     image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&q=80',
//     rating: 4.6,
//     category: 'storage'
//   },
// ];

export default function ProductScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Handle search functionality
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    
    if (text === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(text.toLowerCase()) ||
        product.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearchSubmit = (text: string) => {
    console.log('Search submitted:', text);
  };

  const handleSearchPress = () => {
    console.log('Search bar pressed');
  };

  const handleCartPress = () => {
    console.log('Cart pressed');
  };

  const handleWishlistPress = () => {
    console.log('Wishlist pressed');
  };

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product.id);
    router.push({
      pathname: '/productdetails',
      params: { productId: product.id.toString() } // Pass only the ID
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      {/* Header with Search */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
        <HeaderScreen 
          title="Products"
          subtitle="Browse all items"
          onCartPress={handleCartPress}
          onWishlistPress={handleWishlistPress}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchPress={handleSearchPress}
          cartCount={2}
          wishlistCount={5}
          showSearch={true}
        />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
          {/* Results Header */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 8 }}>
              {searchQuery ? `Search Results` : 'All Products'}
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              {searchQuery ? 
                `Found ${filteredProducts.length} products for "${searchQuery}"` : 
                `${products.length} products available`
              }
            </Text>
          </View>

          {/* Products Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between' }}>
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => handleProductClick(product)}
                style={{
                  width: (width - 56) / 2,
                  backgroundColor: '#FFF',
                  borderRadius: 16,
                  marginBottom: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
                activeOpacity={0.7}
              >
                {/* Product Image */}
                <View
                  style={{
                    width: '100%',
                    height: 150,
                    backgroundColor: '#F3F4F6',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                </View>

                {/* Product Info */}
                <View style={{ padding: 12 }}>
                  <Text 
                    style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 }}
                    numberOfLines={1}
                  >
                    {product.name}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="star" size={14} color="#FBBF24" />
                    <Text style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}>
                      {product.rating}
                    </Text>
                  </View>

                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                    ${product.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <Ionicons name="search-outline" size={64} color="#D1D5DB" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#6B7280', marginTop: 16 }}>
                No products found
              </Text>
              <Text style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', marginTop: 8 }}>
                Try adjusting your search terms
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}