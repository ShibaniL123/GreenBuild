//contains routes to all the pages in the app

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home_admin from "../screens/home_admin";
import Create_form from "../screens/create_form";
import enter_data from "../screens/enter_data";
import finalform from "../screens/finalform";
import forms_list from "../screens/forms_list";
import form_data from "../screens/form_data";
import create_admin from "../screens/create_admin";
import Welcome from "../screens/welcome";
import Login from "../screens/login1";
import Loading from "../screens/loading";
import home_employee from "../screens/home_employee";
import fillform from "../screens/fillform";
import finalfill from "../screens/finalfill";
import view_edit from "../screens/view_edit";
import view_edit_options from "../screens/view_edit_options";
import view_form from "../screens/view_form";
import edit from "../screens/edit";
import enter_data_2 from "../screens/enter_data_2";
import view_users from "../screens/view_users";
import form_list_emp from "../screens/form_list_emp";
import view_sub_emp from "../screens/view_sub_emp";
import cancel_form_emp from "../screens/cancel_form_emp";
import { StatusBar } from "expo-status-bar";
const screens = {
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      title: "Welcome",
    },
  },
  Home_admin: {
    screen: Home_admin,
    navigationOptions: {
      title: "Home",
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      headerShown: false,
    },
  },

  Loading: {
    screen: Loading,
    navigationOptions: {
      title: "Loading",
    },
  },
  Create_form: {
    screen: Create_form,
    navigationOptions: {
      title: "Enter Form Title",
    },
  },
  enter_data: {
    screen: enter_data,
    navigationOptions: {
      title: "Enter form details",
    },
  },
  finalform: {
    screen: finalform,
    navigationOptions: {
      title: "Create Form",
    },
  },
  forms_list: {
    screen: forms_list,
    navigationOptions: {
      title: "View Data",
    },
  },
  form_data: {
    screen: form_data,
    navigationOptions: {
      title: "Submitted data",
    },
  },
  create_admin: {
    screen: create_admin,
    navigationOptions: {
      title: "Add User",
    },
  },
  home_employee: {
    screen: home_employee,
    navigationOptions: {
      title: "Home",
      headerShown: false,
    },
  },
  fillform: {
    screen: fillform,
  },
  finalfill: {
    screen: finalfill,
    navigationOptions: {
      title: "Fill Form",
    },
  },
  view_edit: {
    screen: view_edit,
    navigationOptions: {
      title: "Form templates",
    },
  },
  view_edit_options: {
    screen: view_edit_options,
    navigationOptions: {
      title: "Options",
    },
  },
  view_form: {
    screen: view_form,

    navigationOptions: {
      title: "Preview",
    },
  },
  edit: {
    screen: edit,
    navigationOptions: {
      title: "Select Questions",
    },
  },
  enter_data_2: {
    screen: enter_data_2,
    navigationOptions: {
      title: "Enter form details",
    },
  },
  view_users: {
    screen: view_users,
    navigationOptions: {
      title: "Users",
    },
  },
  form_list_emp: {
    screen: form_list_emp,
    navigationOptions: {
      title: "Available forms",
    },
  },
  view_sub_emp: {
    screen: view_sub_emp,
    navigationOptions: {
      title: "View Submission",
    },
  },
  cancel_form_emp: {
    screen: cancel_form_emp,
    navigationOptions: {
      title: "Cancel Submission",
    },
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerMode: "screen",
    headerStyle: {
      marginTop: StatusBar.currentHeight,
      backgroundColor: "green",
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 1,
      shadowRadius: 60,
      //height: 70,
    },
  },
});

export default createAppContainer(HomeStack);
