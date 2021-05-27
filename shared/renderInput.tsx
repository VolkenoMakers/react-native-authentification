import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import Colors from "../constants/Colors";
import globalStyles from "../constants/globalStyles";
import _ from "lodash";

export function RenderInput({
  value = "",
  label = "",
  onChange = {},
  inputStyle = {},
  containerStyle = {},
  errors = {},
  error = "",
  ...options
}) {
  //const error = errors ? errors[value] : null;
  const showLabel = options.showLabel === undefined ? true : options.showLabel;
  return (
    <View keyboardShouldPersistTaps="handled">
      <Input
        {...options}
        inputStyle={{
          color: "#000",
          fontSize: 14,
          ...inputStyle,
        }}
        inputContainerStyle={{
          borderColor: "#000",
          paddingHorizontal: 10,
          ...globalStyles.buttonShadow,
          borderRadius: 5,
          backgroundColor: "#FFF",
          height: 50,
          ...containerStyle,
        }}
        placeholder={label}
        leftIconContainerStyle={{ alignItems: "flex-start" }}
        rightIconContainerStyle={{ alignItems: "flex-start", marginRight: 7 }}
        labelStyle={{
          fontSize: 14,
          marginLeft: 15,
          color: "#ccc",
        }}
        errorMessage={error}
        errorStyle={{ color: Colors.errorBackground }}
        onChangeText={onChange}
        value={value}
        placeholderTextColor="#707070"
      />
    </View>
  );
}

export function renderIcon(name, type, options = {}) {
  return {
    name,
    type,
    color: "#000",
    size: 20,
    //opacity: 0.28,
    ...options,
  };
}

export function RenderButton({
  title,
  loading,
  Schema,
  startLoad,
  endLoad,
  setErrors,
  submit,
  value,
  styles = {},
  titleStyle = {},
  buttonStyle = {},
}) {
  return (
    <APpButton
      title={title}
      loading={loading}
      disabled={loading}
      styles={styles}
      titleStyle={titleStyle}
      buttonStyle={buttonStyle}
      onPress={async () => {
        let valide = await validate(Schema, startLoad, endLoad, value, submit);
        setErrors(valide);
      }}
    />
  );
}

export const validate = async (Schema, startLoad, endLoad, value, submit) => {
  startLoad;
  let valide = await Schema.validate(value, { abortEarly: false })
    .then(() => {
      endLoad;
      submit();
    })
    .catch((ex) => {
      const errors = {};
      ex.inner.forEach((error) => {
        errors[error.path] = error.errors[0];
      });
      endLoad;
      return errors;
      //this.setState({ errors, loading: false });
    });
  return valide;
};

export default function APpButton({
  small = false,
  loading,
  styles = {},
  titleStyle = {},
  buttonStyle = {},
  ...props
}) {
  return (
    <Button
      buttonStyle={{
        backgroundColor: Colors.bgApp,
        height: 50,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginHorizontal: 5,
        ...buttonStyle,
      }}
      loading={loading}
      disabled={loading}
      iconContainerStyle={{ marginTop: 5, marginLeft: "auto" }}
      titleStyle={{
        color: "white",
        fontWeight: "bold",
        letterSpacing: 1,
        fontSize: 14,
        ...titleStyle,
      }}
      {...props}
    />
  );
}
