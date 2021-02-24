import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";

import Icon from "react-native-vector-icons/Entypo";

var no_submissions;
export default class view_users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        "Head",
        "Head2",
        "Head3",
        "Head4",
        "Head5",
        "Head6",
        "Head7",
        "Head8",
        "Head9",
      ],
      widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
      todos: {},
    };
  }

  find_length(arr) {
    var lengtha = 0;
    for (var i = 0; i < arr.length; i++) {
      lengtha = lengtha + arr[i].length;
    }
    return lengtha;
  }

  give_height(arr, l) {
    if (this.find_length(arr) > 15 * l) {
      return (this.find_length(arr) % 25) * 8;
    } else {
      return 40;
    }
  }
  componentDidMount() {
    const plswork = firebase
      .database()
      .ref("users")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let todoItems = { ...data };
        this.setState({
          todos: todoItems,
        });
      });
  }
  _alertIndex(index) {
    Alert.alert(`${index + 1}`);
  }
  render() {
    var obj;
    var obj2;
    const state = this.state;
    const tableData = [];
    var header1;
    var a;
    var val2;
    var i;
    var a2;
    let todosKeys = Object.keys(this.state.todos);
    todosKeys.map((key) => {
      obj2 = this.state.todos[key];
      val2 = Object.values(obj2);
      tableData.push(val2);
    });
    //header1.push("Delete");
    var header1 = ["Email", "Name", "Phone no", "Type"];
    a2 = 4;
    no_submissions = todosKeys.length;
    this.state.tableHead = header1;
    this.state.widthArr = new Array(a2).fill(200);
    // console.log("title:", title);
    //console.log("hi", no_submissions);
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
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
                    onPress={() => this._alertIndex(rowData[0])}
                  >
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: "#F7F6E7" },

                        { height: this.give_height(rowData, a2) },
                      ]}
                      borderColor="blue"
                      textStyle={styles.text}
                    />
                  </TouchableOpacity>
                ))}
              </Table>
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.enterbutton,
                {
                  paddingHorizontal: 5,
                  width: "10%",
                  alignSelf: "flex-start",
                  marginLeft: 10,
                },
              ]}
              onPress={() => this.props.navigation.navigate("create_admin")}
            >
              <Icon name="add-user" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
