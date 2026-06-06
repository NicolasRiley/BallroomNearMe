import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { EventType } from '../types'

const EVENT_TYPES: { label: EventType; icon: string }[] = [
  { label: 'Ball', icon: '✦' },
  { label: 'Vogue Class', icon: '♪' },
  { label: 'Kiki Lounge', icon: '⚇' },
]

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const handleSelect = (eventType: EventType) => {
    navigation.navigate('VenueList', { eventType })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What are you planning{'\n'}in London?</Text>

      <View style={styles.optionsList}>
        {EVENT_TYPES.map((event) => (
          <TouchableOpacity
            key={event.label}
            style={styles.optionCard}
            onPress={() => handleSelect(event.label)}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>{event.icon}</Text>
            </View>
            <Text style={styles.optionLabel}>{event.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 32,
    lineHeight: 36,
  },
  optionsList: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fdf0ec',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 18,
    color: '#c1603a',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a2e',
  },
})