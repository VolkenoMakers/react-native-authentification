import React from "react";
import { Text, TextProps } from "react-native";

export const NormalText = (props: TextProps) => {
  return <Text {...props} style={[{}, props.style]} />;
};

export const BoldText = (props: TextProps) => {
  return (
    <NormalText {...props} style={[props.style, { fontWeight: "bold" }]} />
  );
};

export function TextLight(props: TextProps) {
  return <Text {...props} style={[props.style, {}]} />;
}
