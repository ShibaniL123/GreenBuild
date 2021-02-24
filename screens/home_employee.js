import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
import { Card } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

var transform = require("tcomb-json-schema");
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
export default class create_user extends React.Component {
  state = {
    formname: "",
    mylist: [],
  };
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  backAction = () => {
    Alert.alert("Hold on!", "Do you want to exit app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          //    transform.resetFormats();
          BackHandler.exitApp();
        },
      },
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    return (
      <LinearGradient
        // Background Linear Gradient
        colors={["rgb(0, 128, 0)", "white"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View
          style={[styles.containerlist, { backgroundColor: "transparent" }]}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("form_list_emp");
            }}
          >
            <Card containerStyle={styles.card1}>
              <Card.Title>Fill Form</Card.Title>
              <Card.Divider style={{ height: 1.5 }} />
              {/*react-native-elements Card*/}
              <Text style={styles.paragraph}>
                Fill one of the available forms
              </Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("view_sub_emp");
            }}
          >
            <Card containerStyle={styles.card1}>
              <Card.Title>View my submissions</Card.Title>
              <Card.Divider style={{ height: 1.5 }} />
              {/*react-native-elements Card*/}
              <Text style={styles.paragraph}>
                Preview of your previous submissions
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.enterbutton]}
          onPress={() => {
            Alert.alert(
              "Are you sure you want to Log out",
              "Confirm",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    console.log("OK Pressed");
                    this.logout;
                    this.props.navigation.navigate("Login");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={styles.loginText}>Log out</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
