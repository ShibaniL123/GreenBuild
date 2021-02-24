import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  AsyncStorage,
} from "react-native";
import * as firebase from "firebase";
import { styles } from "../styles/globalStyles";

export default class Loading extends React.Component {
  static navigationOptions = {
    header: null,
  };
  async addname(nametemp) {
    AsyncStorage.setItem("name", nametemp);
    //let name1 = await AsyncStorage.getItem("name");
    //console.log(name1);
  }
  async displayData() {
    try {
      //console.log("here");
      let user = await AsyncStorage.getItem("name");
      // alert(user);
    } catch (error) {
      alert(error);
    }
  }
  async componentDidMount() {
    var flag = 0;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //check if user is admin or employee
        const adminlist = firebase.database().ref("adminnames");
        adminlist.on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val().email);
            console.log(user.email == childSnapshot.val().email);
            if (user.email == String(childSnapshot.val().email)) {
              flag = 1;
              //this.props.navigation.push("Home_admin");
            }
          });
          const userlist = firebase.database().ref("users");
          userlist.on("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              //console.log("data:")
              //console.log(user.email)
              //console.log(childSnapshot.val().email)
              if (user.email == childSnapshot.val().email) {
                //console.log(childSnapshot.val().email)
                this.addname(childSnapshot.val().name);
                this.displayData();
              }
            });
          });
          if (flag == 1) {
            this.props.navigation.push("Home_admin");
          } else {
            this.props.navigation.push("home_employee");
          }
        });
      } else {
        this.props.navigate.navigate("login");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#d9534f" />
      </View>
    );
  }
}
