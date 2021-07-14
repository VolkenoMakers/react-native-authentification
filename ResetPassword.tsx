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

  setPassword: any;
  password: string;

  setConfrimPassword: any;
  confrimPassword: string;

  setCode: any;
  code: number;

  setEmail: any;
  email: string;

  setShowPassword: any;
  showPassword: boolean;

  title: string;
  labelEmail: string;
  labelPassword: string;
  labelConfrimPassword: string;
  textValidate: string;
  colorIconPassword: string;
  labelCode: string;

  leftIconPassword: object;
  connexionTitleStyle: object;
  connexionButtonStyle: object;
  leftIconEmail: object;
  leftIconCode: object;
  titleStyle: object;
  styles: object;
  OnSubmit: any;
};

export const ResetPassword: React.FC<Props> = ({
  setErrors,
  errors,
  setPassword,
  setConfrimPassword,
  password,
  confrimPassword,
  setEmail,
  setCode,
  email,
  code,
  setShowPassword,
  showPassword = false,
  title = "Veuillez entrer votre code puis modifier votre mot de passe",
  labelEmail = "Adresse mail",
  labelCode = "Code",
  labelPassword = "Nouveau Mot de Passe",
  labelConfrimPassword = "Confirmer Nouveau Mot de Passe",
  titleStyle = {},
  colorIconPassword = COLORS.bgApp,
  textValidate = "Valider",
  connexionTitleStyle = {},
  connexionButtonStyle = {},
  leftIconPassword = {},
  leftIconEmail = {},
  leftIconCode = {},
  styles = {},
  OnSubmit,
}) => {
  const Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Adresse Mail"),
    code: Yup.string().required().label("code"),
    password: Yup.string().required().label("Nouveau Mot de Passe"),
    confrimPassword: Yup.string()
      .required()
      .label("Confirmer Nouveau Mot de Passe")
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
  let onChangePassword = (text: string) => {
    try {
      setPassword(text);
    } catch (error) {
      Alert.alert("Attention", "setPassword est obligatoire");
    }
  };

  let onChangeConfrimPassword = (text: string) => {
    try {
      setConfrimPassword(text);
    } catch (error) {
      Alert.alert("Attention", "setConfrimPassword est obligatoire");
    }
  };

  let onChangeCode = (text: string) => {
    try {
      setCode(text);
    } catch (error) {
      Alert.alert("Attention", "setCode est obligatoire");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
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
        <View
          style={{
            marginTop: Dimensions.get("window").height * 0.1,
          }}
        >
          <RenderInput
            value={code}
            errors={errors}
            // @ts-ignore
            error={errors?.code}
            label={labelCode}
            onChange={onChangeCode}
            leftIcon={leftIconCode}
            keyboardType={"number-pad"}
          />
          <RenderInput
            value={email}
            errors={errors}
            // @ts-ignore
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
            // @ts-ignore
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
            value={confrimPassword}
            errors={errors}
            // @ts-ignore
            error={errors?.confrimPassword}
            label={labelConfrimPassword}
            onChange={onChangeConfrimPassword}
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

          <View style={{ marginTop: DIMENSIONS.height * 0.05 }}>
            <RenderButton
              title={textValidate}
              Schema={Schema}
              startLoad={() => setLoading(true)}
              endLoad={() => setLoading(false)}
              setErrors={(error: string) => setErrors(error)}
              value={{ email, code, password, confrimPassword }}
              submit={submit}
              loading={loading}
              styles={{ backgroundColor: "red" }}
              titleStyle={connexionTitleStyle}
              buttonStyle={connexionButtonStyle}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
