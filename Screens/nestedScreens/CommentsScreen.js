import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useState } from "react";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { collection, addDoc, doc, onSnapshot, getCountFromServer } from "firebase/firestore";
import { useEffect } from "react";

const CommentsScreen = ({ route }) => {
  const postId = route.params.postId;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);

  const createComment = async () => {
    const postsCollection = await collection(db, "posts");
    const newPostRef = await doc(postsCollection, postId);
    const newCollection = await collection(newPostRef, "comments");

    await addDoc(newCollection, { comment, login });

    await setComment("");
  };


  const getAllComments = async () => {
    const postsCollection = await collection(db, "posts");
    const newPostRef = await doc(postsCollection, postId);
    const newCollection = await collection(newPostRef, "comments");
    const snapshot = await getCountFromServer(newCollection);

    const commentCounter = snapshot.data().count;
    console.log('commentCounter: ', commentCounter);

     await onSnapshot(newCollection, (snapshot) => {
       setAllComments(snapshot.docs.map((doc) => doc.data()));
     });
    return (commentCounter);
  };


  useEffect(() => {
    getAllComments();
  }, []);




  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={allComments}
          renderItem={({ item }) => (
          <View style={styles.input}>
              <Text>{item.comment}</Text>
        
              </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
      <TextInput style={styles.input} onChangeText={setComment} />
      <TouchableOpacity style={styles.btn} onPress={createComment}>
        <Text style={styles.btnText}>Comment...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: 299,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    padding: 16,
    marginBottom: 24
  },
  btn: {
    borderRadius: 100,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    justifyContent: "center",

    marginTop: 31,
  },
  btnText: {
    fontSize: 16,
    color: "#BDBDBD",
    textAlign: "left",
    marginRight: 16,
  },
});
