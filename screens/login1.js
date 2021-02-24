//login page
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  AsyncStorage,
} from "react-native";
import * as firebase from "firebase";
import { styles } from "../styles/globalStyles";
import { firebaseConfig } from "../database/firebase";
import { Input } from "react-native-elements";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  storelogin = async (email, password) => {
    try {
      await AsyncStorage.setItem("id", email);
      await AsyncStorage.setItem("pass", password);
    } catch (error) {
      console.log(error);
    }
  };

  usersignin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(async () => {
        await AsyncStorage.setItem("email", this.state.username);
        await AsyncStorage.setItem("password", this.state.password);
        this.props.navigation.push("Loading");
      })
      .catch((error) => {
        if (error.message == "The email address is badly formatted.") {
          Alert.alert("Note: Please check your email again");
        } else {
          Alert.alert(error.message);
        }
      });
  }
  render() {
    return (
      //console.log("hiii");
      <View style={[styles.container]}>
        <Text style={styles.logo}>GreenBuildd</Text>
        <Input
          label="Email"
          placeholder="eg johndoe@gmail.com"
          leftIcon={{
            type: "MaterialCommunityIcons",
            name: "email",
            color: "green",
          }}
          style={styles}
          onChangeText={(value) => this.setState({ username: value })}
          labelStyle={[styles.titleText, { color: "green" }]}
          inputContainerStyle={{ borderBottomColor: "green" }}
        />
        <Input
          label="Password"
          placeholder="eg password123"
          leftIcon={{
            type: "FontAwesome",
            name: "lock",
            color: "green",
          }}
          style={styles}
          onChangeText={(value) => this.setState({ password: value })}
          labelStyle={[styles.titleText, { color: "green" }]}
          inputContainerStyle={{ borderBottomColor: "green" }}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            this.usersignin();
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
