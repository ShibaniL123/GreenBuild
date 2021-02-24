import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  Linking,
  TextInput,
} from "react-native";
import t from "tcomb-form-native"; // 0.6.9
var transform = require("tcomb-json-schema");
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";

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
var validations = {};
const options = {
  fields: {},
  i18n: {
    optional: "",
    required: " ", // inverting the behaviour: adding a postfix to the required fields
  },
  stylesheet: formStyles,
};
var test;
export default class cancel_form_emp extends Component {
  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }
  async setcancelled(id) {
    let name1 = await AsyncStorage.getItem("name");
    // console.log("name", name1);
    //console.log("tryy", this.state.name);
    let title = this.props.navigation.getParam("title1");
    let id1 = this.props.navigation.getParam("id");
    // console.log("id", id1);
    //console.log("title:", title);
    const plswork = firebase
      .database()
      .ref(name1 + "_data")
      .child(id1)
      .update({ status: "cancelled" });
    const plswork1 = firebase
      .database()
      .ref(title + "_data")
      .child(id)
      .update({ status: "cancelled" });
  }
  render() {
    const text1 = this.props.navigation.getParam("myjson");
    const values = this.props.navigation.getParam("values");
    let title = this.props.navigation.getParam("title1");
    //console.log("TEXT!", text1);
    var image = values.image_ques;
    var questions = Object.keys(text1.datastruct.properties);
    const not_editable = { editable: false };
    const not_editable1 = { disable: true };
    questions.map((key) => {
      console.log("key", key);
      validations[key] = not_editable;
    });
    //console.log(questions);
    ///console.log(validations);
    options["fields"] = validations;

    var i1;
    // console.log("text1", text1);
    //console.log("values", values);
    if (image != "") {
      // console.log(image);
      i1 = (
        <View>
          <Text style={styles.titleText}>Uploaded Image:</Text>
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(image)}
          >
            Image Link
          </Text>
        </View>
      );
    }
    var TcombType = transform(text1.datastruct);
    var cancel;
    if (values.status == "Filled") {
      cancel = "Cancel this submission";
      //console.log("filled");
    } else {
      cancel = "Submission Already Cancelled";
    }
    return (
      <View style={styles.container}>
        <Card
          containerStyle={{
            width: "95%",
            borderRadius: 10,
            backgroundColor: "rgb(230, 255, 230)",
          }}
        >
          <Card.Title style={styles.titleText1}>
            Thanks for filling out {title}
          </Card.Title>
          <Card.Divider />
          <Text style={styles.titleText}>
            Here is the data we got from you:
          </Text>
        </Card>
        <ScrollView
          style={styles.scrl}
          contentContainerStyle={styles.scrollv}
          centerContent
        >
          <Text style={[styles.titleText, { color: "red" }]}>
            Please Note: This data is non-editable. Any changes made here won't
            be considered.
          </Text>
          <View style={styles.container2}>
            <Text style={styles.titleText}>Date</Text>
            <DatePicker
              style={styles.datep}
              date={values.date_ques} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder={values.date_ques}
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderColor: "grey",
                  borderRadius: 5,
                },
              }}
              disabled={true}
            />
            <Text style={styles.titleText}>Batch Number</Text>
            <TextInput
              style={[
                styles.texti,
                {
                  width: "100%",
                  color: "rgb(102, 102, 102)",
                  backgroundColor: "rgb(242, 242, 242)",
                },
              ]}
              placeholderTextColor="black"
              multiline
              keyboardType="numeric"
              value={values.batch_no}
              editable={false}
            />
            <Text style={styles.titleText}>Card Number</Text>
            <TextInput
              style={[
                styles.texti,
                {
                  width: "100%",
                  color: "rgb(102, 102, 102)",
                  backgroundColor: "rgb(242, 242, 242)",
                },
              ]}
              placeholderTextColor="black"
              multiline
              keyboardType="numeric"
              value={values.card_no}
              editable={false}
            />
            <Form
              ref={(c) => (this._form = c)}
              type={TcombType}
              options={options}
              value={values.datastruct}
            />
          </View>
          <View>{i1}</View>
          <TouchableOpacity
            style={[styles.enterbutton, { backgroundColor: "red" }]}
            onPress={() => {
              Alert.alert(
                "Are you sure you want to cancel this submission?",
                "This submission will be cancelled",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      this.setcancelled(values.test);
                      console.log("OK Pressed");
                      Alert.alert(
                        "Your submission has been cancelled.",
                        "You can fill the form again in 'Fill forms' option"
                      );
                      this.props.navigation.navigate("home_employee");
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={styles.loginText}>{cancel}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
