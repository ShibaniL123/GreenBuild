//forms list for submissions
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
import Icon1 from "react-native-vector-icons/AntDesign";
import { List, ListItem } from "react-native-elements";
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
export default class create_user extends React.Component {
  state = {
    formname: "",
    mylist: [],
    loader: true,
    animating: true,
  };
  closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          animating: false,
        }),
      600
    );
  componentDidMount() {
    this.closeActivityIndicator();
    const users = firebase.database().ref("form_names");
    users.on("value", (datasnap) => {
      if (datasnap.val()) {
        //console.log(Object.values(datasnap.val()));
        this.setState({ mylist: Object.values(datasnap.val()) });
      }
    });
    // console.log(this.state.mylist);
  }

  render() {
    const animating = this.state.animating;
    return (
      <View style={styles.containerlist}>
        <Text style={styles.titleText1}>Available forms</Text>
        <ScrollView>
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                animating={animating}
                size="large"
                color="red"
              />
            </View>
            {this.state.mylist.map((item, i) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("form_data", item)
                }
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

  <View style={styles.containerlist}>
        <Text style={styles.titleText1}>Select a form</Text>
        <ScrollView>
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
                onPress={() =>
                  this.props.navigation.navigate("form_data", item)
                }
              >
                <Text style={styles.item}>{item.formname}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>    
*/

/*
 
 */
