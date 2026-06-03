import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafetyInfo, SafetyLevel } from '../types'

const SAFETY_COLORS: Record<SafetyLevel, { bg: string; dot: string; text: string }> = {
  green: { bg: '#f0faf0', dot: '#22c55e', text: '#16a34a' },
  amber: { bg: '#fffbeb', dot: '#f59e0b', text: '#b45309' },
  red:   { bg: '#fff1f0', dot: '#ef4444', text: '#dc2626' },
}

type Props = {
  safety: SafetyInfo
  onPress?: () => void
}

export default function SafetyBadge({ safety, onPress }: Props) {
  const colors = SAFETY_COLORS[safety.level]

  return (
    <TouchableOpacity
      style={[styles.badge, { backgroundColor: colors.bg }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.dot, { backgroundColor: colors.dot }]} />
      <Text style={[styles.text, { color: colors.text }]}>{safety.summary}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
})