import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { Spacing } from "@core/constants/theme";

export function useScreenInsets() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  let tabBarHeight = insets.bottom;

  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (error) {
    // When rendered outside a Bottom Tab Navigator, fall back to safe-area inset/spacing
    tabBarHeight = insets.bottom || Spacing.lg;
  }

  return {
    paddingTop: headerHeight + Spacing.xl,
    paddingBottom: tabBarHeight + Spacing.xl,
    scrollInsetBottom: insets.bottom + 16,
  };
}
