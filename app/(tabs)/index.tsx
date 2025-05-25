import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface SportCategory {
  id: string;
  name: string;
  icon: string;
}

interface PopularVenue {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sportCategories: SportCategory[] = [
    { id: 'futsal', name: 'Futsal', icon: 'football' },
    { id: 'cricket', name: 'Cricket', icon: 'baseball' },
    { id: 'padel', name: 'Padel', icon: 'tennisball' },
  ];

  const popularVenues: PopularVenue[] = [
    {
      id: '1',
      name: 'Elite Futsal Arena',
      type: 'Futsal',
      rating: 4.8,
      price: 'Rs 2,500/hr',
    },
    {
      id: '2',
      name: 'Cricket Central',
      type: 'Indoor Cricket',
      rating: 4.6,
      price: 'Rs 3,000/hr',
    },
    {
      id: '3',
      name: 'Padel Pro Club',
      type: 'Padel',
      rating: 4.9,
      price: 'Rs 2,000/hr',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>Semarang, Indonesia</Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={20} color="#666" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Find Venue Here..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.rentButton]}>
            <Ionicons name="calendar" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Book Venue</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.buyButton]}>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>List Venue</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.sellButton]}>
            <Ionicons name="star" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>My Bookings</Text>
          </TouchableOpacity>
        </View>

        {/* Sports Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Search by Sports</Text>
            <TouchableOpacity>
              <Text style={styles.learnMore}>Learn More</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.categoriesContainer}>
            {sportCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View style={styles.categoryIcon}>
                  <Ionicons 
                    name={category.icon as any} 
                    size={24} 
                    color={selectedCategory === category.id ? "#fff" : "#333"} 
                  />
                </View>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Venues */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Popular Venues</Text>
            <TouchableOpacity>
              <Text style={styles.learnMore}>Learn More</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.venuesScroll}>
            {popularVenues.map((venue) => (
              <TouchableOpacity key={venue.id} style={styles.venueCard}>
                <View style={styles.venueImageContainer}>
                  <View style={styles.venuePlaceholderImage}>
                    <Ionicons name="image" size={40} color="#ccc" />
                  </View>
                </View>
                <View style={styles.venueInfo}>
                  <Text style={styles.venueName}>{venue.name}</Text>
                  <Text style={styles.venueType}>{venue.type}</Text>
                  <View style={styles.venueDetails}>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text style={styles.rating}>{venue.rating}</Text>
                    </View>
                    <Text style={styles.price}>{venue.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  profileButton: {
    padding: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#4285F4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  rentButton: {
    backgroundColor: '#4285F4',
  },
  buyButton: {
    backgroundColor: '#000',
  },
  sellButton: {
    backgroundColor: '#666',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  learnMore: {
    fontSize: 14,
    color: '#666',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    minWidth: 80,
  },
  selectedCategory: {
    backgroundColor: '#000',
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  venuesScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  venueCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  venueImageContainer: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  venuePlaceholderImage: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  venueInfo: {
    padding: 12,
  },
  venueName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  venueType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  venueDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  price: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
});