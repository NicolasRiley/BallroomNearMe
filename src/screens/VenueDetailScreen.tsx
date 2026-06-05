import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { venues } from '../data/venues'
import { useSavedVenues } from '../hooks/useSavedVenues'
import SafetyBadge from '../components/SafetyBadge'
import SafetyModal from '../components/SafetyModal'

export default function VenueDetailScreen() {
  const navigation = useNavigation()
  const route = useRoute<any>()
  const venue = venues.find(v => v.id === route.params?.venueId)
  const [safetyVisible, setSafetyVisible] = useState(false)
  const { isSaved, toggleSaved } = useSavedVenues()

  if (!venue) {
    return (
     <View style={styles.notFound}>
        <Text>Venue not found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.imageArea}>
        {venue.images[0] ? (
          <Image source={venue.images[0]} style={styles.image} resizeMode="cover" />
        ) : (
          <Text style={styles.imagePlaceholderText}>📍 {venue.area}</Text>
        )}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => toggleSaved(venue.id)}>
          <Text style={styles.saveButtonText}>{isSaved(venue.id) ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollArea}>
        <View style={styles.content}>
          <Text style={styles.name}>{venue.name}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.rating}>⭐ {venue.rating} ({venue.reviewCount} reviews)</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>👤 Up to {venue.capacity}</Text>
            <Text style={styles.metaItem}>£ From £{venue.pricePerHour}/hr</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>🕐 {venue.responseTime}</Text>
          </View>

          <SafetyBadge safety={venue.safety} onPress={() => setSafetyVisible(true)} />

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About this space</Text>
          <Text style={styles.description}>{venue.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.tagsContainer}>
            {venue.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {venue.isLgbtqVerified && (
            <View style={styles.lgbtqBadge}>
              <Text style={styles.lgbtqBadgeText}>✓ LGBTQ+ verified space</Text>
            </View>
          )}

          <View style={styles.suitableRow}>
            <Text style={styles.sectionTitle}>Suitable for</Text>
            <View style={styles.tagsContainer}>
              {venue.suitableFor.map(type => (
                <View key={type} style={styles.suitableTag}>
                  <Text style={styles.suitableTagText}>{type}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Request to book</Text>
        </TouchableOpacity>
      </View>

      <SafetyModal
        safety={venue.safety}
        visible={safetyVisible}
        onClose={() => setSafetyVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageArea: {
    height: 260,
    backgroundColor: '#f5f0ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#c1603a',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#1a1a2e',
    lineHeight: 28,
  },
  saveButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#1a1a2e',
  },
  scrollArea: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaItem: {
    fontSize: 14,
    color: '#444',
    marginRight: 16,
  },
  rating: {
    fontSize: 14,
    color: '#444',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  tagText: {
    fontSize: 13,
    color: '#444',
  },
  lgbtqBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fdf0ec',
    alignSelf: 'flex-start',
  },
  lgbtqBadgeText: {
    fontSize: 13,
    color: '#c1603a',
    fontWeight: '600',
  },
  suitableRow: {
    marginTop: 16,
  },
  suitableTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#fdf0ec',
  },
  suitableTagText: {
    fontSize: 13,
    color: '#c1603a',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  bookButton: {
    backgroundColor: '#c1603a',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
  width: '100%',
  height: '100%',
  },
})