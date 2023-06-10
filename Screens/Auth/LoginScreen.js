import {
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import {authSignInUser} from '../../redux/auth/authOperations'

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const emailHandler = (text) => {
    setEmail(text);
  };
  const passwordHandler = (text) => {
    setPassword(text);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handalSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    console.log(data);
dispatch(authSignInUser(data))
    Keyboard.dismiss();
    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/image/PhotoBG.jpg")}
        >
          <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
            <View
              style={{
                ...styles.form,
                marginBottom:
                  isShowKeyboard && Platform.OS == "android" ? 32 : 110,
              }}
            >
              <TextInput
                style={styles.containerInput}
                placeholder="email"
                onChangeText={emailHandler}
                value={email}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.containerInput}
                  placeholder="password"
                  value={password}
                  secureTextEntry={true}
                  onChangeText={passwordHandler}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={handalSubmit}
              >
                <Text style={styles.btnText}>REGISTER</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnSignIn}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.btnSignInText}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },

  containerInput: {
    borderWidth: 1,
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
  },

  form: {
    marginHorizontal: 16,
    // justifyContent: "flex-start",
    // marginBottom: 32,
  },

  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    padding: 16,
    height: 51,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  btnSignIn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  btnSignInText: {
    color: "#1B4371",
  },
});
