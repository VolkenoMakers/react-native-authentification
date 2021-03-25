import React from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Yup from "./shared/validator";
import Colors from "./constants/Colors";
import { RenderButton, RenderInput } from "./shared/renderInput";
import Icon from "react-native-vector-icons/Entypo";
import IonIcon from "react-native-vector-icons/Ionicons";
import * as Facebook from "expo-facebook";
import globalStyles from "./constants/globalStyles";
import * as Google from "expo-google-app-auth";

export function Register({
  setErrors,
  errors,
  setPassword,
  setPassword_confirmation,
  password,
  password_confirmation,
  setEmail,
  setFirstName,
  email,
  first_name = false,
  last_name = false,
  phone = false,
  adresse = false,
  facebook = false,
  setPhone,
  setLastName,
  setAdresse,
  setShowPassword,
  showPassword = false,
  title = "Register",
  labelEmail = "Adresse mail",
  labelFirstName = "Prénom",
  labelLastName = "Nom",
  labelAdresse = "Adresse",
  labelPhone = "Téléphone",
  labelPassword = "Mot de Passe",
  labelPassword_confirmation = "Confirmer mot de passe",
  titleStyle = {},
  colorIconPassword = Colors.bgApp,
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
  styles = {},
  OnSubmit,
  pressRedirectLogin,
  registerSocial,
}) {
  const Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Adresse Mail"),
    first_name:
      first_name !== false && Yup.string().min(1).required().label("Prénom"),
    last_name:
      last_name !== false && Yup.string().min(1).required().label("Nom"),
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
    if (password === password_confirmation) {
      OnSubmit();
    } else {
      Alert.alert("Attention", "Vérifier mot de passe");
    }
  };
  const [loading, setLoading] = React.useState(false);

  let onChange = (text) => {
    setEmail(text);
  };

  let onChangeFirstName = (text) => {
    setFirstName(text);
  };

  let onChangeLastName = (text) => {
    setLastName(text);
  };

  let onChangeAdresse = (text) => {
    setAdresse(text);
  };

  let onChangePhone = (text) => {
    setPhone(text);
  };

  let onChangePassword = (text) => {
    setPassword(text);
  };

  let onChangePassword_confirmation = (text) => {
    setPassword_confirmation(text);
  };

  const loginFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "796915091156923",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,last_name,email,short_name,first_name,picture&access_token=${token}`
        );
        const userInfo = await response.json();

        const userData = {
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          picture: userInfo?.picture?.data.url,
          username: userInfo?.short_name,
        };
        console.log("userInfo", userInfo);

        registerSocial(userData);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const loginGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "202172570263-s8heklurs23e1ep4h2dnhjderbhpqhck.apps.googleusercontent.com",
        iosClientId:
          "202172570263-69mqs4urp5sg7jh3af8jut6u9rohc25c.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const userData = {
          email: result.user.email,
          first_name: result.user.givenName,
          last_name: result.user.familyName,
          picture: result.user.photoUrl,
        };
        console.log("sucess googgle login", result);
        registerSocial(userData);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("e login google erreur", e);
      return { error: true };
    }
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, ...styles }}>
      <ScrollView bounces={false}>
        <View>
          <Text
            style={{
              marginVertical: 30,
              fontWeight: "bold",
              color: "#454545",
              fontSize: 36,
              textAlign: "center",
              ...titleStyle,
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          {first_name !== false && (
            <RenderInput
              value={first_name}
              errors={errors}
              error={errors?.first_name}
              label={labelFirstName}
              onChange={onChangeFirstName}
              leftIcon={leftIconFirstName}
              autoCapitalize={"words"}
            />
          )}
          {last_name !== false && (
            <RenderInput
              value={last_name}
              errors={errors}
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
            error={errors?.email}
            label={labelEmail}
            onChange={onChange}
            leftIcon={leftIconEmail}
            textContentType={"username"}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />

          {adresse !== false && (
            <RenderInput
              value={adresse}
              errors={errors}
              error={errors?.adresse}
              label={labelAdresse}
              onChange={onChangeAdresse}
              leftIcon={leftIconAdresse}
              autoCapitalize={"words"}
            />
          )}
          {phone !== false && (
            <RenderInput
              value={phone}
              errors={errors}
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
            error={errors?.password_confirmation}
            label={labelPassword_confirmation}
            onChange={onChangePassword_confirmation}
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

          {facebook !== false && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginBottom: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  borderColor: "rgba(0, 0, 0, 0.1)",
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
                  color={Colors.facebook}
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

              <TouchableOpacity
                style={{
                  borderColor: "rgba(0, 0, 0, 0.1)",
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
            </View>
          )}

          <RenderButton
            title={textButtonRegister}
            Schema={Schema}
            startLoad={() => setLoading(true)}
            endLoad={() => setLoading(false)}
            setErrors={(error) => setErrors(error)}
            email={email}
            password={password}
            value={{
              email,
              password,
              password_confirmation,
              first_name: first_name !== false,
              last_name: last_name !== false,
            }}
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
              color: Colors.bgApp,
              textAlign: "center",
              fontSize: 14,
              ...textRedirectLoginStyle,
            }}
          >
            {textRedirectLogin}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export function Login({
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
  colorIconPassword = Colors.bgApp,
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
}) {
  const Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Adresse Mail"),
    password: Yup.string().required().label("Mot de passe"),
  });
  const submit = () => {
    OnSubmit();
  };
  const [loading, setLoading] = React.useState(false);

  let onChange = (text) => {
    setEmail(text);
  };
  let onChangePassword = (text) => {
    setPassword(text);
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, ...styles }}>
      <View
        style={{
          flex: 1,
          marginTop: Dimensions.get("window").height * 0.1,
        }}
      >
        <Text
          style={{
            marginVertical: 30,
            fontWeight: "bold",
            color: "#454545",
            fontSize: 36,
            textAlign: "center",
            ...titleStyle,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <RenderInput
          value={email}
          errors={errors}
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
          error={errors?.password}
          label={labelPassword}
          onChange={onChangePassword}
          leftIcon={leftIconPassword}
          textContentType={"password"}
          rightIcon={
            setShowPassword !== undefined &&
            (!showPassword ? (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name="eye" size={24} color={colorIconPassword} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
      </View>
      <View
        style={{
          marginTop: 10,
          flex: 1,
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
          <Text style={{ color: Colors.text, ...forgotPasswordTextStyle }}>
            {forgotPasswordText}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <RenderButton
          title={textConnexion}
          Schema={Schema}
          startLoad={() => setLoading(true)}
          endLoad={() => setLoading(false)}
          setErrors={(error) => setErrors(error)}
          value={{ email, password }}
          submit={submit}
          styles={{ backgroundColor: "red" }}
          titleStyle={connexionTitleStyle}
          buttonStyle={connexionButtonStyle}
        />
      </View>

      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          flex: 1,
        }}
        onPress={pressRedirectRegister}
      >
        <Text
          style={{
            color: Colors.bgApp,
            textAlign: "center",
            fontSize: 14,
            ...textRedirectRegisterStyle,
          }}
        >
          {textRedirectRegister}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function RequestPasswordReset({
  setErrors,
  errors,
  setEmail,
  email,
  title = "Veuillez entrer votre email Nous vous enverrons un lien pour modifier le mot de passe",
  labelEmail = "Adresse mail",
  titleStyle = {},
  textConnexion = "Valider",
  connexionTitleStyle = {},
  connexionButtonStyle = {},
  leftIconEmail = {},
  textRedirectLogin,
  textRedirectLoginStyle = {},
  styles = {},
  OnSubmit,
  pressRedirectLogin,
}) {
  const Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Adresse Mail"),
  });
  const submit = () => {
    OnSubmit();
  };
  const [loading, setLoading] = React.useState(false);

  let onChange = (text) => {
    setEmail(text);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
        ...styles,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "rgba(0,0,0,.6)",
          ...titleStyle,
        }}
      >
        {title}
      </Text>
      <View style={{ marginTop: Dimensions.get("window").height * 0.05 }}>
        <RenderInput
          value={email}
          errors={errors}
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
          title={textConnexion}
          Schema={Schema}
          startLoad={() => setLoading(true)}
          endLoad={() => setLoading(false)}
          setErrors={(error) => setErrors(error)}
          value={{ email }}
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
            color: Colors.bgApp,
            textAlign: "center",
            fontSize: 14,
            ...textRedirectLoginStyle,
          }}
        >
          {textRedirectLogin}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function ResetPassword({
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
  colorIconPassword = Colors.bgApp,
  textConnexion = "Valider",
  connexionTitleStyle = {},
  connexionButtonStyle = {},
  leftIconPassword = {},
  leftIconEmail = {},
  leftIconCode = {},
  styles = {},
  OnSubmit,
}) {
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
    OnSubmit();
  };

  const [loading, setLoading] = React.useState(false);

  let onChange = (text) => {
    setEmail(text);
  };
  let onChangePassword = (text) => {
    setPassword(text);
  };

  let onChangeConfrimPassword = (text) => {
    setConfrimPassword(text);
  };

  let onChangeCode = (text) => {
    setCode(text);
  };

  let value = {
    email,
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        ...styles,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "rgba(0,0,0,.6)",
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
          error={errors?.code}
          label={labelCode}
          onChange={onChangeCode}
          leftIcon={leftIconCode}
          keyboardType={"number-pad"}
        />
        <RenderInput
          value={email}
          errors={errors}
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
          error={errors?.password}
          label={labelPassword}
          onChange={onChangePassword}
          leftIcon={leftIconPassword}
          textContentType={"password"}
          rightIcon={
            setShowPassword !== undefined &&
            (!showPassword ? (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name="eye" size={24} color={colorIconPassword} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
          error={errors?.confrimPassword}
          label={labelConfrimPassword}
          onChange={onChangeConfrimPassword}
          leftIcon={leftIconPassword}
          textContentType={"password"}
          rightIcon={
            setShowPassword !== undefined &&
            (!showPassword ? (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name="eye" size={24} color={colorIconPassword} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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

        <RenderButton
          title={textConnexion}
          Schema={Schema}
          startLoad={() => setLoading(true)}
          endLoad={() => setLoading(false)}
          setErrors={(error) => setErrors(error)}
          value={{ email, code, password, confrimPassword }}
          submit={submit}
          styles={{ backgroundColor: "red" }}
          titleStyle={connexionTitleStyle}
          buttonStyle={connexionButtonStyle}
        />
      </View>
    </View>
  );
}
