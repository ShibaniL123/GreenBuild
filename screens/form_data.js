//display submitted data
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
var no_submissions;
export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      widthArr: [],
      todos: {},
      image: [],
    };
  }
  find_length(arr) {
    var lengtha = 0;
    for (var i = 0; i < arr.length; i++) {
      lengtha = lengtha + String(arr[i]).length;
    }
    return lengtha;
  }
  give_height(arr, l) {
    if (this.find_length(arr) > 15 * l) {
      return Number((this.find_length(arr) % 25) * 10);
    } else {
      return 45;
    }
  }
  componentDidMount() {
    const title = this.props.navigation.getParam("formname");
    var todoItems;
    const plswork = firebase
      .database()
      .ref(title + "_data")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        todoItems = { ...data };
        this.setState({
          todos: todoItems,
        });
      });
  }
  render() {
    var obj2;
    const state = this.state;
    const tableData = [];
    var header1 = [];
    var csv = "";
    var csvhead = "";
    var csvdata = "";
    var csvfinal = "";
    var a;
    var val2;
    var i;
    var a2;
    var a3;
    var final;
    var flag = 0;
    let todosKeys = Object.keys(this.state.todos);

    //put data in tableData
    todosKeys.map((key) => {
      //console.log("todos", this.state.todos[key]);
      obj2 = this.state.todos[key].datastruct;
      var date = this.state.todos[key].date;
      var name = this.state.todos[key].name;
      var status = this.state.todos[key].status;
      var date_ques = this.state.todos[key].date_ques;
      var image_ques = this.state.todos[key].image_ques;
      if (image_ques != "") {
        flag = 1;
      }
      val2 = Object.values(obj2);
      header1 = Object.keys(obj2);
      for (i = 0; i < val2.length; i++) {
        if (typeof val2[i] === "object") {
          final = "";
          a3 = val2[i];
          a = Object.keys(val2[i]);
          a.map((key) => {
            if (a3[key] === true) {
              //console.log("true ", key);
              final = final + key + ",";
            }
          });
          val2[i] = final;
        }
      }
      val2.push(name);
      val2.push(date);
      val2.push(status);

      val2.push(date_ques);
      if (flag == 1) {
        val2.push(image_ques);
      }
      console.log(val2);
      tableData.push(val2);
      csv = val2
        .map(function (d) {
          return JSON.stringify(d);
        })
        .join(",")
        .replace(/(^\[)|(\]$)/gm, "");

      //console.log("csvdata:", csv);
      csvdata = csvdata + ", \n" + csv;
    });
    // console.log("data", tableData);
    //console.log(header1);
    no_submissions = todosKeys.length;
    header1.push("Name");
    header1.push("Date of Submission");
    header1.push("Status");
    header1.push("Date");
    if (flag == 1) {
      header1.push("Image");
    }
    csvhead = header1
      .map(function (d) {
        return JSON.stringify(d);
      })
      .join(",")
      .replace(/(^\[)|(\]$)/gm, "");
    csvfinal = csvhead + csvdata;
    // console.log("csv:", csvfinal);

    a2 = header1.length;
    if (no_submissions == 0) {
      a2 = 0;
      header1 = [];
    }
    this.state.tableHead = header1;
    this.state.widthArr = new Array(a2).fill(250);
    const title = this.props.navigation.getParam("formname");
    // console.log("title:", title);
    //console.log("hi", no_submissions);
    return (
      <View style={styles.container}>
        <Text style={styles.titleText1}>
          No of submissions: {no_submissions} sf
        </Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={async () => {
            const { status } = await Permissions.askAsync(
              Permissions.CAMERA_ROLL
            );
            if (status === "granted") {
              let fileUri = FileSystem.documentDirectory + "datatext.csv";
              await FileSystem.writeAsStringAsync(fileUri, csvfinal, {
                encoding: FileSystem.EncodingType.UTF8,
              });
              const asset = await MediaLibrary.createAssetAsync(fileUri);
              await MediaLibrary.createAlbumAsync("Download", asset, false);
            }
            Alert.alert("File Downloaded Successfully");
          }}
        >
          <Text style={styles.loginText}>Download as csv</Text>
        </TouchableOpacity>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={[styles.text, { color: "white" }]}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                {tableData.map((rowData, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (flag == 1) {
                        Alert.alert(
                          "Open image in browser?",
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
                                if (rowData[rowData.length - 1]) {
                                  Linking.openURL(rowData[rowData.length - 1]);
                                }
                              },
                            },
                          ],
                          { cancelable: false }
                        );
                      }
                    }}
                  >
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      flexArr={1}
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: "#F7F6E7" },
                        (rowData[rowData.length - 2] == "cancelled" ||
                          rowData[rowData.length - 1] == "cancelled") && {
                          backgroundColor: "rgb(255, 128, 128)",
                        },
                        { height: this.give_height(rowData, a2) },
                      ]}
                      textStyle={styles.text}
                    />
                  </TouchableOpacity>
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
