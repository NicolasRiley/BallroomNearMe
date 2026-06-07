import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafetyInfo, SafetyLevel } from '../types'

const SAFETY_COLORS: Record<SafetyLevel, { bg: string; dot: string; text: string }> = {
  green: { bg: '#f0faf0', dot: '#22c55e', text: '#16a34a' },
  amber: { bg: '#fffbeb', dot: '#f59e0b', text: '#b45309' },
  red:   { bg: '#fff1f0', dot: '#ef4444', text: '#dc2626' },
}

type Props = {
  safety: SafetyInfo
  visible: boolean
  onClose: () => void
}

export default function SafetyModal({ safety, visible, onClose }: Props) {
  const colors = SAFETY_COLORS[safety.level]

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>Community Safety Info</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.section, { backgroundColor: colors.bg }]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.dot, { backgroundColor: colors.dot }]} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Area</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Street safety</Text>
                <Text style={styles.rowValue}>{safety.area.streetSafety}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Transport</Text>
                <Text style={styles.rowValue}>{safety.area.transport}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Lighting</Text>
                <Text style={styles.rowValue}>{safety.area.lighting}</Text>
              </View>
            </View>

            <View style={[styles.section, { backgroundColor: colors.bg }]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.dot, { backgroundColor: colors.dot }]} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Venue</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Staff attitude</Text>
                <Text style={styles.rowValue}>{safety.venue.staffAttitude}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Queer events</Text>
                <Text style={styles.rowValue}>{safety.venue.queerEvents}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Management</Text>
                <Text style={styles.rowValue}>{safety.venue.management}</Text>
              </View>
            </View>

            <Text style={styles.meta}>
              Based on {safety.contributorCount} community contributions · Last updated {safety.lastUpdated}
            </Text>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  close: {
    fontSize: 18,
    color: '#666',
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  row: {
    marginBottom: 10,
  },
  rowLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 14,
    color: '#1a1a2e',
    lineHeight: 20,
  },
  meta: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 12,
  },
})