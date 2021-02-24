//final form preview
// form structure stored in forms_struct
// form names stored in form_names 
//Tcomb form native is used to convert json objects into forms.
// once from is created, it is available in available forms.
import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  AsyncStorage,
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
};

var options = {
  fields: {},
  i18n: {
    optional: "",
    required: " ", // inverting the behaviour: adding a postfix to the required fields
  },
  stylesheet: formStyles,
};
export default class finalform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }
  saveitem(datastruct, formname, image_ques1) {
    //console.log(this.state.text);
    const newuser = firebase.database().ref("forms_struct");
    const newform = firebase.database().ref("form_names");
    newuser.push({ formname, datastruct, image_ques1 });
    newform.push().set({ formname });
  }
  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }
  handleSubmit = async () => {
    //console.log(text1);
    var value = this._form.getValue();
    if (value) {
      const text2 = this.props.navigation.getParam("myjson");
      const text3 = this.props.navigation.getParam("title1");
      var image_ques1 = this.props.navigation.getParam("ques1");
      var req = Object.keys(text2.properties);
      //req = req.slice(2);
      console.log(req);
      text2["required"] = req;
      const temp = "1";
      await AsyncStorage.setItem("qn", temp);
      //test = text3;
      this.saveitem(text2, text3, image_ques1);
      // clear all fields after submit
      this.clearForm();
      Alert.alert("Form created!");
      this.props.navigation.navigate("Home_admin");
    }
  };
  handleCancel = async () => {
    const temp = "1";
    await AsyncStorage.setItem("qn", temp);
  };

  render() {
    const text1 = this.props.navigation.getParam("myjson");
    var TcombType = transform(text1);
    var image_ques = "";
    image_ques = this.props.navigation.getParam("ques1");
    var l2 = {};
    var labels = Object.keys(text1.properties);

    labels.map((key, index) => {
      //    console.log("c11", index);
      //l1.label = key;
      //console.log("L!", l1);
      l2[key] = {};
      l2[key]["label"] = "Q." + (index + 4) + ":  " + key;
      //  console.log("l21", l2);
    });
    options["fields"] = l2;

    //console.log("l2", l2);
    var i1 = "";
    i1 = (
      <View>
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
    if (image_ques == "") {
      i1 = null;
    }
    // console.log("tcomb:", TcombType);
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
                Q.1: Dates
              </Text>
              <DatePicker
                style={styles.datep}
                date={this.state.date} // Initial date from state
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
                  this.setState({ date: date });
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
                Q.2: Batch Number
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
                Q.3: Card Number
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
            <Text style={styles.titleText}>{image_ques}</Text>
            <View>{i1}</View>
            <TouchableOpacity
              style={styles.enterbutton}
              onPress={this.handleSubmit}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.loginText}>Create Form </Text>
                <Icon name="check" size={20} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.enterbutton}
              onPress={() => {
                Alert.alert(
                  "Are you sure you want to Cancel this form?",
                  "No form will be created.",
                  [
                    {
                      text: "No",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Yes,cancel the form",
                      onPress: () => {
                        this.handleCancel;
                        Alert.alert("Form cancelled!");
                        this.props.navigation.navigate("Home_admin");
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.loginText}>Cancel Form </Text>
                <Icon name="close" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
