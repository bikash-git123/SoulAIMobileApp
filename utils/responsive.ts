import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Standard scale based on iPhone 11/13/14/15 width (375 points)
const scale = SCREEN_WIDTH / 375;

/**
 * Normalizes font and element sizes based on screen width.
 * @param size Standard size in points
 * @returns Normalized size
 */
export const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    // Android often renders fonts/elements slightly larger relative to screen
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
