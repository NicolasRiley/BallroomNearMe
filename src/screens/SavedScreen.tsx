import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSavedVenues } from '../hooks/useSavedVenues'
import { venues } from '../data/venues'

export default function SavedScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { savedVenues } = useSavedVenues()

  const savedList = venues.filter(v => savedVenues.has(v.id))

  return (
    <View style={styles.container}>
      <FlatList
        data={savedList}
        keyExtractor={item => item.id}
        contentContainerStyle={savedList.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No saved venues yet</Text>
            <Text style={styles.emptySub}>
              Tap the heart on any venue to save it for later.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Search', {
              screen: 'VenueDetail',
              params: { venueId: item.id },
            })}
          >
            <View style={styles.imagePlaceholder}>
              {item.images[0] ? (
                <Image source={item.images[0]} style={styles.cardImage} resizeMode="cover" />
              ) : (
                <Text style={styles.imagePlaceholderText}>📍 {item.area}</Text>
              )}
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.venueName}>{item.name}</Text>
              <Text style={styles.area}>{item.area}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.rating}>⭐ {item.rating} ({item.reviewCount})</Text>
                <Text style={styles.price}>From £{item.pricePerHour}/hr</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
  },
  list: {
    padding: 16,
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 120,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: '#f5f0ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholderText: {
    color: '#c1603a',
    fontSize: 16,
  },
  cardBody: {
    padding: 16,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  area: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 14,
    color: '#444',
  },
  price: {
    fontSize: 14,
    color: '#444',
  },
})