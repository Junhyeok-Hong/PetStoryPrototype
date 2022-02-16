import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNewPetScreen from "./AddNewPetScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddNewPet">
        <Stack.Screen name="AddNewPet" component={AddNewPetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
