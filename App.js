import React from "react";
import { StyleSheet, View } from "react-native";
import Register from "./Register";
import Colors from "./constants/Colors";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [adresse, setAdresse] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_confirmation, setPassword_confirmation] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const submit = async () => {
    Alert.alert("Félicitation", "Connexion réussie");
  };

  console.log("password_confirmation", password_confirmation);

  return (
    <View style={styles.container}>
      <Register
        OnSubmit={submit}
        pressRedirectLogin={() => {
          Alert.alert("redirect regidter");
        }}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        //first_name={first_name}
        setFirstName={setFirstName}
        //last_name={last_name}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        password_confirmation={password_confirmation}
        setPassword_confirmation={setPassword_confirmation}
        //adresse={adresse}
        setAdresse={setAdresse}
        errors={errors}
        setErrors={setErrors}
        textRedirectLogin="Je n'ai pas encore de compte"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
