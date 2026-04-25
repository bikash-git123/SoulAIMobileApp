import { Typography } from "@/constants/Typography";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

export interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "social";
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const AppButton = ({
  title,
  variant = "primary",
  icon,
  style,
  textStyle,
  onPress,
  ...props
}: AppButtonProps) => {
  const isSocial = variant === "social";

  return (
    <TouchableOpacity
      {...props}
      style={[styles.baseButton, isSocial ? styles.socialButton : styles.primaryButton, style]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {icon &&
        React.cloneElement(icon as React.ReactElement<any>, {
          style: [styles.icon, (icon as React.ReactElement<any>).props.style],
        })}
      <Text style={[styles.baseText, isSocial ? styles.socialText : styles.primaryText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    height: 52,
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#3C61DD",
    borderRadius: 8,
  },
  socialButton: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 25,
  },
  icon: {
    position: "absolute",
    left: 24, // Put icon on the left edge as shown in Apple/Google buttons
  },
  baseText: {
    fontFamily: Typography.fonts.medium,
    fontSize: 16,
  },
  primaryText: {
    color: "#FFFFFF",
  },
  socialText: {
    color: "#000000",
  },
});
