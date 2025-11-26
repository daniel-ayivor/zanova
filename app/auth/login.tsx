// app/index.tsx (Login Screen - Clean White Design)
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

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

  const handleLogin = () => {
    if (!validateForm()) return;

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Welcome back! You have successfully logged in.');
      router.replace('/(tabs)/home');
    }, 1500);
  };

  const handleRegisterClick = () => {
    router.push('/auth/register');
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
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
            
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Ionicons name="lock-closed" size={44} color="#0d9488" />
              </View>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue your journey</Text>
            </View>

            {/* Login Form Card */}
            <View style={styles.formCard}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <View style={[
                  styles.inputWrapper,
                  errors.email ? styles.inputError : styles.inputNormal,
                  formData.email && !errors.email ? styles.inputSuccess : {}
                ]}>
                  <Ionicons 
                    name="mail-outline" 
                    size={22} 
                    color={errors.email ? '#f87171' : '#6b7280'} 
                  />
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
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={22} 
                    color={errors.password ? '#f87171' : '#6b7280'} 
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
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

              {/* Forgot Password */}
              <TouchableOpacity 
                onPress={() => router.push('/auth/forgotpassword')}
                style={styles.forgotPassword}
                disabled={loading}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                style={[
                  styles.loginButton,
                  loading ? styles.loginButtonDisabled : {}
                ]}
              >
                {loading ? (
                  <Ionicons name="refresh" size={24} color="white" />
                ) : (
                  <Ionicons name="log-in-outline" size={24} color="white" />
                )}
                <Text style={styles.loginButtonText}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={handleRegisterClick} disabled={loading}>
                <Text style={styles.signupLink}>Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* Social Login Section */}
            <View style={styles.socialContainer}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.dividerLine} />
              </View>
              
              {/* Social Login Buttons */}
              <View style={styles.socialButtons}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Google')}
                  disabled={loading}
                >
                  <FontAwesome name="google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Facebook')}
                  disabled={loading}
                >
                  <FontAwesome name="facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Apple')}
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
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    backgroundColor: '#f0fdfa',
    padding: 20,
    borderRadius: 50,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#ccfbf1',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
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
    marginBottom: 12,
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
    marginTop: 8,
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#0d9488',
    fontWeight: '600',
    fontSize: 16,
  },
  loginButton: {
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
  loginButtonDisabled: {
    backgroundColor: '#5eead4',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: '#6b7280',
    fontSize: 16,
    marginRight: 8,
  },
  signupLink: {
    color: '#0d9488',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  socialContainer: {
    marginTop: 48,
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
    gap: 24,
  },
  socialButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});