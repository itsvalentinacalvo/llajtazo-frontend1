import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { AuthStackParamList } from "@auth/navigation/AuthStackNavigator";
import CodeInput from "@components/CodeInput";
import { ScreenKeyboardAwareScrollView } from "@components/ScreenKeyboardAwareScrollView";
import { Colors, Spacing, Typography } from "@core/constants/theme";
import PrimaryButton from "@auth/components/PrimaryButton";

type VerificationScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Verification"
>;

export default function VerificationScreen() {
  const navigation = useNavigation<VerificationScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleContinue = () => {
    navigation.navigate("Interests");
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(20);
      console.log("Resend code");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <ScreenKeyboardAwareScrollView
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: insets.top + Spacing.xl,
            paddingBottom: insets.bottom + Spacing["2xl"],
          },
        ]}
      >
        <Pressable onPress={handleGoBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={Colors.light.text} />
        </Pressable>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Verificación</Text>
          <Text style={styles.subtitle}>
            Te enviamos un código al correo{"\n"}abc@email.com
          </Text>

          <CodeInput length={4} onComplete={setCode} />

          <PrimaryButton title="CONTINUAR" onPress={handleContinue} />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Reenviar código en </Text>
            <Pressable onPress={handleResend} disabled={timer > 0}>
              <Text
                style={[
                  styles.resendTimer,
                  timer === 0 && styles.resendTimerActive,
                ]}
              >
                {formatTime(timer)}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScreenKeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundRoot,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing["2xl"],
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    ...Typography.h1,
    color: Colors.light.text,
    marginBottom: Spacing.md,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.lg,
    alignSelf: "flex-start",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.lg,
  },
  resendText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  resendTimer: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  resendTimerActive: {
    textDecorationLine: "underline",
  },
});
