import { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { store } from "./redux/store";
import Main from "./components/Main";
import { Provider } from "react-redux";



export default function App() {

  
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../myNewProject/assets/font/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
  <Main/>
    </Provider>
  
  )
}
