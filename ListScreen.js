import {
  StatusBar,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  TouchableHighlight,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DATA } from "./Data.js";

const { width, height } = Dimensions.get("screen");

export default function ListScreen({ navigation }) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              onPress={() => {
                {
                  navigation.navigate("PetProfile", {
                    item: item,
                  });
                }
              }}
            >
              <View style={styles.item}>
                <Image style={styles.image} />
                <View style={styles.item_text_view}>
                  <Text style={styles.item_name}>{item.name}</Text>
                  <Text style={styles.item_text}>Breed: {item.breed}</Text>
                  <Text style={styles.item_text}>Gender: {item.gender}</Text>
                  <Text style={styles.item_text}>Weight: {item.weight}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
        <TouchableOpacity
          style={styles.addPetBtn}
          onPress={() => {
            {
              navigation.navigate("AddNewPet");
            }
          }}
        >
          <Text>Add Pet</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").height * 0.4,
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "rgba(227, 253, 253, 0.1)",
  },
  item_text_view: {
    marginHorizontal: "10%",
  },
  item_text: {
    marginVertical: 4,
  },
  item_name: {
    fontSize: 30,
    alignSelf: "center",
    paddingBottom: 15,
  },
  image: {
    height: "100%",
    width: "50%",
    borderRadius: 50,
    alignSelf: "flex-start",
    backgroundColor: "grey",
  },
  addPetBtn: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#DCDCDC",
    height: Dimensions.get("window").height * 0.05,
    width: "50%",
    borderRadius: Math.round(
      (Dimensions.get("window").height + Dimensions.get("window").width) / 2
    ),
  },
});
