import React from "react";

import { Modal, View, ActivityIndicator } from "react-native";

import { COLORS, DIMENSIONS } from "../constants/constants";
import APpButton from "./renderInput";
import { BoldText } from "./Texts";

const { width } = DIMENSIONS;

const Loader = ({ visible, title = "Chargement..." }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,.2)",
        }}
      >
        <View
          style={[
            {
              backgroundColor: "#FFF",
              width: width * 0.8,
              height: 140,
              justifyContent: "center",
              borderRadius: 10,
              alignItems: "center",
            },
          ]}
        >
          <ActivityIndicator color={COLORS.app3} size="large" />
          <BoldText
            style={{
              fontSize: 12,
              color: "rgba(0,0,0,.7)",
              marginVertical: 20,
            }}
          >
            {title}
          </BoldText>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

export const QueryLoader = ({ query }) => {
  const [visible, setvisible] = React.useState(query.loading || !!query.error);
  React.useEffect(() => {
    setvisible(query.loading || !!query.error);
  }, [query]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setvisible(false)}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,.2)",
        }}
      >
        <View
          style={[
            {
              backgroundColor: "#FFF",
              width: width * 0.8,
              minHeight: 140,
              padding: 20,
              justifyContent: "center",
              borderRadius: 10,
              alignItems: "center",
            },
          ]}
        >
          <ActivityIndicator color={COLORS.app3} size="large" />
          <BoldText
            style={{
              fontSize: 12,
              color: "rgba(0,0,0,.7)",
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            {!query.error
              ? "Chargement..."
              : `erreur lors du chargement des données : ${query.error?.message}`}
          </BoldText>
          {!!query.error && (
            <View style={{ marginTop: 20 }}>
              <APpButton
                small
                title="réessayer"
                titleColor="#FFF"
                backgroundColor={COLORS.app1}
                onPress={query.getData}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
