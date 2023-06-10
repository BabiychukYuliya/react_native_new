import { Image, Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { EvilIcons, Feather } from "@expo/vector-icons";


const ProfileScreen = ({navigation, route}) => {
  const { userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);



  useEffect(() => {
    getUserPhoto();
  }, []);

  const getUserPhoto = async () => {
    const q = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    await onSnapshot(q, (snapshot) => {
      setUserPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };





  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/image/PhotoBG.jpg")}>

                      <View style={styles.containerFoto}>
                
                <Image source={require("../../assets/image/Natalia.jpg")} />
          <TouchableOpacity>
                
                    <Image
                      style={styles.deleteBtn}
                      source={require("../../assets/image/delete.png")}
                    />
                  
                </TouchableOpacity>
        </View>
        
      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.boxPhoto}>
            <Image source={{ uri: item.image }} style={styles.photo}></Image>
            <Text>{item.namePost}</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              >
                <EvilIcons name="like" size={24} color="#bdbdbd" />
              </TouchableOpacity>

                            <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Likes", { postId: item.id })
                }
              >
                <Feather name="thumbs-up" size={24} color="#bdbdbd" />
                <Text>item.likeCounter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                title="Map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.locationPost })
                }
              >
<View style={styles.locationBox}>
                <EvilIcons name="location" size={30} color="#BDBDBD" />
                  <Text>Location</Text>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        />
        </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#fff",
  },

    boxPhoto: {
    marginBottom: 8,
    alignItems: "center",
  },
      photo: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
    
      locationBox: {
    display: "flex",
    flexDirection: "row",
  },
      
  containerFoto: {
          position: "relative",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
     
          deleteBtn: {
    position: "absolute",
    bottom: -81,
    right: -12,
  },
        
});
