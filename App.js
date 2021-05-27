import React from "react";
import { StyleSheet, View } from "react-native";
import { Login, Register, RequestPasswordReset, ResetPassword } from "./Auth";
import Colors from "./constants/Colors";
import { Alert } from "react-native";

export default function App() {
  const [email, setEmail] = React.useState("");
  //const [code, setCode] = React.useState("");
  const [adresse, setAdresse] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_confirmation, setPassword_confirmation] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const submit = async () => {
    Alert.alert("Félicitation", "Connexion réussie");
  };

  const loginGoogle = async () => {
    Alert.alert("Félicitation", "Register Google");
  };

  const loginFacebook = async () => {
    Alert.alert("", "Register Facebook");
  };

  return (
    <View style={styles.container}>
      <Login
        /*  OnSubmit={submit}
        email={email}
        setEmail={setEmail}
        adresse={adresse}
        setAdresse={setAdresse}
        password={password}
        setPassword={setPassword}
        last_name={last_name}
        setLastName={setLastName}
        first_name={first_name}
        setFirstName={setFirstName}
        password_confirmation={password_confirmation}
        setPassword_confirmation={setPassword_confirmation} */
        errors={errors}
        textRedirectLogin={"Je suis déjà inscrit"}
        setErrors={setErrors}
        facebook
        google
        OnSubmitFacebook={loginFacebook}
        OnSubmitGoogle={loginGoogle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
