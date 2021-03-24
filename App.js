import React from "react";
import { StyleSheet, View } from "react-native";
import { Login, Register, RequestPasswordReset, ResetPassword } from "./Auth";
import Colors from "./constants/Colors";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const submit = async () => {
    Alert.alert("Félicitation", "Connexion réussie");
  };

  return (
    <View style={styles.container}>
      <ResetPassword
        OnSubmit={submit}
        pressRedirectLogin={() => {
          Alert.alert("redirect regidter");
        }}
        email={email}
        code={code}
        setEmail={setEmail}
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
