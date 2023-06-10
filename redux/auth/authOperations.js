import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, setState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        email: user.email,
      });
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.messag", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, setState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await updateProfile(user, {email: user.email});
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    } catch (error) {
      console.log("error", error);
      console.log("error.messag", error.message);
    }
    };
  

export const authSignOutUser = () => async (dispatch, setState) => {
  await auth.signOut();
  dispatch(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispatch, setState) => {
    await onAuthStateChanged((user) => {
        if (user) {
            dispatch(authSlice.actions.updateUserProfile({
                useId: user.uid,
                login: user.displayName,
            })),
                dispatch(authSlice.actions.authStateChange({ stateChange: true }))
        }

    })
};