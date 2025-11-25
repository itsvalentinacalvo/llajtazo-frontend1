import { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { SplashStackParamList } from "@/modules/splash-screen/navigation/SplashStackNavigator";

type SplashScreenNavigationProp = NativeStackNavigationProp<
  SplashStackParamList,
  "Splash"
>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const circleScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    circleScale.value = withSequence(
      withTiming(50, {
        duration: 2000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      withTiming(50, { duration: 200 })
    );

    setTimeout(() => {
      logoOpacity.value = withTiming(1, { duration: 500 });
    }, 800);

    setTimeout(() => {
      navigation.replace("AuthStack", { screen: "Register" });
    }, 4500);
  }, []);

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: circleScale.value }],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, circleStyle]} />
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Image
          source={require("@core/assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2BBBFF",
  },
  logoContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
