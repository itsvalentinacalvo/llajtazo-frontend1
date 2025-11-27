import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@auth/navigation/AuthStackNavigator";
import AuthInput from "@auth/components/AuthInput";
import PrimaryButton from "@auth/components/PrimaryButton";
import SocialButton from "@auth/components/SocialButton";
import Divider from "@components/Divider";
import { ScreenKeyboardAwareScrollView } from "@components/ScreenKeyboardAwareScrollView";
import { Colors, Spacing, Typography } from "@core/constants/theme";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = () => {
    let hasError = false;

    if (!fullName.trim()) {
      setFullNameError("Completa la información para continuar");
      hasError = true;
    } else {
      setFullNameError("");
    }

    if (!email.trim()) {
      setEmailError("Completa la información para continuar");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Completa la información para continuar");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    navigation.navigate("Verification");
  };

  const handleGoogleRegister = () => {
    console.log("Google register pressed");
  };

  const handleFacebookRegister = () => {
    console.log("Facebook register pressed");
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <LinearGradient
      colors={["#2BBBFF", "#0099E6"]}
      style={styles.gradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScreenKeyboardAwareScrollView
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: insets.top + Spacing["4xl"],
            paddingBottom: insets.bottom + Spacing["2xl"],
          },
        ]}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Hola, Bienvenido! 👋</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Ya tienes una cuenta? </Text>
            <Pressable onPress={handleNavigateToLogin}>
              <Text style={styles.link}>Inicia Sesión</Text>
            </Pressable>
          </View>

          <View style={styles.inputsContainer}>
            <AuthInput
              icon="user"
              placeholder="Nombre Completo"
              value={fullName}
              onChangeText={setFullName}
            />
            {fullNameError ? (
              <Text style={styles.errorText}>{fullNameError}</Text>
            ) : null}
            <AuthInput
              icon="mail"
              placeholder="abc@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
            <AuthInput
              icon="lock"
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <PrimaryButton
              title="REGÍSTRATE"
              onPress={handleRegister}
            />

            <Divider />

            <SocialButton
              title="Registrarte con Google"
              onPress={handleGoogleRegister}
              type="google"
            />
            <SocialButton
              title="Registrarte con Facebook"
              onPress={handleFacebookRegister}
              type="facebook"
            />
          </View>
        </View>
      </ScreenKeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing["2xl"],
  },
  formContainer: {
    width: "100%",
  },
  title: {
    ...Typography.h1,
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  link: {
    fontSize: 14,
    color: Colors.light.primary,
    textDecorationLine: "underline",
  },
  inputsContainer: {
    marginTop: Spacing.lg,
    // alineamos a la izquierda para que el error quede pegado al input
  },
  errorText: {
    alignSelf: "flex-start",
    marginTop: 4,
    marginLeft: 4,
    color: "#FF3B30",
    fontSize: 12,
  },
});
