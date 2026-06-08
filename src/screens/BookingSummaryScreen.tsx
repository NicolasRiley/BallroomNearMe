import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { venues } from '../data/venues'

const DEFAULT_HOURS = 4

export default function BookingSummaryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute<any>()
  const { venueId, date } = route.params
  const venue = venues.find(v => v.id === venueId)

  if (!venue) return null

  const subtotal = venue.pricePerHour * DEFAULT_HOURS
  const serviceFee = Math.round(subtotal * 0.12)
  const total = subtotal + serviceFee

  const handleConfirm = () => {
    Alert.alert(
      'Request sent!',
      `Your booking request for ${venue.name} on ${date} has been sent. The host will respond within ${venue.responseTime.toLowerCase().replace('usually responds ', '')}.`,
      [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Booking summary</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.venueName}>{venue.name}</Text>
          <Text style={styles.venueArea}>{venue.area}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Date</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <Text style={styles.value}>{DEFAULT_HOURS} hours</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price breakdown</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>£{venue.pricePerHour}/hr {DEFAULT_HOURS} hrs</Text>
            <Text style={styles.priceValue}>£{subtotal}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service fee (12%)</Text>
            <Text style={styles.priceValue}>£{serviceFee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>£{total}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Send booking request</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#1a1a2e',
    lineHeight: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  venueName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  venueArea: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 15,
    color: '#1a1a2e',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#444',
  },
  priceValue: {
    fontSize: 14,
    color: '#444',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#c1603a',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})