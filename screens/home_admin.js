//admin landing page
import React, { useEffect } from "react";

import * as firebase from "firebase";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  BackHandler,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import { styles } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";

var transform = require("tcomb-json-schema");

export default function Home_admin({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Do you want to exit app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },

        {
          text: "YES",
          onPress: () => {
            //transform.resetFormats();
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const pressHandler_data = () => {
    navigation.push("forms_list");
  };

  const pressHandler_form = async () => {
    const temp = "1";
    await AsyncStorage.setItem("qn", temp);
    navigation.push("Create_form");
  };
  const create_admin = () => {
    navigation.push("create_admin");
  };
  const view = () => {
    navigation.push("view_edit");
  };
  const logout1 = () => {
    firebase
      .auth()
      .signOut()
      .then(async function () {
        Alert.alert("Logged out");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
        await AsyncStorage.removeItem("name");
      })
      .catch(function (error) {
        Alert.alert(error.message);
      });
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["rgb(0, 128, 0)", "white"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.containerlist}>
        <View style={styles.containerlist}>
          <ScrollView>
            <TouchableOpacity onPress={pressHandler_form}>
              <Card containerStyle={styles.card1}>
                <Card.Title>Create Form</Card.Title>
                <Card.Divider style={{ height: 1.5 }} />
                <Text style={styles.paragraph}>
                  Create Customisable forms according to requirement
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={pressHandler_data}>
              <Card containerStyle={styles.card1}>
                <Card.Title>View Submissions</Card.Title>
                <Card.Divider style={{ height: 1.5 }} />
                {/*react-native-elements Card*/}
                <Text style={styles.paragraph}>
                  View the data submitted by your employees
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={create_admin}>
              <Card containerStyle={styles.card1}>
                <Card.Title>Add Users</Card.Title>
                <Card.Divider style={{ height: 1.5 }} />
                {/*react-native-elements Card*/}
                <Text style={[styles.paragraph]}>
                  Add Users(Admin/Employee) to the system
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={view}>
              <Card containerStyle={styles.card1}>
                <Card.Title>View/Edit Form Templates </Card.Title>
                <Card.Divider style={{ height: 1.5 }} />
                {/*react-native-elements Card*/}
                <Text style={styles.paragraph}>
                  View the forms created by you and replicate templates
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("view_users")}>
              <Card containerStyle={styles.card1}>
                <Card.Title>View existing Users</Card.Title>
                <Card.Divider style={{ height: 1.5 }} />
                {/*react-native-elements Card*/}
                <Text style={styles.paragraph}>
                  Check user data and their access type
                </Text>
              </Card>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={[styles.enterbutton]}
          onPress={() => {
            Alert.alert(
              "Are you sure you want to Log out",
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
                    logout1;
                    navigation.navigate("Login");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={styles.loginText}>Log out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
