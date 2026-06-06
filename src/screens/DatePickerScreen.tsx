import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { venues } from '../data/venues'

const DATES = [
  { date: 'Mon 9 Jun', available: true },
  { date: 'Tue 10 Jun', available: false, reason: 'Private event' },
  { date: 'Wed 11 Jun', available: true },
  { date: 'Thu 12 Jun', available: true },
  { date: 'Fri 13 Jun', available: false, reason: 'Unavailable' },
  { date: 'Sat 14 Jun', available: true },
  { date: 'Sun 15 Jun', available: true },
  { date: 'Mon 16 Jun', available: false, reason: 'Private event' },
  { date: 'Tue 17 Jun', available: true },
  { date: 'Wed 18 Jun', available: true },
]

export default function DatePickerScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute<any>()
  const venueId = route.params?.venueId
  const venue = venues.find(v => v.id === venueId)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select a date</Text>
      </View>

      <Text style={styles.venueName}>{venue?.name}</Text>

      <ScrollView contentContainerStyle={styles.list}>
        {DATES.map(({ date, available, reason }) => (
          <TouchableOpacity
            key={date}
            style={[styles.dateRow, !available && styles.dateRowUnavailable]}
            onPress={() => {
              if (available) {
                navigation.navigate('BookingSummary', { venueId, date })
              }
            }}
            activeOpacity={available ? 0.7 : 1}
          >
            <View>
              <Text style={[styles.dateText, !available && styles.dateTextUnavailable]}>
                {date}
              </Text>
              {!available && (
                <Text style={styles.reasonText}>{reason}</Text>
              )}
            </View>
            {available ? (
              <Text style={styles.availableLabel}>Available ›</Text>
            ) : (
              <Text style={styles.unavailableLabel}>Unavailable</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  venueName: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 10,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  dateRowUnavailable: {
    backgroundColor: '#f9f9f9',
    borderColor: '#f0f0f0',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  dateTextUnavailable: {
    color: '#999',
  },
  reasonText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  availableLabel: {
    fontSize: 14,
    color: '#c1603a',
    fontWeight: '600',
  },
  unavailableLabel: {
    fontSize: 14,
    color: '#ccc',
  },
})