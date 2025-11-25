import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStackNavigator, {
  AuthStackParamList,
} from "@auth/navigation/AuthStackNavigator";
import SplashScreen from "@/modules/splash-screen/screens/SplashScreen";

export type SplashStackParamList = {
  Splash: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

const Stack = createNativeStackNavigator<SplashStackParamList, "SplashStack">();

export default function SplashStackNavigator() {
  return (
    <Stack.Navigator
      id="SplashStack"
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
    </Stack.Navigator>
  );
}
