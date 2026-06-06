import { View, Text, StyleSheet } from 'react-native'

export default function BookingHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking history</Text>
      <Text style={styles.sub}>Nothing yet.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  sub: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
})