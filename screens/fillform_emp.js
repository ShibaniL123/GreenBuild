import React, { Component, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import t from "tcomb-form-native"; // 0.6.9
var transform = require("tcomb-json-schema");
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";

const Form = t.form.Form;

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
      color: "grey",
    },
  },
  controlLabel: {
    normal: {
      color: "blue",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600",
    },
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600",
    },
  },
};

const options = {
  /*fields: {
    name: {
      error:
        "Without an email address how are you going to reset your password when you forget it?",
    },
    password: {
      error:
        "Choose something you use on a dozen other sites or something you won't remember",
    },
    terms: {
      label: "Agree to Terms",
    },
  },*/
  stylesheet: formStyles,
};
var a2;
export default class fillform_emp extends Component {
  saveitem(value) {
    //console.log(this.state.text);
    //const title = this.props.navigation.getParam("formname");
    const newuser = firebase.database().ref(title + "_data");
    newuser.push().set({ value });
  }
  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }
  handleSubmit = () => {
    //console.log(text1);
    var value = this._form.getValue();
    if (value) {
      //console.log(user);
      console.log("value: ", value);
      console.log("type ", typeof value);
      this.saveitem(value);
      // clear all fields after submit
      this.clearForm();
      Alert.alert("Form Submitted!");
      //this.props.navigation.navigate("Home_admin");
    }
  };

  render() {
    var a1;
    var a2;
    function read_data(title) {
      const work = firebase
        .database()
        .ref(title + "_struct")
        .on("value", (snapshot) => {
          a1 = Object.values(snapshot.val())[0];
          console.log("User data: ", Object.values(snapshot.val()));
        });
      console.log("a1:", a1);
      a2 = a1.datastruct;
    }
    //const title = navigation.getParam("formname");
    read_data(title);
    console.log("a2:", a2);
    console.log(typeof a2);
    var TcombType = transform(a2);
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.getParam("formname")}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
});

this.props.navigation.getParam("formname");
