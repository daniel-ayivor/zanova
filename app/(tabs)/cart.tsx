import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wing Chair',
      price: 350,
      quantity: 1,
      shipping: 'Free Shipping',
    },
    {
      id: 2,
      name: 'Madison Wing',
      price: 410,
      quantity: 1,
      shipping: 'Free Shipping',
    },
    {
      id: 3,
      name: 'Madison Park',
      price: 450,
      quantity: 1,
      shipping: 'Free Shipping',
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id:number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 0;
  const total = itemTotal + shippingFee;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f1ed" />
      <View style={styles.wrapper}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Cart</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Cart Items */}
          <ScrollView 
            style={styles.cartItems}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemImage}>
                  <Text style={styles.itemImageEmoji}>🪑</Text>
                </View>

                <View style={styles.itemDetails}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeItem(item.id)}
                      style={styles.removeButton}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.shippingText}>{item.shipping}</Text>

                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>
                      ${item.price * item.quantity}
                    </Text>

                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, -1)}
                        style={styles.quantityButton}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>{item.quantity}</Text>

                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, 1)}
                        style={[styles.quantityButton, styles.quantityButtonActive]}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.quantityButtonTextActive}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Amount Summary */}
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Amount</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Item total</Text>
              <Text style={styles.summaryValue}>${itemTotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping fee</Text>
              <Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity 
            style={styles.checkoutButton}
            activeOpacity={0.9}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1ed',
  },
  wrapper: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
    fontWeight: '400',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
  },
  cartItems: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImageEmoji: {
    fontSize: 40,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  removeButtonText: {
    fontSize: 22,
    color: '#999',
    fontWeight: '300',
  },
  shippingText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  quantityButtonActive: {
    backgroundColor: '#8B6F4E',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '400',
  },
  quantityButtonTextActive: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  summary: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#8B6F4E',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B6F4E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});