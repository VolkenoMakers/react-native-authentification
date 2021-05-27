import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Login, Register, RequestPasswordReset, ResetPassword } from "./Auth";

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
  return (
    <View style={styles.container}>
      <ResetPassword
        setErrors={setErrors}
        errors={errors}
        setEmail={setEmail}
        email={email}
        OnSubmit={submit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
