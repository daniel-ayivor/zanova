import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample data
  const orders = [
    { id: 1, orderNumber: '#12345', date: '2024-11-20', total: 1210, status: 'Delivered', items: 3 },
    { id: 2, orderNumber: '#12344', date: '2024-11-15', total: 850, status: 'In Transit', items: 2 },
    { id: 3, orderNumber: '#12343', date: '2024-11-10', total: 450, status: 'Processing', items: 1 },
  ];

  const renderProfile = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@email.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>$3,450</Text>
          <Text style={styles.statLabel}>Spent</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionIcon}>📍</Text>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Shipping Address</Text>
            <Text style={styles.optionSubtitle}>Manage your addresses</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionIcon}>💳</Text>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Payment Methods</Text>
            <Text style={styles.optionSubtitle}>Manage payment options</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionIcon}>🔔</Text>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Notifications</Text>
            <Text style={styles.optionSubtitle}>Manage notifications</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionIcon}>❤️</Text>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Wishlist</Text>
            <Text style={styles.optionSubtitle}>View saved items</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionIcon}>⚙️</Text>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Settings</Text>
            <Text style={styles.optionSubtitle}>App preferences</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOrders = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Your Orders</Text>
      {orders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderNumber}>{order.orderNumber}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              order.status === 'Delivered' && styles.statusDelivered,
              order.status === 'In Transit' && styles.statusInTransit,
              order.status === 'Processing' && styles.statusProcessing,
            ]}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>

          <View style={styles.orderDetails}>
            <View style={styles.orderDetailRow}>
              <Text style={styles.orderDetailLabel}>Items:</Text>
              <Text style={styles.orderDetailValue}>{order.items}</Text>
            </View>
            <View style={styles.orderDetailRow}>
              <Text style={styles.orderDetailLabel}>Total:</Text>
              <Text style={styles.orderDetailValue}>${order.total}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderDashboard = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Dashboard</Text>

      {/* Quick Stats */}
      <View style={styles.dashboardGrid}>
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardIcon}>📦</Text>
          <Text style={styles.dashboardValue}>3</Text>
          <Text style={styles.dashboardLabel}>Active Orders</Text>
        </View>

        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardIcon}>✅</Text>
          <Text style={styles.dashboardValue}>9</Text>
          <Text style={styles.dashboardLabel}>Completed</Text>
        </View>

        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardIcon}>💰</Text>
          <Text style={styles.dashboardValue}>$3.4k</Text>
          <Text style={styles.dashboardLabel}>Total Spent</Text>
        </View>

        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardIcon}>⭐</Text>
          <Text style={styles.dashboardValue}>4.8</Text>
          <Text style={styles.dashboardLabel}>Avg Rating</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>Recent Activity</Text>
        
        <View style={styles.activityItem}>
          <View style={styles.activityDot} />
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Order #12345 delivered</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={styles.activityDot} />
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Payment confirmed for order #12344</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={styles.activityDot} />
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Wishlist item now on sale</Text>
            <Text style={styles.activityTime}>2 days ago</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f1ed" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'profile' && styles.tabActive]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabText, activeTab === 'profile' && styles.tabTextActive]}>
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'orders' && styles.tabActive]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.tabText, activeTab === 'orders' && styles.tabTextActive]}>
            Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.tabActive]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={[styles.tabText, activeTab === 'dashboard' && styles.tabTextActive]}>
            Dashboard
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'dashboard' && renderDashboard()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1ed',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#8B6F4E',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#999',
  },
  tabTextActive: {
    color: '#8B6F4E',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },

  // Profile Tab Styles
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8B6F4E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#f5f1ed',
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B6F4E',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
  },
  optionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  optionArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4444',
  },

  // Orders Tab Styles
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDelivered: {
    backgroundColor: '#e8f5e9',
  },
  statusInTransit: {
    backgroundColor: '#e3f2fd',
  },
  statusProcessing: {
    backgroundColor: '#fff3e0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    marginBottom: 12,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  orderDetailLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  orderButton: {
    backgroundColor: '#f5f1ed',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B6F4E',
  },

  // Dashboard Tab Styles
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dashboardCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  dashboardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  dashboardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  dashboardLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B6F4E',
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});