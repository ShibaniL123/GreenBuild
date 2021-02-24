//Available forms for employee
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  AsyncStorage,
} from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
import Icon1 from "react-native-vector-icons/AntDesign";
import { ListItem } from "react-native-elements";
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
export default class create_user extends React.Component {
  state = {
    formname: "",
    mylist: [],
  };

  componentDidMount() {
    const users = firebase.database().ref("form_names");
    users.on("value", (datasnap) => {
      if (datasnap.val()) {
        console.log(Object.values(datasnap.val()));
        this.setState({ mylist: Object.values(datasnap.val()) });
      }
    });
    console.log(this.state.mylist);
  }
  logout() {
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
        //this.props.navigation.push("Home");
      });
  }
  render() {
    return (
      <View style={styles.containerlist}>
        <Text style={styles.titleText1}>Select a form</Text>
        <ScrollView>
          <View>
            {this.state.mylist.map((item, i) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("fillform", item)}
              >
                <ListItem
                  key={i}
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
                  <Icon1 name="form" color="white" size={20} />
                  <ListItem.Content>
                    <ListItem.Title
                      style={{ fontWeight: "bold", color: "white" }}
                    >
                      {item.formname}
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
 <FlatList
            data={this.state.loader ? [] : this.state.mylist}
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
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("fillform", item)}
              >
                <Text style={styles.item}>{item.formname}</Text>
              </TouchableOpacity>
            )}
          />


 */
