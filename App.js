import React from "react";
import { StyleSheet, View } from "react-native";
import { Login, Register, RequestPasswordReset, ResetPassword } from "./Auth";
import Colors from "./constants/Colors";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_confirmation, setPassword_confirmation] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const submit = async () => {
    Alert.alert("Félicitation", "Connexion réussie");
  };

  return (
    <View style={styles.container}>
      <Register
        OnSubmit={submit}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        email={email}
        code={code}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        password_confirmation={password_confirmation}
        setPassword_confirmation={setPassword_confirmation}
        setCode={setCode}
        errors={errors}
        setErrors={setErrors}
        textRedirectLoginStyle={{ color: "red" }}
        textRedirectLogin="Je n'ai pas encore de compte"
        styles={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
