import React from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import Yup from "./shared/validator";
import { COLORS, DIMENSIONS } from "./constants/constants";
import { RenderButton, RenderInput } from "./shared/renderInput";
import Icon from "react-native-vector-icons/Entypo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export type Props = {
  setErrors: any;
  errors: object;

  setEmail: any;
  email: string;

  textRedirectLogin: string;
  title: string;
  labelEmail: string;
  textValidate: string;

  textRedirectLoginStyle: object;
  connexionTitleStyle: object;
  connexionButtonStyle: object;
  leftIconEmail: object;
  titleStyle: object;
  styles: object;

  pressRedirectLogin: any;
  OnSubmit: any;
};

export const RequestPasswordReset: React.FC<Props> = ({
  setErrors = null,
  errors = "",
  setEmail = null,
  email = "",
  title = "Veuillez entrer votre email Nous vous enverrons un lien pour modifier le mot de passe",
  labelEmail = "Adresse mail",
  titleStyle = {},
  textValidate = "Valider",
  connexionTitleStyle = {},
  connexionButtonStyle = {},
  leftIconEmail = {},
  textRedirectLogin = "Je suis déjà inscrit",
  textRedirectLoginStyle = {},
  styles = {},
  OnSubmit,
  pressRedirectLogin,
}) => {
  const Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Adresse Mail"),
  });
  const submit = () => {
    try {
      OnSubmit();
    } catch (error) {
      Alert.alert("Attention", "La fonction OnSubmit est obligatoire");
    }
  };
  const [loading, setLoading] = React.useState(false);

  let onChange = (text: string) => {
    try {
      setEmail(text);
    } catch (error) {
      Alert.alert("Attention", "setEmail est obligatoire");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        ...styles,
      }}
    >
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "rgba(0,0,0,.6)",
            paddingHorizontal: 10,
            ...titleStyle,
          }}
        >
          {title}
        </Text>
        <View style={{ marginTop: Dimensions.get("window").height * 0.05 }}>
          <RenderInput
            value={email}
            errors={errors}
            //@ts-expect-error
            error={errors?.email}
            label={labelEmail}
            onChange={onChange}
            leftIcon={leftIconEmail}
            textContentType={"username"}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />
        </View>
        <View style={{ marginTop: Dimensions.get("window").height * 0.05 }}>
          <RenderButton
            title={textValidate}
            Schema={Schema}
            startLoad={() => setLoading(true)}
            endLoad={() => setLoading(false)}
            setErrors={(error: string) => setErrors(error)}
            value={{ email }}
            loading={loading}
            submit={submit}
            styles={{ backgroundColor: "red" }}
            titleStyle={connexionTitleStyle}
            buttonStyle={connexionButtonStyle}
          />
        </View>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            marginTop: Dimensions.get("window").height * 0.05,
          }}
          onPress={pressRedirectLogin}
        >
          <Text
            style={{
              color: COLORS.bgApp,
              textAlign: "center",
              fontSize: 14,
              ...textRedirectLoginStyle,
            }}
          >
            {textRedirectLogin}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};
