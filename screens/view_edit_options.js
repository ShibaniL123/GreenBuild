import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
import DialogInput from "react-native-dialog-input";

export default class view_edit_options extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: {},
      presentToDo: "",
      isDialogVisible: false,
    };
  }
  showDialog(isShow) {
    this.setState({ isDialogVisible: isShow });
  }
  sendInput(inputText) {
    console.log("sendInput (DialogInput#1): " + inputText);
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
    const form_name = this.props.navigation.getParam("formname");
    let todosKeys = Object.keys(this.state.todos);
    todosKeys.map((key) => {
      obj = this.state.todos[key];
      if (obj.formname == form_name) {
        //console.log("WORKED", obj);
        obj2 = obj;
      }
    });
    return (
      <View style={styles.container}>
        <Text style={styles.titleText1}>{form_name} -></Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            if (obj2) {
              this.props.navigation.navigate("view_form", {
                myjson: obj2,
                title1: form_name,
              });
            } else {
              Alert.alert("WAIT!");
            }
          }}
        >
          <Text style={styles.loginText}>View Template</Text>
        </TouchableOpacity>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={"Enter title of the form"}
          message={"Enter title of the new form"}
          hintInput={"eg Product Efficiency check"}
          submitInput={(inputText) => {
            //console.log("sendInput (DialogInput#1): " + inputText);
            if (obj2) {
              //console.log("HERE", obj2);
              this.showDialog(false);
              this.props.navigation.navigate("edit", {
                myjson: obj2,
                title1: inputText,
              });
              //Alert.alert("OBJ");
            } else {
              Alert.alert("WAIT!");
            }
            //this.sendInput(inputText);
          }}
          closeDialog={() => {
            this.showDialog(false);
          }}
        ></DialogInput>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            this.showDialog(true);
          }}
        >
          <Text style={styles.loginText}>Replicate Template</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
