import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AdminLogin } from "../screens/setup/adminLogin.js";
import { AdminSignup } from "../screens/setup/adminSignup.js";
import { StaffLogin } from "../screens/setup/staffLogin.js";
import { StudentLogin } from "../screens/setup/studentLogin.js";
import { Home } from "../screens/setup/home.js";
import { RootNavigator } from "./rootNavigation.js";

const Stack = createNativeStackNavigator();

const SetupNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="selectRole" component={Home} />
      <Stack.Screen name="adminLogin" component={AdminLogin} />
      <Stack.Screen name="adminSignup" component={AdminSignup} />
      <Stack.Screen name="staffLogin" component={StaffLogin} />
      <Stack.Screen name="studentLogin" component={StudentLogin} />
      <Stack.Screen name="CheckUserAuth" component={RootNavigator} />
    </Stack.Navigator>
  );
};

export { SetupNavigation };