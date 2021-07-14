import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Input as ReactInput, Icon, CheckBox } from "react-native-elements";
import { NormalText } from "./Texts";
import moment from "moment";
import { FormError } from "./Form";
import { PickerModal } from "./Picker";
import DateTimePicker2 from "./DateTimePicker";
export default function Input({
  value,
  onChange,
  label,
  error,
  secureTextEntry,
  inputStyle,
  inputContainerStyle,
  editable = true,
  editableBackgoundColor = "#EEE",
  enableShowPassword,
  rightIcon,
  ...options
}) {
  const [ste, setSte] = React.useState(secureTextEntry);
  const getRightIcon = React.useCallback(() => {
    if (rightIcon) return rightIcon;
    if (enableShowPassword) {
      if (ste) {
        return {
          name: "eye",
          type: "entypo",
          size: 20,
          color: "#9D9D9D",
          onPress: () => setSte(!ste),
        };
      }
      return {
        name: "eye-with-line",
        type: "entypo",
        size: 20,
        color: "#9D9D9D",
        onPress: () => setSte(!ste),
      };
    }
    return {};
  }, [ste]);
  return (
    <View style={{ marginVertical: 5 }}>
      <ReactInput
        inputStyle={{
          fontWeight: "300",
          fontSize: 14,
          color: "#5A5A5A",
          ...inputStyle,
        }}
        containerStyle={{
          paddingStart: 0,
          paddingEnd: 0,
          paddingBottom: 0,
          marginStart: 0,
          marginEnd: 0,
          height: inputContainerStyle?.minHeight || 57,
        }}
        inputContainerStyle={{
          paddingHorizontal: 20,
          backgroundColor: editable ? "#FFF" : editableBackgoundColor,
          borderRadius: 10,
          minHeight: 57,
          borderWidth: 1,
          borderColor: "#F1F1F1",
          ...inputContainerStyle,
        }}
        onChangeText={onChange}
        leftIconContainerStyle={{ marginRight: 13 }}
        placeholder={label}
        errorStyle={{ color: "#A00" }}
        value={value}
        rightIcon={getRightIcon()}
        placeholderTextColor={"#666"}
        secureTextEntry={ste}
        editable={editable}
        {...options}
      />
      {!!error && <FormError {...{ error }} />}
    </View>
  );
}

export function InputForm({
  icon,
  placeholder,
  value,
  date,
  input,
  file,
  document,
  label,
  onChange,
  format = "MM-DD-YYYY",
  error,
  items = [],
  minHeight = 50,
  maxHeight,
  ...props
}) {
  if (input) {
    return (
      <View>
        {!!label && (
          <NormalText
            style={{
              fontSize: 16,
              marginBottom: 5,
              color: "#5A5A5A",
            }}
          >
            {label}
          </NormalText>
        )}
        <Input
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          error={error}
          inputContainerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            minHeight: minHeight,
            maxHeight,
            borderColor: "#ABABAB",
          }}
          {...props}
        />
      </View>
    );
  }
  const [visible, setVisible] = React.useState(false);
  const [momentDate, setMomentDate] = React.useState(
    moment(date & !!value ? value : undefined).toDate()
  );

  const selected = items.find((i) => i.value === value);
  return (
    <View>
      {!date && (
        <PickerModal
          onItemChange={onChange}
          visible={visible}
          onHide={() => setVisible(false)}
          items={[{ label: `Choisir ${placeholder}`, value: "" }, ...items]}
          placeholder={placeholder}
        />
      )}
      {date && (
        <DateTimePicker2
          onHide={() => setVisible(false)}
          date={momentDate}
          isVisible={visible}
          onChange={(date) => {
            setMomentDate(date);
            onChange(moment(date).format(format));
          }}
          {...props}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
      >
        {!!label && (
          <NormalText
            style={{
              fontSize: 16,
              marginBottom: 5,
              color: "#5A5A5A",
            }}
          >
            {label}
          </NormalText>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight,
            maxHeight,
            paddingVertical: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ABABAB",
            paddingHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            {!!placeholder && !!!value && !selected?.label && (
              <NormalText
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "300",
                }}
              >
                {placeholder}
              </NormalText>
            )}
            {(!!value || selected?.label) && (
              <NormalText
                numberOfLines={2}
                style={{
                  color: "rgba(0, 0, 0, 0.8)",
                  fontWeight: "300",
                  fontSize: 13,
                }}
              >
                {selected?.label ||
                  (date ? moment(momentDate).format(format) : value)}
              </NormalText>
            )}
          </View>
          <View style={{ width: 22 }}>
            <Icon color="#6e6969" size={20} {...icon} />
          </View>
        </View>
      </TouchableOpacity>
      {!!error && <FormError {...{ error }} />}
    </View>
  );
}

export function MyCheckbox({
  value,
  label,
  onChange,
  checkedColor,
  uncheckedColor,
  radio = false,
}) {
  const icons = !radio
    ? {
        iconType: "material",
        checkedIcon: "check-box",
        uncheckedIcon: "check-box-outline-blank",
      }
    : { checkedIcon: "dot-circle-o", uncheckedIcon: "circle-o" };
  return (
    <CheckBox
      size={24}
      onPress={() => {
        onChange(!value);
      }}
      wrapperStyle={{ marginVertical: 10 }}
      containerStyle={{
        backgroundColor: "transparent",
        borderWidth: 0,
        margin: 0,
        padding: 0,
        paddingStart: 0,
        marginStart: 0,
      }}
      title={label}
      titleProps={{
        style: { color: "rgba(0,0,0,.8)", marginLeft: 10, width: "90%" },
      }}
      uncheckedColor={uncheckedColor}
      checkedColor={checkedColor}
      {...icons}
      checked={value}
    />
  );
}
