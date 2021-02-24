/*
database structure:
User Authentication: 
- Firebase API auth used to add users.
- Admin can add new user, and select it's type(admin/employee)
- Admin names are added in admin_names struct. After logging in, type of user is checked and redirected to home_admin/ home_employee.

Forms:
- form structure stored in forms_struct(used to reconstruct forms everytime)
- form names stored in form_names (used to display available forms)
- Tcomb form native is used to convert json objects into forms.
- Every form (eg check1) will have check1_data document storing data submitted by users.
- Each user(abc1) will have abc1_data document storing the entries submitted by him.
*/

import React, { useState } from "react";
import * as firebase from "firebase";

import Navigator from "./routes/test";

export default function App() {
  return <Navigator />;
}
