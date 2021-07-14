import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ResetPassword, RequestPasswordReset, Login, Register } from "./Auth";

export default function App() {
  const [email, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [code, setCode] = React.useState(0);
  const [adresse, setAdresse] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confrimPassword, setConfrimPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const submit = async () => {
    Alert.alert("Félicitation", "Connexion réussie");
  };
  return (
    <View style={styles.container}>
      <Register
        setErrors={setErrors}
        errors={errors}
        setEmail={setEmail}
        email={email}
        password={password}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        /*  code={code}
        setCode={setCode}
        
        confrimPassword={confrimPassword}
        setConfrimPassword={setConfrimPassword}
        
        OnSubmit={submit} */
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
