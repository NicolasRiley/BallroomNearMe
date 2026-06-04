import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'

type Props = {
  visible: boolean
  onClose: () => void
}

const SOCIAL_BUTTONS = [
  { label: 'Continue with Apple', icon: '' },
  { label: 'Continue with Google', icon: '𝗚' },
  { label: 'Continue with Facebook', icon: '𝗙' },
  { label: 'Continue with Instagram', icon: '📷' },
]

export default function SignInModal({ visible, onClose }: Props) {
  const handleSocial = (label: string) => {
    Alert.alert('Coming soon', `${label} sign-in will be available soon.`)
  }

  const handleEmail = () => {
    Alert.alert('Coming soon', 'Email sign-in will be available soon.')
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Sign up</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.body}>
          {SOCIAL_BUTTONS.map(({ label, icon }) => (
            <TouchableOpacity
              key={label}
              style={styles.socialButton}
              onPress={() => handleSocial(label)}
            >
              <Text style={styles.socialIcon}>{icon}</Text>
              <Text style={styles.socialLabel}>{label}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
            <Text style={styles.emailLabel}>Continue with email</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Already have an account?{' '}
            <Text style={styles.footerLink}>Sign in</Text>
          </Text>
        </View>
      </View>
    </Modal>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  placeholder: {
    width: 26,
  },
  body: {
    padding: 24,
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1a1a2e',
    borderRadius: 8,
    paddingVertical: 14,
    gap: 10,
  },
  socialIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  socialLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a1a2e',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    fontSize: 13,
    color: '#999',
  },
  emailButton: {
    borderWidth: 1,
    borderColor: '#1a1a2e',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  emailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  footerLink: {
    color: '#c1603a',
    fontWeight: '600',
  },
})