//add users
//New user details added in users document
import React from "react";
import { Button, Picker } from "native-base";
import { Text, View, ScrollView, Alert } from "react-native";
import * as firebase from "firebase";
import { styles } from "../styles/globalStyles";
import { Input } from "react-native-elements";

export default class create_user extends React.Component {
  state = {
    text: "",
    phone: "",
    name: "",
    conpassword: "",
    password: "",
    type: "Employee",
    mylist: [],
    phone_err: "",
  };

  componentDidMount() {
    const users = firebase.database().ref("users");
    users.on("value", (datasnap) => {
      if (datasnap.val()) {
        this.setState({ mylist: Object.values(datasnap.val()) });
      }
    });
  }
  saveitem() {
    //console.log(this.state.text);
    const newuser = firebase.database().ref("users");
    newuser.push().set({
      email: this.state.text,
      password: this.state.password,
      //time:Date.now()
    });
  }

  removeitem() {
    firebase.database().ref("users").remove();
    this.setState({ mylist: [] });
  }
  addadminuser(userval) {
    this.setState({ type: userval });
  }
  usersignup() {
    var phoneno = /^\d{10}$/;
    if (this.state.phone.match(phoneno)) {
      this.setState({ phone_err: "" });
      if (this.state.password == this.state.conpassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.text, this.state.password)
          .then(() => {
            const newuser = firebase.database().ref("users");
            newuser.push().set({
              email: this.state.text,
              name: this.state.name,
              phone: this.state.phone,
              type: this.state.type,
              //time:Date.now()
            });
            console.log(this.state.type);
            if (this.state.type == "Admin") {
              const newadmin = firebase.database().ref("adminnames");
              newadmin.push().set({ email: this.state.text });
            }
            //this.props.navigation.replace("home_admin");
            Alert.alert("New " + this.state.type + " added");
            this.props.navigation.navigate("Home_admin");
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      } else {
        Alert.alert("Password Value Mismatch");
      }
    } else {
      this.setState({ phone_err: "Please enter valid phone number" });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Input
            label="Full name"
            placeholder="eg John Doe"
            leftIcon={{ type: "font-awesome", name: "user", color: "green" }}
            style={styles}
            onChangeText={(value) => this.setState({ name: value })}
            labelStyle={[styles.titleText, { color: "green" }]}
            inputContainerStyle={{ borderBottomColor: "green" }}
          />
          <Input
            label="Email"
            placeholder="eg johndoe@gmail.com"
            leftIcon={{
              type: "MaterialCommunityIcons",
              name: "email",
              color: "green",
            }}
            style={styles}
            onChangeText={(value) => this.setState({ text: value })}
            labelStyle={[styles.titleText, { color: "green" }]}
            inputContainerStyle={{ borderBottomColor: "green" }}
            autoCapitalize="none"
          />
          <Input
            label="Phone Number"
            placeholder="eg 8792382942"
            leftIcon={{
              type: "FontAwesome",
              name: "phone",
              color: "green",
            }}
            errorMessage={this.state.phone_err}
            errorStyle={[styles.titleText, { color: "red" }]}
            style={styles}
            onChangeText={(value) => this.setState({ phone: value })}
            labelStyle={[styles.titleText, { color: "green" }]}
            inputContainerStyle={{ borderBottomColor: "green" }}
            multiline
          />
          <Input
            label="Password"
            placeholder="eg password123"
            leftIcon={{
              type: "FontAwesome",
              name: "lock",
              color: "green",
            }}
            style={styles}
            onChangeText={(value) => this.setState({ password: value })}
            labelStyle={[styles.titleText, { color: "green" }]}
            inputContainerStyle={{ borderBottomColor: "green" }}
            secureTextEntry={true}
          />
          <Input
            label="Confirm Password"
            placeholder="eg password123"
            leftIcon={{
              type: "FontAwesome",
              name: "lock",
              color: "green",
            }}
            style={styles}
            onChangeText={(value) => this.setState({ conpassword: value })}
            labelStyle={[styles.titleText, { color: "green" }]}
            inputContainerStyle={{ borderBottomColor: "green" }}
            secureTextEntry={true}
          />

          <Text style={[styles.titleText, { color: "green" }]}>
            Type of User
          </Text>
          <Picker
            selectedValue={this.state.type}
            prompt="Options"
            style={{ height: 50, width: 150 }}
            //onValueChange={(itemValue) => this.addadminuser(itemValue)}
            onValueChange={(itemValue) => this.setState({ type: itemValue })}
          >
            <Picker.Item label="Employee" value="Employee" />
            <Picker.Item label="Admin" value="Admin" />
          </Picker>

          <View
            style={{
              flexDirection: "row",
              padding: 20,
              justifyContent: "space-around",
            }}
          >
            <Button
              rounded
              success
              style={styles.enterbutton}
              onPress={() => {
                this.usersignup();
              }}
            >
              <Text style={styles.loginText}>Add User</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
