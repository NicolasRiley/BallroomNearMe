import SafetyBadge from '../components/SafetyBadge'
import SafetyModal from '../components/SafetyModal'
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { venues } from '../data/venues'
import { Venue, EventType, VenueSize } from '../types'

const FILTERS: Record<EventType, string[]> = {
  'Ball': ['Intimate', 'Medium-Size', 'Large'],
  'Vogue Class': ['Accessible', 'Sound system', 'All-gender bathrooms'],
  'Kiki Lounge': ['Accessible', 'Sound system', 'All-gender bathrooms'],
}

export default function VenueListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute<any>()
  const eventType: EventType = route.params?.eventType

  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeSafetyVenue, setActiveSafetyVenue] = useState<Venue | null>(null)

  const filtered = venues
    .filter(v => v.suitableFor.includes(eventType))
    .sort((a, b) => {
      if (!activeFilter) return 0
      const aMatches = eventType === 'Ball'
        ? a.size === activeFilter
        : a.tags.includes(activeFilter)
      const bMatches = eventType === 'Ball'
        ? b.size === activeFilter
        : b.tags.includes(activeFilter)
      if (aMatches && !bMatches) return -1
      if (!aMatches && bMatches) return 1
      return 0
    })

  const renderVenue = ({ item }: { item: Venue }) => {
    const isHighlighted = activeFilter && (
      eventType === 'Ball'
        ? item.size === activeFilter
        : item.tags.includes(activeFilter)
    )


  return (
    <View style={[styles.card, isHighlighted && styles.cardHighlighted]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('VenueDetail', { venueId: item.id })}
      >
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>📍 {item.area}</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.venueName}>{item.name}</Text>
            <Text style={styles.capacity}>Up to {item.capacity}</Text>
          </View>
          <Text style={styles.area}>{item.area}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.rating}>⭐ {item.rating} ({item.reviewCount})</Text>
            <Text style={styles.price}>From £{item.pricePerHour}/hr</Text>
          </View>
          {item.isSaved && <Text style={styles.saved}>♥ Saved</Text>}
          <View style={styles.tagRow}>
            {item.tags.slice(0, 3).map(tag => (
              <View
                key={tag}
                style={[styles.tag, activeFilter === tag && styles.tagActive]}
              >
                <Text style={[styles.tagText, activeFilter === tag && styles.tagTextActive]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.safetyRow}>
        <SafetyBadge 
          safety={item.safety} 
          onPress={() => setActiveSafetyVenue(item)} 
        />
      </View>
    </View>
  )
}

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
        >
          {FILTERS[eventType]?.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(activeFilter === filter ? null : filter)}
            >
              <Text style={[styles.filterChipText, activeFilter === filter && styles.filterChipTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate('VenueMap', { eventType })}
        >
          <Text style={styles.mapButtonText}>🗺 Map</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderVenue}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No venues found for {eventType}</Text>
        }
      />
      {activeSafetyVenue && (
        <SafetyModal
          safety={activeSafetyVenue.safety}
          visible={!!activeSafetyVenue}
          onClose={() => setActiveSafetyVenue(null)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterRow: {
    paddingVertical: 12,
    flex: 1,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterChipActive: {
    backgroundColor: '#c1603a',
  },
  filterChipText: {
    fontSize: 13,
    color: '#444',
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardHighlighted: {
    borderColor: '#c1603a',
    borderWidth: 2,
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: '#f5f0ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#c1603a',
    fontSize: 16,
  },
  cardBody: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  capacity: {
    fontSize: 13,
    color: '#666',
  },
  area: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#444',
  },
  price: {
    fontSize: 14,
    color: '#444',
  },
  saved: {
    fontSize: 14,
    color: '#c1603a',
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  tagActive: {
    backgroundColor: '#c1603a',
  },
  tagText: {
    fontSize: 12,
    color: '#444',
  },
  tagTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  mapButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a2e',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
    color: '#666',
  },
  safetyRow: {
  paddingHorizontal: 16,
  paddingBottom: 14,
  },
})