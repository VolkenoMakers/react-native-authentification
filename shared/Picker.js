import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "react-native-elements";
import { COLORS, DIMENSIONS } from "../constants/constants";
import { BoldText, NormalText } from "./Texts";
const Picker = ({ placeholder, selectedItem, items, onItemChange, error }) => {
  const [visible, setVisible] = React.useState(false);
  const selected = items.find((i) => i.value === selectedItem) || {};
  return (
    <View style={{ marginVertical: 5 }}>
      <PickerModal
        onItemChange={onItemChange}
        visible={visible}
        onHide={() => setVisible(false)}
        items={items}
        placeholder={placeholder}
      />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: selected?.label ? "#707070" : COLORS.grey,
                  paddingHorizontal: 10,
                  fontSize: 16,
                }}
                numberOfLines={1}
              >
                {selected?.label || placeholder}
              </Text>
              <Icon name="ios-arrow-down" type="ionicon" color={COLORS.app1} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ paddingHorizontal: 5 }}>
        {error && (
          <Text style={{ marginVertical: 5, color: "#F00", fontSize: 12 }}>
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Picker;

const styles = {
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    marginTop: 20,
    borderRadius: 35,
    borderWidth: 0,
    marginHorizontal: 10,
    borderColor: "#FFF",
    height: 50,
  },
};

export function PickerModal({
  visible,
  onHide,
  placeholder,
  items,
  onItemChange,
}) {
  return (
    <Modal onRequestClose={onHide} visible={visible} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,.4)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ height: DIMENSIONS.height * 0.8 }}>
          <ScrollView
            bounces={false}
            contentContainerStyle={{
              minHeight: DIMENSIONS.height * 0.8,
              justifyContent: "center",
              width: DIMENSIONS.width * 0.85,
            }}
          >
            <View
              style={{
                width: DIMENSIONS.width * 0.85,
                backgroundColor: "#FFF",
                padding: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  {!!placeholder && (
                    <BoldText
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {placeholder}
                    </BoldText>
                  )}
                </View>
                <Icon name="close" color="#000" onPress={onHide} />
              </View>

              {items.length > 1 &&
                items.map((i, index) => {
                  const text = i.label || i.value;
                  return (
                    <React.Fragment key={index}>
                      <TouchableNativeFeedback
                        onPress={() => {
                          onItemChange(i.value);
                          onHide();
                        }}
                      >
                        <View style={{ paddingVertical: 10 }}>
                          <NormalText>{text}</NormalText>
                        </View>
                      </TouchableNativeFeedback>
                      {/* {index !== length - 1 && (
                      <View
                        style={{
                          height: 0.4,
                          backgroundColor: "rgba(0,0,0,.2)",
                        }}
                      />
                    )} */}
                    </React.Fragment>
                  );
                })}
              {items.length === 1 && (
                <View style={{ marginTop: 25 }}>
                  <NormalText style={{ textAlign: "center" }}>
                    liste vide!
                  </NormalText>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
