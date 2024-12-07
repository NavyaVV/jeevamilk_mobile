import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import { Context } from "../context/Store";
import { storeUserDataAsync } from "../helper";
import LogoBlue from "../assets/logo/logo_blue.png";
import { AuthContext } from "../context/AuthContext";
import { loginFarmer } from "../api/auth";
import { EyeIcon, EyeOff } from "../assets/svg-icons";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useContext(Context);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    // Implement your login logic here
    if (username.length > 3 && password.length > 3) {
      const res = await loginFarmer(username, password);
      if (res.data.app_data.StatusCode === 6000) {
        const userData = {
          access: res.data.app_data.data.access.access,
          refresh: res.data.app_data.data.access.refresh,
          isVerified: true,
        };
        dispatch({ type: "UPDATE_USER_DATA", payload: userData });
        await storeUserDataAsync(userData);
        login();
      } else {
        Alert.alert("Validation Error", [{ text: "OK" }], {
          cancelable: false,
        });
      }
    } else {
      Alert.alert(
        "Error",
        "Contact your registered society for your login credentials.",
        [{ text: "CONTINUE" }],
        { cancelable: false }
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.MainContaine}>
        <View style={styles.TopCover}>
          <View style={styles.OuterCircle}>
            <View style={styles.InnerCircle}>
              <Image source={LogoBlue} style={styles.LogoImage} />
            </View>
          </View>
        </View>
        <View style={styles.ContainerWhite}>
          <Text style={styles.Heading}>Login to Your Account</Text>
          <Text style={styles.SubHead}>
            Login with the credentials provided from the society.
          </Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="gray"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <EyeIcon />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  formContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },
  Heading: {
    fontSize: 30,
    // fontWeight:700,
    color: "#191919",
    paddingBottom: 20,
  },
  input: {
    width: "100%",
    height: 56,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    color: "#000",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 140,
    padding: 5,
  },
  ContainerWhite: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 40,
    position: "absolute",
    bottom: 0,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#56C9DC",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  TopCover: {
    paddingVertical: 70,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  OuterCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 2,
    borderColor: "#CEECF1",
    alignItems: "center",
    justifyContent: "center",
  },
  InnerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 10,
    borderColor: "#53C6DA29",
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  SubHead: {
    fontSize: 18,
    textAlign: "center",
    width: "70%",
    color: "#ADADAD",
  },
  MainContaine: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F3F8F9",
  },
  LogoImage: {
    width: "60%",
    objectFit: "contain",
  },
});

export default LoginScreen;
