import { useState } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email address is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleResetPassword = () => {
    if (!validateEmail()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 1500);
  };

  const handleBackToLogin = () => {
    router.back();
  };

  const handleContactSupport = (method: string) => {
    Alert.alert('Contact Support', `${method} support will be available soon!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            
            {/* Back Button */}
            <TouchableOpacity 
              onPress={handleBackToLogin}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>

            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Ionicons name="key-outline" size={44} color="#0d9488" />
              </View>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                {resetSent 
                  ? 'Check your email for instructions' 
                  : 'Enter your email to reset your password'
                }
              </Text>
            </View>

            {/* Reset Form or Success State */}
            {!resetSent ? (
              <View style={styles.formCard}>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={[
                    styles.inputWrapper,
                    emailError ? styles.inputError : styles.inputNormal,
                    email && !emailError ? styles.inputSuccess : {}
                  ]}>
                    <Ionicons 
                      name="mail-outline" 
                      size={22} 
                      color={emailError ? '#f87171' : '#6b7280'} 
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="your@email.com"
                      placeholderTextColor="#9ca3af"
                      value={email}
                      onChangeText={(value) => {
                        setEmail(value);
                        if (emailError) setEmailError('');
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      editable={!loading}
                    />
                    {email && !emailError && (
                      <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                    )}
                  </View>
                  {emailError ? (
                    <Text style={styles.errorText}>{emailError}</Text>
                  ) : null}
                </View>

                {/* Reset Button */}
                <TouchableOpacity
                  onPress={handleResetPassword}
                  disabled={loading}
                  style={[
                    styles.resetButton,
                    loading ? styles.resetButtonDisabled : {}
                  ]}
                >
                  {loading ? (
                    <Ionicons name="refresh" size={24} color="white" />
                  ) : (
                    <Ionicons name="send-outline" size={24} color="white" />
                  )}
                  <Text style={styles.resetButtonText}>
                    {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Success State
              <View style={styles.successCard}>
                <View style={styles.successIconContainer}>
                  <Ionicons name="checkmark-circle" size={64} color="#10b981" />
                </View>
                <Text style={styles.successTitle}>Reset Email Sent!</Text>
                <Text style={styles.successText}>
                  We've sent password reset instructions to your email address.
                  Please check your inbox and follow the instructions.
                </Text>
                
                <TouchableOpacity
                  onPress={handleBackToLogin}
                  style={styles.backToLoginButton}
                >
                  <Ionicons name="log-in-outline" size={24} color="white" />
                  <Text style={styles.backToLoginText}>Back to Login</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>
                If you don't receive an email within a few minutes,{'\n'}
                please check your spam folder or contact support.
              </Text>
            </View>

            {/* Support Options */}
            <View style={styles.supportContainer}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Need more help?</Text>
                <View style={styles.dividerLine} />
              </View>
              
              {/* Support Options */}
              <View style={styles.supportButtons}>
                <TouchableOpacity 
                  style={styles.supportButton}
                  onPress={() => handleContactSupport('Email')}
                >
                  <Ionicons name="mail" size={24} color="#0d9488" />
                  <Text style={styles.supportButtonText}>Email</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.supportButton}
                  onPress={() => handleContactSupport('Live Chat')}
                >
                  <Ionicons name="chatbubble" size={24} color="#0d9488" />
                  <Text style={styles.supportButtonText}>Chat</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.supportButton}
                  onPress={() => handleContactSupport('Phone')}
                >
                  <Ionicons name="call" size={24} color="#0d9488" />
                  <Text style={styles.supportButtonText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 24,
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    backgroundColor: '#f0fdfa',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccfbf1',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  inputNormal: {
    borderColor: '#e5e7eb',
  },
  inputError: {
    borderColor: '#f87171',
  },
  inputSuccess: {
    borderColor: '#10b981',
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 6,
    fontWeight: '500',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 18,
    backgroundColor: '#0d9488',
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  resetButtonDisabled: {
    backgroundColor: '#5eead4',
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  successCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 12,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#0d9488',
    width: '100%',
  },
  backToLoginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  helpContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  helpText: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  supportContainer: {
    marginTop: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  supportButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  supportButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  supportButtonText: {
    color: '#0d9488',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 4,
  },
});