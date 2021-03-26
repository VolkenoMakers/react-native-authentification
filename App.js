import React from "react";
import { StyleSheet, View } from "react-native";
import { Login, Register, RequestPasswordReset, ResetPassword } from "./Auth";
import Colors from "./constants/Colors";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_confirmation, setPassword_confirmation] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const submit = async () => {
    Alert.alert("Félicitation", "Connexion réussie");
  };

  const registerSocialSubmit = async (data) => {
    console.log("registerSocialSubmit", data);
    Alert.alert("Félicitation", "Connexion réussie");
  };

  return (
    <View style={styles.container}>
      <Login
        OnSubmit={submit}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        password_confirmation={password_confirmation}
        setPassword_confirmation={setPassword_confirmation}
        errors={errors}
        setErrors={setErrors}
        registerSocialSubmit={registerSocialSubmit}
        facebook
        google
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
