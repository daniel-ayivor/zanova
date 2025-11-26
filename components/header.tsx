// components/Header.tsx
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onCartPress?: () => void;
  onWishlistPress?: () => void;
  onSearchChange?: (text: string) => void;
  onSearchSubmit?: (text: string) => void;
  onSearchPress?: () => void;
  cartCount?: number;
  wishlistCount?: number;
  showSearch?: boolean;
}

export default function HeaderScreen({
  title = "Zanova Bloar",
  subtitle = "Find your perfect furniture",
  onCartPress,
  onWishlistPress,
  onSearchChange,
  onSearchSubmit,
  onSearchPress,
  cartCount = 0,
  wishlistCount = 0,
  showSearch = true
}: HeaderProps) {
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    if (onSearchChange) {
      onSearchChange(text);
    }
  };

  const handleSearchSubmit = () => {
    if (onSearchSubmit) {
      onSearchSubmit(searchText);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (onSearchPress) {
      onSearchPress();
    }
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  // Remove the TouchableOpacity wrapper and handle search container press separately
  const handleSearchContainerPress = () => {
    // This will be called when the search container is pressed
    // but the TextInput should still get focus automatically
    if (onSearchPress) {
      onSearchPress();
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Row - Title and Icons */}
      <View style={styles.topRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        
        <View style={styles.iconsContainer}>
          {/* Wishlist Icon */}
          <TouchableOpacity
            onPress={onWishlistPress}
            style={styles.iconButton}
          >
            <Ionicons name="heart-outline" size={22} color="#6b7280" />
            {/* Wishlist Badge - Only show if count > 0 */}
            {wishlistCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Cart Icon */}
          <TouchableOpacity
            onPress={onCartPress}
            style={styles.iconButton}
          >
            <Ionicons name="cart-outline" size={22} color="#6b7280" />
            {/* Cart Badge - Only show if count > 0 */}
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartCount > 9 ? '9+' : cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar - Conditionally rendered */}
      {showSearch && (
        <View 
          style={[
            styles.searchContainer,
            isSearchFocused && styles.searchContainerFocused
          ]}
          // Remove onPress from here as it interferes with TextInput focus
        >
          <Ionicons 
            name="search-outline" 
            size={20} 
            color={isSearchFocused ? '#0d9488' : '#9ca3af'} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearchSubmit}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            returnKeyType="search"
            clearButtonMode="while-editing"
            autoCorrect={false}
            autoCapitalize="none"
            // Ensure the TextInput is properly focusable
            editable={true}
            selectTextOnFocus={true}
          />
          {searchText.length > 0 && (
            <TouchableOpacity 
              onPress={() => handleSearchChange('')}
              style={styles.clearButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
    fontWeight: '500',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  searchContainerFocused: {
    backgroundColor: '#ffffff',
    borderColor: '#0d9488',
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
    padding: 0,
    margin: 0,
    // Ensure proper touch handling
    minHeight: 20,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
});