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
import globalStyles from "./constants/globalStyles";
import IonIcon from "react-native-vector-icons/Ionicons";

export type Props = {
  setErrors: any;
  errors: object;

  setPassword: any;
  password: string;

  setEmail: any;
  email: string;

  setShowPassword: any;

  facebook: boolean;
  google: boolean;
  showPassword: boolean;

  forgotPasswordText: string;
  title: string;
  labelEmail: string;
  labelPassword: string;
  colorIconPassword: string;
  textConnexion: string;
  textRedirectRegister: string;

  leftIconPassword: object;
  connexionTitleStyle: object;
  connexionButtonStyle: object;
  leftIconEmail: object;
  titleStyle: object;
  styles: object;
  forgotPasswordTextStyle: object;
  textRedirectRegisterStyle: object;

  OnSubmit: any;
  pressForgotPassword: any;
  pressRedirectRegister: any;
  OnSubmitGoogle: any;
  OnSubmitFacebook: any;
};

export const Login: React.FC<Props> = ({
  setErrors,
  errors,
  setPassword,
  password,
  setEmail,
  email,
  setShowPassword,
  showPassword = false,
  title = "Connexion",
  labelEmail = "Adresse mail",
  labelPassword = "Mot de Passe",
  titleStyle = {},
  forgotPasswordText,
  forgotPasswordTextStyle = {},
  colorIconPassword = COLORS.bgApp,
  textConnexion = "SE CONNECTER",
  connexionTitleStyle = {},
  connexionButtonStyle = {},
  leftIconPassword = {},
  leftIconEmail = {},
  textRedirectRegister = "Je n'ai pas encore de compte",
  textRedirectRegisterStyle = {},
  styles = {},
  OnSubmit,
  pressForgotPassword,
  pressRedirectRegister,
  facebook = false,
  google = false,
  OnSubmitGoogle,
  OnSubmitFacebook,
}) => {
  const Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Adresse Mail"),
    password: Yup.string().required().label("Mot de passe"),
  });
  const submit = () => {
    try {
      OnSubmit();
    } catch (error) {
      Alert.alert("Attention", "OnSubmit est obligatoire");
    }
  };

  const loginFacebook = () => {
    try {
      OnSubmitFacebook();
    } catch (error) {
      Alert.alert("Attention", "OnSubmitFacebook est obligatoire");
    }
  };

  const loginGoogle = () => {
    try {
      OnSubmitGoogle();
    } catch (error) {
      Alert.alert("Attention", "OnSubmitGoogle est obligatoire");
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

  let onChangePassword = (text: string) => {
    try {
      setPassword(text);
    } catch (error) {
      Alert.alert("Attention", "setPassword est obligatoire");
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, ...styles }}>
      <Text
        style={{
          marginBottom: 30,
          fontWeight: "bold",
          color: "#454545",
          fontSize: 36,
          textAlign: "center",
          alignSelf: "center",
          position: "absolute",
          marginTop: DIMENSIONS.height * 0.15,
          ...titleStyle,
        }}
      >
        {title}
      </Text>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        <View style={{}}></View>
        <View style={{}}>
          <RenderInput
            value={email}
            errors={errors}
            //@ts-ignore
            error={errors?.email}
            label={labelEmail}
            onChange={onChange}
            leftIcon={leftIconEmail}
            textContentType={"username"}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />

          <RenderInput
            value={password}
            errors={errors}
            //@ts-ignore
            error={errors?.password}
            label={labelPassword}
            onChange={onChangePassword}
            leftIcon={leftIconPassword}
            textContentType={"password"}
            rightIcon={
              setShowPassword !== null &&
              (!showPassword ? (
                <TouchableOpacity
                  onPress={() => {
                    try {
                      setShowPassword(!showPassword);
                    } catch (error) {
                      Alert.alert(
                        "Attention",
                        "setShowPassword est obligatoire"
                      );
                    }
                  }}
                >
                  <Icon name="eye" size={24} color={colorIconPassword} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    try {
                      setShowPassword(!showPassword);
                    } catch (error) {
                      Alert.alert(
                        "Attention",
                        "setShowPassword est obligatoire"
                      );
                    }
                  }}
                >
                  <Icon
                    name="eye-with-line"
                    size={24}
                    color={colorIconPassword}
                  />
                </TouchableOpacity>
              ))
            }
            secureTextEntry={!showPassword}
          />
          {(facebook !== false || google !== false) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginBottom: 30,
              }}
            >
              {facebook !== false && (
                <TouchableOpacity
                  //@ts-ignore
                  style={{
                    //@ts-ignore
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    //@ts-ignore
                    borderWidth: 1,
                    borderRadius: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    ...globalStyles.buttonShadow,
                    backgroundColor: "#fff",
                  }}
                  onPress={() => {
                    loginFacebook();
                  }}
                >
                  <IonIcon
                    name="logo-facebook"
                    size={17}
                    color={COLORS.facebook}
                  />
                  <Text
                    style={{
                      color: "rgba(0, 0, 0, 0.5)",
                      fontSize: 14,
                      fontWeight: "bold",
                      paddingLeft: 10,
                    }}
                  >
                    Facebook
                  </Text>
                </TouchableOpacity>
              )}

              {google !== false && (
                <TouchableOpacity
                  //@ts-ignore
                  style={{
                    //@ts-ignore
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    //@ts-ignore
                    borderWidth: 1,
                    borderRadius: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    ...globalStyles.buttonShadow,
                    backgroundColor: "#fff",
                  }}
                  onPress={() => {
                    loginGoogle();
                  }}
                >
                  <Image
                    source={require("./assets/icons/google.png")}
                    style={{
                      alignSelf: "center",
                      height: 18,
                      width: 18,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: "rgba(0, 0, 0, 0.5)",
                      fontSize: 14,
                      fontWeight: "bold",
                      paddingLeft: 10,
                    }}
                  >
                    Google
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 0,
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginRight: 10,
              marginTop: 20,
            }}
            onPress={pressForgotPassword}
          >
            <Text style={{ color: COLORS.text, ...forgotPasswordTextStyle }}>
              {forgotPasswordText}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <RenderButton
            title={textConnexion}
            Schema={Schema}
            startLoad={() => setLoading(true)}
            endLoad={() => setLoading(false)}
            setErrors={(error: string) => setErrors(error)}
            value={{ email, password }}
            submit={submit}
            loading={loading}
            styles={{ backgroundColor: "red" }}
            titleStyle={connexionTitleStyle}
            buttonStyle={connexionButtonStyle}
          />
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            marginTop: 20,
          }}
          onPress={pressRedirectRegister}
        >
          <Text
            style={{
              color: COLORS.bgApp,
              textAlign: "center",
              fontSize: 14,
              ...textRedirectRegisterStyle,
            }}
          >
            {textRedirectRegister}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};
