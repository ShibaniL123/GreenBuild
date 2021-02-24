import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
import Icon1 from "react-native-vector-icons/AntDesign";
import { List, ListItem } from "react-native-elements";

var obj2;
var obj;
export default class create_user extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: {},
      name: "",
      mylist: [],
      loader: true,
      myID: [],
    };
  }
  async componentDidMount() {
    let name1 = await AsyncStorage.getItem("name");
    console.log("name", name1);
    //console.log("tryy", this.state.name);
    const plswork = firebase
      .database()
      .ref(name1 + "_data")
      .on("value", (querySnapShot) => {
        if (querySnapShot.val()) {
          //console.log(Object.values(querySnapShot.val()));
          this.setState({ mylist: Object.values(querySnapShot.val()) });
          this.setState({ myID: Object.keys(querySnapShot.val()) });
        }
      });
    console.log(this.state.mylist);
    const plswork1 = firebase
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
  getdata(form_name) {
    let todosKeys = Object.keys(this.state.todos);
    todosKeys.map((key) => {
      obj = this.state.todos[key];
      if (obj.formname == form_name) {
        //console.log("WORKED", obj);
        obj2 = obj;
      }
    });
  }
  render() {
    return (
      <View style={styles.containerlist}>
        <Text style={styles.titleText1}>Your Submissions</Text>
        <ScrollView>
          <View>
            {this.state.mylist.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  console.log("item", item);
                  console.log("ID", this.state.myID[index]);
                  var id1 = this.state.myID[index];
                  this.getdata(item.title);
                  console.log(obj2);
                  this.props.navigation.navigate("cancel_form_emp", {
                    id: id1,
                    values: item,
                    title1: item.title,
                    myjson: obj2,
                  });
                }}
              >
                <ListItem
                  key={index}
                  bottomDivider
                  style={{
                    marginBottom: 20,
                  }}
                  containerStyle={{
                    backgroundColor: "green",
                    shadowColor: "rgba(0,0,0, .4)", // IOS
                    shadowOffset: { height: 1, width: 1 }, // IOS
                    shadowOpacity: 1, // IOS
                    shadowRadius: 1, //IOS
                    elevation: 5, // Android
                    borderRadius: 10,
                  }}
                >
                  <Icon1 name="checkcircleo" color="white" size={20} />
                  <ListItem.Content>
                    <ListItem.Title
                      style={{ fontWeight: "bold", color: "white" }}
                    >
                      {item.title}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

/*
 constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      widthArr: [],
      todos: {},
      name: "",
    };
  }

  async getname() {
    //console.log("herer");
    this.setState({ name: name1 });
  }
  async componentDidMount() {
    let name1 = await AsyncStorage.getItem("name");
    console.log("name", name1);
    //console.log("tryy", this.state.name);
    const plswork = firebase
      .database()
      .ref(name1 + "_data")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let todoItems = { ...data };
        this.setState({
          todos: todoItems,
        });
      });
  } 
  
   <FlatList
            data={this.state.mylist}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log("item", item);
                  console.log("ID", this.state.myID[index]);
                  var id1 = this.state.myID[index];
                  this.getdata(item.title);
                  console.log(obj2);
                  this.props.navigation.navigate("cancel_form_emp", {
                    id: id1,
                    values: item,
                    title1: item.title,
                    myjson: obj2,
                  });
                }}
              >
                <Text style={styles.item}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
  */
