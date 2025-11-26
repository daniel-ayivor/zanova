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
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { fullname: '', email: '', password: '', confirmPassword: '' };

    // Full name validation
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required';
      valid = false;
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = 'Full name must be at least 2 characters';
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your account has been created successfully! Welcome to our community.');
      router.push('/auth/login');
    }, 1500);
  };

  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  const handleSocialRegister = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} registration will be available soon!`);
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
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>

            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-add" size={44} color="#0d9488" />
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join our community today</Text>
            </View>

            {/* Registration Form Card */}
            <View style={styles.formCard}>
              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <View style={[
                  styles.inputWrapper,
                  errors.fullname ? styles.inputError : styles.inputNormal,
                  formData.fullname && !errors.fullname ? styles.inputSuccess : {}
                ]}>
                  <Ionicons name="person-outline" size={22} color={errors.fullname ? '#f87171' : '#6b7280'} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9ca3af"
                    value={formData.fullname}
                    onChangeText={(value) => handleInputChange('fullname', value)}
                    autoCapitalize="words"
                    autoComplete="name"
                    editable={!loading}
                  />
                  {formData.fullname && !errors.fullname && (
                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  )}
                </View>
                {errors.fullname ? (
                  <Text style={styles.errorText}>{errors.fullname}</Text>
                ) : null}
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <View style={[
                  styles.inputWrapper,
                  errors.email ? styles.inputError : styles.inputNormal,
                  formData.email && !errors.email ? styles.inputSuccess : {}
                ]}>
                  <Ionicons name="mail-outline" size={22} color={errors.email ? '#f87171' : '#6b7280'} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="your@email.com"
                    placeholderTextColor="#9ca3af"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    editable={!loading}
                  />
                  {formData.email && !errors.email && (
                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  )}
                </View>
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={[
                  styles.inputWrapper,
                  errors.password ? styles.inputError : styles.inputNormal
                ]}>
                  <Ionicons name="lock-closed-outline" size={22} color={errors.password ? '#f87171' : '#6b7280'} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Create a password"
                    placeholderTextColor="#9ca3af"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    editable={!loading}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={[
                  styles.inputWrapper,
                  errors.confirmPassword ? styles.inputError : styles.inputNormal,
                  formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword ? styles.inputSuccess : {}
                ]}>
                  <Ionicons name="lock-closed-outline" size={22} color={errors.confirmPassword ? '#f87171' : '#6b7280'} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Confirm your password"
                    placeholderTextColor="#9ca3af"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    editable={!loading}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword ? (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                ) : null}
              </View>

              {/* Terms Agreement */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By creating an account, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                onPress={handleRegister}
                disabled={loading}
                style={[
                  styles.registerButton,
                  loading ? styles.registerButtonDisabled : {}
                ]}
              >
                {loading ? (
                  <Ionicons name="refresh" size={24} color="white" />
                ) : (
                  <Ionicons name="person-add" size={24} color="white" />
                )}
                <Text style={styles.registerButtonText}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={handleLoginClick} disabled={loading}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Social Registration Section */}
            <View style={styles.socialContainer}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or sign up with</Text>
                <View style={styles.dividerLine} />
              </View>
              
              {/* Social Registration Buttons */}
              <View style={styles.socialButtons}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialRegister('Google')}
                  disabled={loading}
                >
                  <FontAwesome name="google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialRegister('Facebook')}
                  disabled={loading}
                >
                  <FontAwesome name="facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialRegister('Apple')}
                  disabled={loading}
                >
                  <FontAwesome name="apple" size={24} color="black" />
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
    marginBottom: 20,
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
  termsContainer: {
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#0d9488',
    fontWeight: '600',
  },
  registerButton: {
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
  registerButtonDisabled: {
    backgroundColor: '#5eead4',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  loginText: {
    color: '#6b7280',
    fontSize: 16,
    marginRight: 8,
  },
  loginLink: {
    color: '#0d9488',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  socialContainer: {
    marginTop: 8,
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
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});