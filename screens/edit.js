import React, { Component } from "react";
import CheckboxList from "rn-checkbox-list";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "../styles/globalStyles";
import { Card, Button } from "react-native-elements";

var data = [];

export default class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      mylist: [],
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loader: false }), 500);
  }

  render() {
    var obj1;
    var obj;
    var obj2 = this.props.navigation.getParam("myjson");
    obj1 = obj2.datastruct.properties;
    var title = this.props.navigation.getParam("title1");
    let todosKeys = Object.keys(obj2.datastruct.properties);
    var a = {
      type: "object",
      properties: {},
    };
    var objs = todosKeys.map(function (x, i) {
      return {
        name: x,
        id: i + 1,
      };
    });
    data = objs;
    //console.log(objs);
    //console.log(obj2);
    function handle_data(a1) {
      var finalArray = a1.map(function (obj) {
        return obj.name;
      });
      var obj1;
      var obj;
      obj1 = obj2.properties;
      console.log(obj1);
      var a = {
        type: "object",
        properties: {},
      };
      finalArray.map((key) => {
        console.log("HI", obj1[key]);
        a["properties"][key] = obj1[key];
      });
      console.log("plswork", a);
      console.log(title);
    }

    return (
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.titleText1,
            { padding: 20, backgroundColor: "green", color: "white" },
          ]}
        >
          Select Questions to be included in new form
        </Text>
        <CheckboxList
          headerName="Select all questions"
          theme="green"
          listItems={this.state.loader ? [] : data}
          onChange={({ ids, items }) => {
            //console.log("My updated list :: ", items);
            this.state.mylist = items;
          }}
          onLoading={() => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="red" />
              <Text style={{ fontSize: 16, color: "#555555" }}>
                Loading....
              </Text>
            </View>
          )}
          selectedListItems={data.slice(0, 4)}
          checkboxProp={{
            boxType: "square",
            tintColors: { true: "green", false: "red" },
          }}
          listItemStyle={styles.titleText}
          headerStyle={styles.titleText1}
        />
        <TouchableOpacity
          style={styles.enterbutton}
          onPress={() => {
            var finalArray = this.state.mylist.map(function (obj) {
              return obj.name;
            });
            finalArray.map((key) => {
              console.log("HI", obj1[key]);
              a["properties"][key] = obj1[key];
            });
            console.log("plswork", a);
            this.props.navigation.navigate("finalform", {
              type: "object",
              myjson: a,
              title1: title,
              ques1: "",
            });
          }}
        >
          <Text style={styles.loginText}>Create form</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.enterbutton}
          onPress={() => {
            var finalArray = this.state.mylist.map(function (obj) {
              return obj.name;
            });
            finalArray.map((key) => {
              console.log("HI", obj1[key]);
              a["properties"][key] = obj1[key];
            });
            console.log("plswork", a);
            this.props.navigation.navigate("enter_data_2", {
              type: "object",
              myjson: a,
              title1: title,
            });
          }}
        >
          <Text style={styles.loginText}>Add more questions</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
