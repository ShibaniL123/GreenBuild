//authentication
import React from "react";
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  Image,
  Text,
} from "react-native";
import * as firebase from "firebase";
import { styles } from "../styles/globalStyles";

export default class Welcome extends React.Component {
  static navigationOptions = {
    header: null,
  };

  //if already logged in, send to loading page, else go to login page
  async componentDidMount() {
    let email = await AsyncStorage.getItem("email");
    let password = await AsyncStorage.getItem("password");
    console.log(email);
    if ((email !== null) & (password !== null)) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.push("Loading");
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } else {
      this.props.navigation.push("Login");
    }
  }

  render() {
    return (
      <View style={styles.container2}>
        <Text>Welcome</Text>
        <Image
          style={styles.stretch}
          source={require("../assets/formify1.png")}
        />
      </View>
    );
  }
}
