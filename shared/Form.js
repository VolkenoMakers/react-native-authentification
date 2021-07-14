import React from "react";
import { NormalText } from "../shared/Texts";
import * as yup from "yup";
import {
  Alert,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import Loader from "../shared/Loader";

import _ from "lodash";
import { COLORS } from "../constants/constants";
import { Icon, Card } from "react-native-elements";
import { Modal } from "react-native";

export function FormError({ error }) {
  return (
    <View style={{ marginVertical: 5 }}>
      <NormalText style={{ color: "#A00" }}>{error}</NormalText>
    </View>
  );
}

export const useLayout = () => {
  const [layout, setLayout] = React.useState({});
  const ref = React.useRef();
  const onLayout = React.useCallback(() => {
    if (ref.current) {
      ref.current.measure((fx, fy, width, height, px, py) => {
        const lay = {
          x: px,
          y: py,
          width,
          height,
        };
        setLayout(lay);
      });
    }
  }, [ref.current]);

  return [ref, layout, onLayout];
};
const PickModal = ({ visible, onHide, onPick }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={onHide}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{ flex: 1, backgroundColor: "transparent" }}
          onTouchStart={(e) => {
            onHide();
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.app3,
            width: "100%",
            borderTopLeftRadius: 15,
            padding: 20,
            borderTopRightRadius: 15,
          }}
        >
          <View style={{ alignSelf: "flex-end", marginBottom: 15 }}>
            <Icon name="close" color="#FFF" onPress={onHide} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View style={{ marginHorizontal: 5 }}>
              <NormalText
                style={{
                  fontSize: 12,
                  color: "#FFF",
                  marginBottom: 10,
                }}
              >
                Prendre une photo
              </NormalText>
              <TouchableWithoutFeedback onPress={() => onPick(true)}>
                <Card
                  containerStyle={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#FFF",
                    alignItems: "center",
                    padding: 0,
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="camera"
                    color={COLORS.app1}
                    size={24}
                    type="feather"
                  />
                </Card>
              </TouchableWithoutFeedback>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <NormalText
                style={{
                  fontSize: 12,
                  color: "#FFF",
                  marginBottom: 10,
                }}
              >
                Charger un fichier
              </NormalText>
              <TouchableWithoutFeedback onPress={() => onPick(false)}>
                <Card
                  containerStyle={{
                    width: 50,
                    height: 50,
                    padding: 0,
                    borderRadius: 25,
                    backgroundColor: "#FFF",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="download"
                    color={COLORS.app1}
                    size={24}
                    type="feather"
                  />
                </Card>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export const useFormData = (formData) => {
  const [data, setData] = React.useState(formData);
  const onDataChange = React.useCallback((fieldName, value) => {
    if (typeof fieldName === "object") {
      setData({ ...data, ...fieldName });
      return;
    }
    if (fieldName === null) {
      setData(value);
      return;
    }
    let keys = Object.keys(data);
    if (keys.includes(fieldName)) {
      let newdata = { ...data };
      newdata[fieldName] = value;
      setData(newdata);
    } else {
      throw new Error(fieldName + " is not a valid key");
    }
  });
  return [data, onDataChange];
};

export const userFormValidation = (initalErrors, cbRules) => {
  const [errors, setErrors] = React.useState(initalErrors);
  const Schema = yup.object().shape(cbRules(yup));
  const validate = React.useCallback((data) => {
    return new Promise((resolve, reject) => {
      Schema.validate(data, { abortEarly: false })
        .then(() => {
          setErrors({});
          resolve(data);
        })
        .catch(function (err) {
          let newErrors = {};
          for (let e of err.inner) {
            newErrors[e.path] = e.errors[0];
          }
          setErrors(newErrors);
          reject(newErrors);
        });
    });
  });
  return [errors, validate, setErrors];
};

export function useLoading(initialLoadingValue, initialMessage) {
  const [data, setData] = React.useState({
    loading: initialLoadingValue,
    message: initialMessage,
  });

  const onChange = React.useCallback((loadingValue, messageValue) => {
    setData({ loading: loadingValue, message: messageValue || data.message });
  });

  const render = React.useCallback(() => {
    return <Loader visible={data.loading} title={data.message} />;
  });

  return [render, onChange, data.loading, data.message];
}

export const useQuery = (func, cb, loadingTitle) => {
  const [loading, setLoading] = React.useState(false);
  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await func();
      cb(data);
    } catch (ex) {
      Alert.alert("", `Error ${ex.message}`);
    }
    setLoading(false);
  });

  React.useEffect(() => {
    fetchData();
  }, []);
  const render = React.useCallback(() => {
    return <Loader visible={loading} title={loadingTitle} />;
  }, [loading]);

  return [loading, fetchData, render];
};

export const useMutation = (func, cb, loadingTitle) => {
  const [loading, setLoading] = React.useState(false);
  const exec = React.useCallback(async (args) => {
    setLoading(true);
    try {
      const data = await func(args);
      cb(data);
    } catch (ex) {
      Alert.alert("", `Error ${ex.message}`);
    }
    setLoading(false);
  });

  const render = React.useCallback(() => {
    return <Loader visible={loading} title={loadingTitle} />;
  });

  return [loading, exec, render];
};

export function prompt(title) {
  return new Promise((resolve) => {
    Alert.alert(
      "",
      title,
      [
        { text: "OUI", onPress: () => resolve(true) },
        { text: "NON", onPress: () => resolve(false), style: "cancel" },
      ],
      { cancelable: false }
    );
  });
}

export function useKeyboard() {
  const [show, setShow] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = (e) => {
    setHeight(e.endCoordinates.height);
    setShow(true);
  };

  const _keyboardDidHide = () => {
    setShow(false);
  };

  const dismissKeyboard = React.useCallback(() => {
    Keyboard.dismiss();
  });

  return [show, dismissKeyboard, height];
}

export function useFilter(items, fields, search) {
  return React.useCallback(() => {
    search = search.trim().toLowerCase();
    if (search.length === 0) return items;
    return items.filter((c) => {
      let ok = false;
      for (let field of fields) {
        const value = _.get(c, field, "").trim().toLowerCase();
        if (value.includes(search)) {
          ok = true;
          break;
        }
      }
      return ok;
    });
  }, [search, items]);
}
