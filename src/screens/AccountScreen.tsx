import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import SignInModal from '../components/SignInModal'
import { UserPreferences } from '../types'

export default function AccountScreen() {
  const { user, isLoggedIn, signOut } = useAuth()
  const [showSignIn, setShowSignIn] = useState(false)
  const [preferences, setPreferences] = useState<UserPreferences>({
    lgbtqVerifiedOnly: true,
  })

  // If not logged in, show a prompt that opens the modal
  if (!isLoggedIn) {
    return (
      <View style={styles.loggedOutContainer}>
        <Text style={styles.loggedOutTitle}>You're not signed in</Text>
        <Text style={styles.loggedOutSub}>
          Sign in to save venues and manage your account.
        </Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => setShowSignIn(true)}
        >
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
        <SignInModal
          visible={showSignIn}
          onClose={() => setShowSignIn(false)}
        />
      </View>
    )
  }

  // Derive initials from name
  const initials = user!.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Profile card */}
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{user!.name}</Text>
          <Text style={styles.userEmail}>{user!.email}</Text>
        </View>
      </View>

      {/* My Boards + Booking History */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>My boards</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <View style={styles.rowDivider} />
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Booking history</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.rowDivider} />
        <View style={styles.settingRow}>
          <View style={styles.settingText}>
            <Text style={styles.settingLabel}>Show LGBTQ+ verified spaces only</Text>
            <Text style={styles.settingDescription}>
              Only display venues verified as LGBTQ+ friendly
            </Text>
          </View>
          <Switch
            value={preferences.lgbtqVerifiedOnly}
            onValueChange={val =>
              setPreferences(prev => ({ ...prev, lgbtqVerifiedOnly: val }))
            }
            trackColor={{ false: '#e0e0e0', true: '#c1603a' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Sign out */}
      <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    padding: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#c1603a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowLabel: {
    fontSize: 15,
    color: '#1a1a2e',
  },
  chevron: {
    fontSize: 20,
    color: '#999',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    paddingBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    gap: 12,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    color: '#1a1a2e',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  signOutButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  signOutText: {
    fontSize: 15,
    color: '#666',
  },
  loggedOutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },
  loggedOutTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  loggedOutSub: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  signInButton: {
    marginTop: 8,
    backgroundColor: '#c1603a',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
})