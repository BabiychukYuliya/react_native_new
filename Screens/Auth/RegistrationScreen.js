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
  Image,
} from "react-native";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const loginHandler = (text) => {
    setLogin(text);
  };

  const emailHandler = (text) => {
    setEmail(text.trim());
  };

  const passwordHandler = (text) => {
    setPassword(text.trim());
  };

  const handalSubmit = () => {
    const data = {
      login,
      email,
      password,
    };
    console.log(data);
    dispatch(authSignUpUser(data));
    setLogin("");
    setEmail("");
    setPassword("");
    Keyboard.dismiss();
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
                // marginBottom:
                //   isShowKeyboard && Platform.OS == "android" ? 32 : 110,
              }}
            >
              <View style={styles.containerFoto}>
                <Image style={styles.foto} source={image} />
                <TouchableOpacity>
                  {image ? (
                    <Image
                      style={styles.deleteBtn}
                      source={require("../../assets/image/delete.png")}
                    />
                  ) : (
                    <Image
                      style={styles.addBtn}
                      source={require("../../assets/image/add.png")}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>Register</Text>
              <TextInput
                value={login}
                style={styles.containerInput}
                placeholder="login"
                onChangeText={loginHandler}
              ></TextInput>

              <TextInput
                style={{ ...styles.containerInput, marginTop: 16 }}
                placeholder="email"
                value={email}
                onChangeText={emailHandler}
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
                onPress={() => navigation.navigate("Login")}
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
  },

  form: {
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 78,
    paddingTop: 92,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  containerFoto: {
    top: -60,
    position: "relative",
    alignSelf: "center",
    marginTop: -92,
    marginBottom: 0,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },

  addBtn: {
    position: "absolute",
    bottom: -106,
    right: -12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#ffffff",
  },

  deleteBtn: {
    position: "absolute",
    bottom: -81,
    right: -12,
  },
  title: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 33,
    fontFamily: "Roboto-Regular",
    textAlign: "center",
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
