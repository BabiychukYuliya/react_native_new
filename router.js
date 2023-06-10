import React from "react";
import { View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./Screens/Auth/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import PostScreen from "./Screens/Main/PostsScreen";
import CreatePostScreen from "./Screens/Main/CreatePostsScreen";
import ProfileScreen from "./Screens/Main/ProfileScreen";
import Home from "./Screens/Main/Home";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator initialRouteName="Home">
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => {
            <View></View>;
          },
        }}
        name="Home"
        component={Home}
      />
      {/* <MainTab.Screen name="Posts" component={PostScreen} />
      <MainTab.Screen name="Create" component={CreatePostScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} /> */}
    </MainTab.Navigator>
  );
};
