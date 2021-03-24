import React from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Yup from "./shared/validator";
import Colors from "./constants/Colors";
import { RenderButton, RenderInput } from "./shared/renderInput";
import Icon from "react-native-vector-icons/Entypo";

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
  textConnexion = "S'inscrire",
  connexionTitleStyle = {},
  connexionButtonStyle = {},
  leftIconPassword = {},
  leftIconEmail = {},
  leftIconFirstName = {},
  leftIconLastName = {},
  leftIconAdresse = {},
  leftIconPhone = {},
  textRedirectLogin,
  textRedirectLoginStyle = {},
  styles = {},
  OnSubmit,
  pressRedirectLogin,
}) {
  const Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Adresse Mail"),
    first_name:
      first_name !== false && Yup.string().min(1).required().label("Prénom"),
    last_name:
      last_name !== false && Yup.string().min(1).required().label("Nom"),
    password: Yup.string().required().label("Mot de passe"),
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
          <RenderButton
            title={textConnexion}
            Schema={Schema}
            startLoad={() => setLoading(true)}
            endLoad={() => setLoading(false)}
            setErrors={(error) => setErrors(error)}
            email={email}
            password={password}
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
  textRedirectRegister,
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
          email={email}
          password={password}
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
  const [password, setPassword] = React.useState(false);

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
          email={email}
          password={password}
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
      .label("Confirmer Nouveau Mot de Passe"),
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
          email={email}
          password={password}
          submit={submit}
          styles={{ backgroundColor: "red" }}
          titleStyle={connexionTitleStyle}
          buttonStyle={connexionButtonStyle}
        />
      </View>
    </View>
  );
}
