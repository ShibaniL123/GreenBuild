//enter form title page
// take title of forrm from user and pass it to next page(enter_data)
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { styles } from "../styles/globalStyles";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function create_form({ navigation }) {
  const [title, setTitle] = useState({ title1: "", myjson: "" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Enter title for form </Text>

      <TextInput
        style={styles.inputtest}
        placeholder="eg. Product Efficiency check"
        placeholderTextColor="lightgrey"
        onChangeText={(value) => setTitle({ title1: value })}
        multiline
      />

      <TouchableOpacity
        style={styles.enterbutton}
        onPress={() => {
          if (title.title1 == "") {
            Alert.alert("Enter Form Title!");
          } else {
            setModalOpen(true);
          }
        }}
      >
        <Text style={styles.loginText}>Next</Text>
      </TouchableOpacity>
      <Modal visible={modalOpen} animationType="slide">
        <Icon
          name="close"
          size={24}
          onPress={() => setModalOpen(false)}
          style={{
            marginLeft: 15,
            marginTop: 15,
          }}
        />
        <View style={[styles.containerlist, { padding: 10 }]}>
          <Text style={[styles.titleText1]}>Hello!</Text>
          <Text style={[styles.titleText]}>
            Follow these steps to create a form 
          </Text>
          <Text style={[styles.titleText]}>1. Enter the question</Text>
          <Text style={[styles.titleText]}>
            2. Select type of input (text,check box, radio or image)
          </Text>

          <Text style={[styles.titleText]}>3. Enter the Options -{"   "}</Text>
          <Text style={[styles.titleText, { color: "green" }]}>
            {" "}
            Eg: For radio,checkbox: Option1,Option2
          </Text>

          <Text style={[styles.titleText]}>
            4. Save Question and add next question!
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.enterbutton,
            {
              //justifyContent: "space-between",
              width: "70%",
            },
          ]}
          onPress={() => {
            setModalOpen(false);
            navigation.navigate("enter_data", title);
          }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.loginText}>Start Building </Text>
            <View style={{ flexGrow: 1 }} />
            <Icon name="build" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

