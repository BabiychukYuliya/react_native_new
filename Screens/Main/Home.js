import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth} from '../../firebase/config';
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const Tabs = createBottomTabNavigator();

export default function Home() {
  const dispatch = useDispatch();
  const signOut = () => { dispatch(authSignOutUser()) };

  return (
    <Tabs.Navigator screenOptions={styles.container} component={<View style={styles.line}></View>}>
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.grid}>
                <Feather name="grid" size={24} color="black" />
              </View>
            );
          },
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
          },
          headerTitle: { color: "#212121" },

          headerRight: () =>
            <TouchableOpacity onPress={signOut}>
              <Feather name="log-out" size={24} color="black" />
              </TouchableOpacity>,
        }}
        name="Posts"
        component={PostScreen}
      />

      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.plast}>
                <Ionicons name="add" size={24} color="black" />
              </View>
            );
          },
        }}
        name="CreatePost"
        component={CreatePostScreen}
      />

      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.user}>
                <Feather name="user" size={24} color="black" />
              </View>
            );
          },
        }}
        name="ProfileScreen"
        component={ProfileScreen}
          />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: 40,
    height: 40,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },

  plast: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 31,
    marginLeft: 31,
  },

  user: {
    width: 40,
    height: 40,
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
 
    line: {
       borderWidth: 0.5,
        backgroundColor: '#212121',
        borderRadius: 100,
        width: 134,
},

    container: {
    headerStyle: {
      height: 83,
      borderBottomWidth: 1,
      borderColor: "#BDBDBD",
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 17,
      color: "#212121",
      fontFamily: "Roboto-Regular",
    },
    tabBarShowLabel: false,
    tabBarStyle: {
      height: 83,
      paddingTop: 9,
      paddingBottom: 34,
    },
    tabBarInactiveTintColor: "#212121",
  },
});
