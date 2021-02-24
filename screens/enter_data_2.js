import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { RadioButton } from "react-native-paper";
import { styles } from "../styles/globalStyles";
import * as yup from "yup";

var check1 = 0;

var type_val;
var ques_no = 1;
var q;
const reviewSchema = yup.object({
  Question: yup.string().required().min(2),
  type: yup.string().required(),
  options: yup.string(),
});

export default function enter_data_2({ navigation }) {
  const [errmsg, seterr] = useState("");
  const a = navigation.getParam("myjson");
  console.log("no", Object.keys(a.properties).length);
  ques_no = Object.keys(a.properties).length + 1;
  const a2 = {};
  var ques = "";
  function handle_data(values, actions) {
    actions.resetForm();
    console.log(values);
    console.log(typeof values);
    console.log(values.Question);
    if (values) {
      check1 = 1;
    }
    const text = {
      type: "string",
    };
    type_val = values.type;
    a2[values.Question] = "";
    if (values.type == "image") {
      ques = values.Question;
      console.log("HERE");
    } else if (values.type == "text") {
      a["properties"][values.Question] = text;
    } else if (values.type == "radio") {
      var arr = values.options.split(",");
      console.log(arr);
      console.log(typeof arr);
      const radio = {
        type: "string",
        enum: arr,
      };
      a["properties"][values.Question] = radio;
    } else {
      seterr("");
      var arr = values.options.split(",");
      var check = {
        type: "object",
        properties: {},
      };
      var i;
      var op = { type: "boolean" };
      for (i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        check["properties"][arr[i]] = op;
      }
      console.log("check:");
      console.log(check);

      a["properties"][values.Question] = check;
    }

    //console.log(a["properties"]);
    console.log(a);
    console.log(check);
    console.log(a2);
    console.log("IMAGE", ques);
  }
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ Question: "", options: "", type: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
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
            ques_no = ques_no + 1;
            q = ques_no - 1;
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
              <Text style={styles.title}>Enter Question no {ques_no}</Text>
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
                Enter Option(for radio and checkbox input,- for text input)
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
                placeholder="eg. Patra,abc"
                onChangeText={props.handleChange("options")}
                onBlur={props.handleBlur("options")}
                value={props.values.options}
              />
              <Text style={styles.errorText}>{errmsg}</Text>

              <TouchableOpacity
                style={styles.enterbutton}
                onPress={props.handleSubmit}
              >
                <Text style={styles.loginText}>Save this question</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.enterbutton}
                onPress={() => {
                  if (check1 === 1) {
                    const title = navigation.getParam("title1");
                    navigation.navigate("finalform", {
                      type: "object",
                      myjson: a,
                      ques1: ques,
                      title1: title,
                    });
                  } else {
                    Alert.alert("Can't Create Empty Form!");
                  }
                }}
              >
                <Text style={styles.loginText}>Create Form</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}
