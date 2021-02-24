import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import t from "tcomb-form-native"; // 0.6.9
var transform = require("tcomb-json-schema");
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import DatePicker from "react-native-datepicker";

const Form = t.form.Form;

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      justifyContent: "center",
      width: "90%",
      marginBottom: 20,
      color: "grey",
      padding: 10,
      borderColor: "rgb(242, 242, 242)",
      borderWidth: 1,
      borderRadius: 10,
    },
  },
  controlLabel: {
    normal: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
      marginTop: 10,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    // the style applied when a validation error occours
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600",
    },
  },
  select: {
    normal: Platform.select({
      android: {
        paddingLeft: 7,
        flexDirection: "row",
        alignItems: "center",
        paddingBotton: 20,

        borderColor: "green",
        borderWidth: 6,
      },
      ios: {},
    }),
    active: {
      borderBottomWidth: 5,
      borderColor: "red",
    },
  },
};

const options = {
  fields: {
    Date: {
      help: "dd/mm/yyyy format",
    },
  },
  i18n: {
    optional: "",
    required: " ", // inverting the behaviour: adding a postfix to the required fields
  },
  stylesheet: formStyles,
};
var test;
export default class view_form extends Component {
  saveitem(datastruct) {
    const title1 = this.props.navigation.getParam("title1");
    const newuser = firebase.database().ref(title1 + "_data");
    newuser.push().set({ datastruct });
  }
  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }
  del1(form_name) {
    console.log("IN DELLL");

    const userRef = firebase.database().ref(form_name + "_data");
    userRef.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log("key", childSnapshot.key);
        key1 = childSnapshot.key;
        var name = childSnapshot.val().name;
        console.log("name", name);
        let usersdata = firebase.database().ref(name + "_data");
        usersdata
          .orderByChild("test")
          .equalTo(key1)
          .on("value", function (snapshot) {
            console.log("val", snapshot.val());
            snapshot.forEach(function (data) {
              var id1 = data.key;
              console.log("keyy1", data.key);
              firebase
                .database()
                .ref(name + "_data")
                .child(id1)
                .remove();
            });
          });
        firebase
          .database()
          .ref(form_name + "_data")
          .child(key1)
          .remove();
      });
    });
    const adminlist = firebase.database().ref("form_names");
    adminlist.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log("here", childSnapshot.val().formname);
        //console.log(form_name == childSnapshot.val().formname);
        //console.log("in login");
        if (form_name == String(childSnapshot.val().formname)) {
          var id = childSnapshot.key;
          firebase.database().ref("form_names").child(id).remove();
          //console.log("REMOVED");
        }
      });
    });

    const formlist = firebase.database().ref("forms_struct");
    formlist.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (form_name == String(childSnapshot.val().formname)) {
          var id = childSnapshot.key;
          firebase.database().ref("forms_struct").child(id).remove();
          console.log("REMOVED1");
        }
      });
    });
  }
  render() {
    const text1 = this.props.navigation.getParam("myjson");
    const form_name = this.props.navigation.getParam("title1");
    console.log("text1", text1);
    var TcombType = transform(text1.datastruct);
    var image_ques = text1.image_ques1;
    var i1;
    var l2 = {};
    var labels = Object.keys(text1.datastruct.properties);

    labels.map((key, index) => {
      //console.log("c11", index);
      //l1.label = key;
      //console.log("L!", l1);
      l2[key] = {};
      l2[key]["label"] = "Q." + (index + 4) + ":  " + key;
      //console.log("l21", l2);
    });
    options["fields"] = l2;
    // options["fields"]["Date"]["help"] = "dd/mm/yyyy format";
    // options["fields"]["Date"]["mode"] = "date";
    if (image_ques != "") {
      //console.log("question", image_ques);
      i1 = (
        <View>
          <Text style={styles.titleText}>{image_ques}</Text>
          <TouchableOpacity
            style={[
              styles.enterbutton,
              { width: "30%", alignContent: "flex-end" },
            ]}
          >
            <Icon name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrl}
          contentContainerStyle={styles.scrollv}
          centerContent
        >
          <View style={styles.container2}>
            <Text style={styles.titleText1}> Preview</Text>
            <Text style={[styles.titleText, { color: "green" }]}>
              This is how your employee will see the form. You cannot fill the
              form here.
            </Text>
            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.titleText,
                  { alignSelf: "flex-start", marginLeft: 10, padding: 5 },
                ]}
              >
                Q.1: Date ->
              </Text>
              <DatePicker
                style={styles.datep}
                //date={this.state.date} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    //display: 'none',
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {},
                }}
                onDateChange={(date) => {
                  //this.setState({ date: date });
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.titleText,
                  { alignSelf: "flex-start", marginLeft: 10, padding: 5 },
                ]}
              >
                Q.2: Batch Number -
              </Text>
              <TextInput
                style={styles.texti}
                placeholderTextColor="lightgrey"
                multiline
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.titleText,
                  { alignSelf: "flex-start", marginLeft: 10, padding: 5 },
                ]}
              >
                Q.3: Card Number -
              </Text>
              <TextInput
                style={styles.texti}
                placeholderTextColor="lightgrey"
                multiline
                keyboardType="numeric"
              />
            </View>
            <Form
              ref={(c) => (this._form = c)}
              type={TcombType}
              options={options}
            />
          </View>
          <View>{i1}</View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.enterbutton, { backgroundColor: "red" }]}
          onPress={() => {
            /* const userRef = firebase
              .database()
              .ref(form_name + "_data")
              .remove();*/
            Alert.alert(
              "Are you sure you want to delete this form?",
              "Note:All corresponding submissions will be deleted",
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
                    this.del1(form_name);
                    Alert.alert("Form Deleted!");
                    this.props.navigation.navigate("Home_admin");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={styles.loginText}>Delete Form</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
