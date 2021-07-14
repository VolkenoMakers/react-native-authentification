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

  setPassword_confirmation: any;
  password_confirmation: string;

  setCode: any;
  code: number;

  setEmail: any;
  email: string;

  setFirstName: any;
  first_name: string;

  setLastName: any;
  last_name: string;

  setPhone: any;
  phone: string;

  setAdresse: any;
  adresse: string;

  setShowPassword: any;

  showPassword: boolean;
  facebook: boolean;
  google: boolean;

  labelFirstName: string;
  title: string;
  labelEmail: string;
  labelPassword: string;
  labelConfrimPassword: string;
  textValidate: string;
  colorIconPassword: string;
  labelCode: string;
  textRedirectLogin: string;
  labelPassword_confirmation: string;
  labelPhone: string;

  leftIconPassword: object;
  connexionTitleStyle: object;
  connexionButtonStyle: object;
  leftIconEmail: object;
  leftIconCode: object;
  titleStyle: object;
  styles: object;
  ButtonRedirectLoginStyle: object;
  textRedirectLoginStyle: object;
  textButtonRegister: string;
  labelAdresse: string;
  labelLastName: string;

  OnSubmit: any;
  pressRedirectLogin: any;
  OnSubmitGoogle: any;
  OnSubmitFacebook: any;
  leftIconPhone: any;
  leftIconAdresse: any;
  leftIconLastName: any;
  leftIconFirstName: any;
};
export const Register: React.FC<Props> = ({
  setErrors,
  errors,
  setPassword,
  setPassword_confirmation,
  password,
  password_confirmation,
  setEmail,
  setFirstName,
  email,
  first_name,
  last_name,
  phone,
  adresse,
  facebook,
  setPhone,
  setLastName,
  setAdresse,
  setShowPassword,
  showPassword,
  title = "Register",
  labelEmail = "Adresse mail",
  labelFirstName = "Prénom",
  labelLastName = "Nom",
  labelAdresse = "Adresse",
  labelPhone = "Téléphone",
  labelPassword = "Mot de Passe",
  labelPassword_confirmation = "Confirmer mot de passe",
  titleStyle = {},
  colorIconPassword = COLORS.bgApp,
  textButtonRegister = "S'inscrire",
  connexionTitleStyle = {},
  connexionButtonStyle = {},
  leftIconPassword = {},
  leftIconEmail = {},
  leftIconFirstName = {},
  leftIconLastName = {},
  leftIconAdresse = {},
  leftIconPhone = {},
  textRedirectLogin = "Je suis déjà inscrit",
  textRedirectLoginStyle = {},
  ButtonRedirectLoginStyle = {},
  styles = {},
  OnSubmit,
  pressRedirectLogin,
  google,
  OnSubmitFacebook,
  OnSubmitGoogle,
}) => {
  const Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Adresse Mail"),
    first_name: Yup.string().min(1).required().label("Prénom"),
    last_name: Yup.string().min(1).required().label("Nom"),
    password: Yup.string().required().label("Mot de passe"),
    password_confirmation: Yup.string()
      .required()
      .label("Confirmer Mot de Passe")
      .test(
        "passwords-match",
        "Confirmer mot de passe doit correspondre Mot De Passe",
        function (value) {
          return this.parent.password === value;
        }
      ),
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

  let onChangeFirstName = (text: string) => {
    try {
      setFirstName(text);
    } catch (error) {
      Alert.alert("Attention", "setFirstName est obligatoire");
    }
  };

  let onChangeLastName = (text: string) => {
    try {
      setLastName(text);
    } catch (error) {
      Alert.alert("Attention", "setLastName est obligatoire");
    }
  };

  let onChangeAdresse = (text: string) => {
    try {
      setAdresse(text);
    } catch (error) {
      Alert.alert("Attention", "setAdresse est obligatoire");
    }
  };

  let onChangePhone = (text: string) => {
    try {
      setPhone(text);
    } catch (error) {
      Alert.alert("Attention", "setPhone est obligatoire");
    }
  };

  let onChangePassword = (text: string) => {
    try {
      setPassword(text);
    } catch (error) {
      Alert.alert("Attention", "setPassword est obligatoire");
    }
  };

  let onChangePassword_confirmation = (text: string) => {
    try {
      setPassword_confirmation(text);
    } catch (error) {
      Alert.alert("Attention", "setPassword_confirmation est obligatoire");
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
        <View style={{}}>
          {first_name && (
            <RenderInput
              value={first_name}
              errors={errors}
              //@ts-ignore
              error={errors?.first_name}
              label={labelFirstName}
              onChange={onChangeFirstName}
              leftIcon={leftIconFirstName}
              autoCapitalize={"words"}
            />
          )}
          {last_name && (
            <RenderInput
              value={last_name}
              errors={errors}
              //@ts-ignore
              error={errors?.last_name}
              label={labelLastName}
              onChange={onChangeLastName}
              leftIcon={leftIconLastName}
              autoCapitalize={"words"}
            />
          )}

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

          {adresse && (
            <RenderInput
              value={adresse}
              errors={errors}
              //@ts-ignore
              error={errors?.adresse}
              label={labelAdresse}
              onChange={onChangeAdresse}
              leftIcon={leftIconAdresse}
              autoCapitalize={"words"}
            />
          )}
          {phone && (
            <RenderInput
              value={phone}
              errors={errors}
              //@ts-ignore
              error={errors?.phone}
              label={labelPhone}
              onChange={onChangePhone}
              leftIcon={leftIconPhone}
              keyboardType={"number-pad"}
            />
          )}

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
              setShowPassword !== undefined &&
              (!showPassword ? (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon name="eye" size={24} color={colorIconPassword} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
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

          <RenderInput
            value={password_confirmation}
            errors={errors}
            //@ts-ignore
            error={errors?.password_confirmation}
            label={labelPassword_confirmation}
            onChange={onChangePassword_confirmation}
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

          {(facebook || google) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginTop: 20,
              }}
            >
              {facebook && (
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
                  onPress={loginFacebook}
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

              {google && (
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
                  onPress={loginGoogle}
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
          <View
            style={{
              marginTop: 30,
            }}
          >
            <RenderButton
              title={textButtonRegister}
              Schema={Schema}
              startLoad={() => setLoading(true)}
              endLoad={() => setLoading(false)}
              setErrors={(error: string) => setErrors(error)}
              loading={loading}
              value={{
                email,
                password,
                password_confirmation,
                first_name: first_name,
                last_name: last_name,
              }}
              submit={submit}
              styles={{ backgroundColor: "red" }}
              titleStyle={connexionTitleStyle}
              buttonStyle={connexionButtonStyle}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            marginTop: 30,
            marginBottom: 20,
            ...ButtonRedirectLoginStyle,
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
