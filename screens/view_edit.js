import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebase";
import { styles } from "../styles/globalStyles";
import Icon1 from "react-native-vector-icons/AntDesign";
import { ListItem } from "react-native-elements";

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
export default class view_edit extends React.Component {
  state = {
    formname: "",
    mylist: [],
  };

  componentDidMount() {
    const users = firebase.database().ref("form_names");
    users.on("value", (datasnap) => {
      if (datasnap.val()) {
        // console.log(Object.values(datasnap.val()));
        this.setState({ mylist: Object.values(datasnap.val()) });
      }
    });
    //console.log(this.state.mylist);
  }
  render() {
    return (
      <View style={styles.containerlist}>
        <Text style={styles.titleText1}>Available forms</Text>
        <ScrollView>
          <View>
            {this.state.mylist.map((item, i) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("view_edit_options", item)
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
