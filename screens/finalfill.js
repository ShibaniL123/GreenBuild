import React, { useState, useEffect, Component } from "react";
import {
  Text,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import t from "tcomb-form-native"; // 0.6.9
var transform = require("tcomb-json-schema");
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import DatePicker from "react-native-datepicker";

//import ImagePicker from "./upload_photo";

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
      marginBottom: 20,
      fontWeight: "600",
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
    required: "", // inverting the behaviour: adding a postfix to the required fields
  },
  stylesheet: formStyles,
};
var test;
var image_uri = "";
var image_url = "";
function ImagePicker1({ value1 }) {
  const [image, setImage] = useState(null);
  var result = {};
  //console.log(result);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  async function result1() {
    let r1 = await ImagePicker.launchCameraAsync();

    //console.log("r2", r1);
    result = r1;
    //console.log("result2", result);

    if (!result.cancelled) {
      setImage(result.uri);
      image_uri = result.uri;
      //console.log("hi", image_uri);
    }
    return image;
  }
  async function result2() {
    let r1 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [5, 5],
      quality: 1,
    });
    //   console.log("r1", r1);
    result = r1;
    // console.log("result", result);
    if (!result.cancelled) {
      setImage(result.uri);
      image_uri = result.uri;
      //console.log("hi", image_uri);
    }
    // console.log(result);
    return image;
  }

  async function pickImage() {
    console.log("hellooooooo");

    Alert.alert(
      "Pick Image from",
      "",
      [
        {
          text: "cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Camera",
          onPress: () => {
            result1();
            //uploadImage(result.uri, "testimage");
          },
        },
        {
          text: "Gallery",
          onPress: () => {
            result2();
            //   return image;
            //uploadImage(result.uri, "testimage");
          },
        },
      ],
      { cancelable: false }
    );
    return image;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.enterbutton, { paddingBottom: 10 }]}
        onPress={pickImage}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.loginText}>Upload Image</Text>
          <View style={{ flexGrow: 1 }} />
          <Icon name="camera" size={20} color="white" />
        </View>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 500, height: 700 }}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
    </View>
  );
}
export default class finalfill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      image: null,
      date: null,
      batch_no: "",
      card_no: "",
    };
  }

  async addname(nametemp) {
    this.setState({ name: nametemp });
    //console.log("NAMEEE", this.state.name);
  }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ email: user.email });
        const userlist = firebase.database().ref("users");
        userlist.on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            //console.log(childSnapshot.val().email);
            //console.log("email user", user.email);
            if (user.email == childSnapshot.val().email) {
              //console.log("here");
              this.addname(childSnapshot.val().name);
            }
          });
        });
      }
    });
  }
  async uploadImage(uri, imagename) {
    console.log("KEY:", imagename);
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imagename);
    await ref.put(blob);
    ref.getDownloadURL().then((url) => {
      //console.log("URL", url);
      image_url = url;
    });
    console.log("UPLOADED");
  }
  async saveitem(datastruct, name, date, email, d, a1) {
    //datastruct["Date"] = datastruct["Date"].toString();
    console.log("datastruct", datastruct);
    const title1 = this.props.navigation.getParam("title1");
    const newuser = firebase.database().ref(title1 + "_data");
    var newRef = newuser.push();
    const key1 = newRef.getKey();
    if (image_uri) {
      //  console.log("image_uri", image_uri);
      await this.uploadImage(image_uri, key1);
    }
    //console.log("hey", key1);
    // console.log("image_url", image_url);
    setTimeout(sett, 2000);
    function sett() {
      // console.log("image_url11", image_url);
      newRef.set({
        datastruct: datastruct,
        image_ques: image_url,
        date_ques: d,
        name: name,
        date: date,
        status: "Filled",
        batch_no: a1.batch_no,
        card_no: a1.card_no,
      });
      const emp_data = firebase.database().ref(name + "_data");
      emp_data.push().set({
        datastruct: datastruct,
        image_ques: image_url,
        title: title1,
        date_ques: d,
        date_of_submission: date,
        test: key1,
        status: "Filled",
        batch_no: a1.batch_no,
        card_no: a1.card_no,
      });
    }
  }
  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }
  handleSubmit = () => {
    //var value = this._form.getValue();
    var value = this.refs.form.getValue();
    if (value) {
      //svalue["Date"] = value["Date"].toString();
      if (this.state.date == null) {
        Alert.alert("Please fill in date");
      } else {
        var d1 = this.state.date;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        this.saveitem(
          value,
          this.state.name,
          today,
          this.state.email,
          d1,
          this.state
        );
        image_uri = "";
        image_url = "";
        // clear all fields after submit
        this.clearForm();
        Alert.alert("Form submitted!");
        this.props.navigation.navigate("home_employee");
      }
    }
  };

  render() {
    const text1 = this.props.navigation.getParam("myjson");
    // console.log("text1", text1);
    var TcombType = transform(text1);
    var image_ques = this.props.navigation.getParam("ques1");
    var i1;
    var l2 = {};
    var labels = Object.keys(text1.properties);

    labels.map((key, index) => {
      console.log("c11", index);
      //l1.label = key;
      //console.log("L!", l1);
      l2[key] = {};
      l2[key]["label"] = "Q." + (index + 4) + ":  " + key;
      console.log("l21", l2);
    });
    options["fields"] = l2;

    //options["fields"]["Date"]["mode"] = "date";
    //options["fields"]["Date"]["config"] = a12;
    // console.log("op", options);
    if (image_ques != "") {
      //console.log("question", image_ques);
      i1 = (
        <View>
          <Text style={styles.title}>{image_ques}</Text>
          <ImagePicker1 value1={this.state.image} />
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
            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.titleText,
                  { alignSelf: "flex-start", marginLeft: 10, padding: 5 },
                ]}
              >
                Q.1: Date
              </Text>
              <DatePicker
                style={styles.texti}
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
                  dateInput: {
                    fontSize: 18,
                    borderColor: "white",
                    borderWidth: 1,
                    // width: "90%",
                    //textAlign: "center",
                    borderRadius: 5,
                    padding: 5,
                    textAlign: "flex-start",
                    // alignSelf: "flex-start",
                  },
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
                onChangeText={(value) => this.setState({ batch_no: value })}
                value={this.state.batch_no}
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
                onChangeText={(value) => this.setState({ card_no: value })}
                value={this.state.card_no}
              />
            </View>
            <Form
              //  ref={(c) => (this._form = c)}
              ref="form"
              type={TcombType}
              options={options}
            />
            <View>{i1}</View>

            <TouchableOpacity
              style={styles.enterbutton}
              onPress={() =>
                Alert.alert(
                  "Are you sure you want to submit your form?",
                  "Please check the data before submitting",
                  [
                    {
                      text: "Cancel",
                      // onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        console.log("OK Pressed");
                        this.handleSubmit();
                        //logout1;
                        //navigation.navigate("Login");
                      },
                    },
                  ],
                  { cancelable: false }
                )
              }
            >
              <Text style={styles.loginText}>Submit Form</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
