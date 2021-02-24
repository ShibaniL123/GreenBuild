//form structure collected and sent to finalfill.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  FlatList,
} from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";

export default class fillform extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: {},
      presentToDo: "",
    };
  }
  componentDidMount() {
    const plswork = firebase
      .database()
      .ref("forms_struct")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let todoItems = { ...data };
        this.setState({
          todos: todoItems,
        });
      });
  }
  render() {
    var obj2;
    var obj;
    var image = "";
    const form_name = this.props.navigation.getParam("formname");
    let todosKeys = Object.keys(this.state.todos);
    todosKeys.map((key) => {
      obj = this.state.todos[key];
      if (obj.formname == form_name) {
        console.log("WORKED", obj);
        obj2 = obj.datastruct;
        if (obj.image_ques1 != "") {
          image = obj.image_ques1;
        }
      }
    });
    //console.log("OBJ2:", obj2);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            if (obj2) {
              this.props.navigation.navigate("finalfill", {
                myjson: obj2,
                title1: form_name,
                ques1: image,
              });
              //Alert.alert("OBJ");
            } else {
              Alert.alert("WAIT!");
            }
          }}
        >
          <Text style={styles.loginText}>
            Fill form {this.props.navigation.getParam("formname")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
