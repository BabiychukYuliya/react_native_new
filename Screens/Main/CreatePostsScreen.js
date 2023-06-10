import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { SimpleLineIcons } from "@expo/vector-icons";
import { storage, db} from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import uuid from 'react-native-uuid';
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";



export default function CreatePostScreen({ navigation }) {
  const [refCamera, setRefCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [namePost, setNamePost] = useState("");
  const [locationPost, setLocationPost] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
 
  
 const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationPost = await Location.getCurrentPositionAsync({});
      setLocationPost(locationPost);
    })();
  }, []);

    let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const takePhoto = async () => {
    if (refCamera) {
      try {
        const data = await refCamera.takePictureAsync();
        setPhoto(data.uri);
      } catch (er) {
        console.log(er);
      }
    }
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const sendPhoto = () => {

          uploadPostToServer();
    navigation.navigate("DefaultScreen", {photo});
    setLocationPost(locationPost);
   

  };

  
  const uploadPostToServer = async () => { 
    const image = await upLoadPhotoToServer();
    const docRef = await addDoc(collection(db, 'posts'), {
      image,
      namePost,
      locationPost,
userId,
      login, 
      commentCount,
    });
  }
  
  const upLoadPhotoToServer = async () => {
    const responce = await fetch(photo);
    const file = await responce.blob();

    const uniqueId = uuid.v4();

    const storageRef = await ref(storage, `images/${uniqueId}`);
    await uploadBytesResumable(storageRef, file);

    const getImageUrl = await getDownloadURL(storageRef);
    console.log("getImageUrl", getImageUrl);

    return getImageUrl;
  }

  return (
    <View style={styles.container}>
      <Camera
        type={type}
        style={styles.camera}
        ref={(ref) => {
          setRefCamera(ref);
        }}
      >
        {photo && (
          <View style={styles.photoContainer}>
            <Image sourse={{ uri: photo }} style={styles.camera} />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto}>
          <View style={styles.boxCamera}>
            <FontAwesome name="camera" size={24} color="#BDBDBD" />
          </View>
        </TouchableOpacity>
      </Camera>
      <Text style={styles.download}>
        {photo ? "Edit photo" : "Download photo"}
      </Text>

      <TextInput
        value={namePost}
        onChangeText={(value) => setNamePost(value)}
        style={styles.inputName}
        placeholder="Name..."
      />
      <View style={styles.boxLocation}>
        <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" style={{ marginBottom: 16 }} />

        <TextInput
        value={locationPost}
        onChangeText={(value) => setLocationPost(value)}
        placeholder="Location..."
      />
      </View>


      <TouchableOpacity style={{...styles.btnPublish, backgroundColor:photo !== null && namePost ? "#FF6C00" : "#F6F6F6" }} onPress={sendPhoto}>
        <Text style={{...styles.btnPublishText, color: photo !== null && namePost !== "" ? "#fff" : "#BDBDBD" }}>Publish</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    borderRadius: 8,
    height: 240,
    width: 343,
    marginTop: 34,
    marginHorizontal: 13,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },

  boxCamera: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90,
    marginHorizontal: 142,
  },
  photoContainer: {
    position: "absolute",
    top: -32,
    // borderRadius: 8,
    // borderColor: "#fff",
    // backgroundColor: "#fff",
  },
  image: {
    // width: 200,
    // height: 200,
    // backgroundColor: "#fff",
  },

  btnPublish: {
    width: 343,
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },

  btnPublishText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  download: {
    marginHorizontal: 13,
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 30,
  },

  inputName: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    height: 38,
    width: 343,
    marginHorizontal: 16,
    color: "#BDBDBD",
  },

  boxLocation: {
    display: "flex",
    flexDirection: "row",
    height: 40,
    width: 343,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    marginHorizontal: 16,
    marginBottom: 16,
    width: "100%",
    // alignContent: 'center'

  }
});
