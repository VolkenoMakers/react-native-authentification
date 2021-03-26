import React from "react";
import { StyleSheet, View } from "react-native";
import { Login, Register, RequestPasswordReset, ResetPassword } from "./Auth";
import Colors from "./constants/Colors";
import { Alert } from "react-native";

export default function App() {
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confrimPassword, setConfrimPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const submit = async () => {
    Alert.alert("Félicitation", "Connexion réussie");
  };

  return (
    <View style={styles.container}>
      <ResetPassword
        OnSubmit={submit}
        email={email}
        setEmail={setEmail}
        code={code}
        setCode={setCode}
        password={password}
        setPassword={setPassword}
        confrimPassword={confrimPassword}
        setConfrimPassword={setConfrimPassword}
        errors={errors}
        setErrors={setErrors}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
