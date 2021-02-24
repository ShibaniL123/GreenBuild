//form data input page
//user inputs form data: questions and options, which are appended in a json object (a). 
/*  type: "object",
myjson: a,
title1: title,
ques1: ques,
flag: flag,  sent to the final form creation page(final_form)*/
import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Alert,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { Formik } from "formik";
import { RadioButton } from "react-native-paper";
import { styles } from "../styles/globalStyles";
import * as yup from "yup";
import Icon from "react-native-vector-icons/FontAwesome";

var check1 = 0;

//validation
const reviewSchema = yup.object({
  Question: yup.string().required().min(2),
  type: yup.string().required(),
  options: yup.string(),
});
var temp = 1;
var ques_no = 1;
var q;
export default function enter_data({ navigation }) {
  const [disable, setDisable] = useState(false);
  const [errmsg, seterr] = useState("");
  ques_no = 1;

  //json object of form data
  const a = {
    type: "object",
    properties: {
      /*"Batch number": {
        type: "number",
      },
      "Card Number": {
        type: "number",
      },*/
    },
    //required: ["Batch number", "Card Number", "Date"],
  };
  const a2 = {};
  var flag = 0;
  var ques = "";

  function handle_data(values, actions) {
    actions.resetForm();
    //console.log(values);
    //console.log(typeof values);
    //console.log(values.Question);

    if (values) {
      check1 = 1;
    }
    const text = {
      type: "string",
    };
    var type_val = values.type;
    a2[values.Question] = "";
    if (values.type == "image") {
      flag = 1;
      ques = values.Question;
    } else if (values.type == "text") {
      a["properties"][values.Question] = text;
    } else if (values.type == "radio") {
      var arr = values.options.split(",");
      //console.log(arr);
      //console.log(typeof arr);
      const radio = {
        type: "string",
        enum: arr,
      };
      a["properties"][values.Question] = radio;
    } else {
      var arr = values.options.split(",");
      var check = {
        type: "object",
        properties: {},
      };
      var i;
      var op = { type: "boolean" };
      for (i = 0; i < arr.length; i++) {
        // console.log(arr[i]);
        check["properties"][arr[i]] = op;
      }
      //console.log("check:");
      //console.log(check);
      a["properties"][values.Question] = check;
    }
    // console.log("a", a);
    //console.log(check);
    //console.log(a2);
  }
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ Question: "", options: "", type: "" }}
        validationSchema={reviewSchema}
        onSubmit={async (values, actions) => {
          let questionn = await AsyncStorage.getItem("qn");
          if (
            values.type == "check_box" &&
            (values.options.includes("/") ||
              values.options.includes(".") ||
              values.options.includes("#") ||
              values.options.includes("$") ||
              values.options.includes("[") ||
              values.options.includes("]"))
          ) {
            //console.log("hi");
            Alert.alert(
              "Sorry!",
              "Check box Options can't contain special characters such as: '. # $ / [ ]'"
            );
          } else if (
            (values.type == "check_box" || values.type == "radio") &&
            values.options == ""
          ) {
            seterr("Please fill in options");
          } else {
            //  console.log("number:", questionn);
            seterr("");
            temp = Number(questionn);
            console.log("temp:", temp);
            ques_no = temp + 1;
            q = ques_no - 1;
            await AsyncStorage.setItem("qn", ques_no.toString());
            handle_data(values, actions);
            Alert.alert("Question no " + q + " has been added:");
          }
        }}
      >
        {(props) => (
          <ScrollView
            style={styles.scrl}
            contentContainerStyle={styles.scrollv}
            centerContent
          >
            <View style={styles.container2}>
              <Text style={styles.title}>Enter Question no. {ques_no}</Text>
              <TextInput
                style={styles.inputtest}
                placeholderTextColor="lightgrey"
                placeholder="eg. Type of Cement"
                onChangeText={props.handleChange("Question")}
                onBlur={props.handleBlur("Question")}
                value={props.values.Question}
                multiline
              />
              <Text style={styles.errorText}>
                {props.touched.Question && props.errors.Question}
              </Text>
              <Text style={styles.title}>Select Type of Input</Text>
              <RadioButton.Group
                onValueChange={props.handleChange("type")}
                onBlur={props.handleBlur("type")}
                value={props.values.type}
              >
                <RadioButton.Item label="Text Input" value="text" />
                <RadioButton.Item label="Radio Button" value="radio" />
                <RadioButton.Item label="Check Box" value="check_box" />
                <RadioButton.Item label="Image Input" value="image" />
              </RadioButton.Group>

              <Text style={styles.errorText}>
                {props.touched.type && props.errors.type}
              </Text>
              <Text style={styles.title}>
                Enter Option(for radio and checkbox input)
              </Text>
              <TextInput
                editable={
                  props.values.type == "radio" ||
                  props.values.type == "check_box"
                }
                style={[
                  styles.inputtest,
                  {
                    backgroundColor:
                      props.values.type == "text" ||
                      props.values.type == "image"
                        ? "rgb(230, 230, 230)"
                        : "white",
                  },
                ]}
                placeholderTextColor="lightgrey"
                multiline
                placeholder="eg. Option1,Option2"
                onChangeText={props.handleChange("options")}
                onBlur={props.handleBlur("options")}
                value={props.values.options}
              />

              <Text style={styles.errorText}>{errmsg}</Text>

              <TouchableOpacity
                style={styles.enterbutton}
                onPress={props.handleSubmit}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={styles.loginText}>Save this Quesion</Text>
                  <View style={{ flexGrow: 1 }} />
                  <Icon name="plus" size={20} color="white" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.enterbutton}
                onPress={async () => {
                  if (check1 === 1) {
                    const title = navigation.getParam("title1");
                    await AsyncStorage.setItem("qn", ques_no.toString());
                    navigation.navigate("finalform", {
                      type: "object",
                      myjson: a,
                      title1: title,
                      ques1: ques,
                      flag: flag,
                    });
                    flag = 0;
                  } else {
                    Alert.alert(
                      "Can't Create Empty Form! Please save your changes"
                    );
                  }
                }}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={styles.loginText}>Create Form</Text>
                  <View style={{ flexGrow: 1 }} />
                  <Icon name="arrow-right" size={20} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}
/*
<Card containerStyle={{ backgroundColor: "green" }}>
                <Text
                  style={
                    ([styles.paragraph], { color: "white" }, { fontSize: 20 })
                  }
                >
                  Enter Questions,select type of input,and enter options.
                </Text>
              </Card>*/
