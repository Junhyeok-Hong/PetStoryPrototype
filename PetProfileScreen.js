import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { DataTable } from "react-native-paper";
import React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DATA } from "./Data.js";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function PetProfileScreen({ navigation, route }) {
  var item = route.params.item;
  const vaccination_data = item.vaccination_data;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageView}>
          <Image style={styles.image} />
          <TouchableOpacity style={styles.addBtn}>
            <Image
              style={styles.plusImage}
              source={require("./assets/plus.jpg")}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.textStyle}> Name: </Text>

        <View style={styles.inputView}>
          <Text style={styles.TextInput}> {item.name} </Text>
        </View>

        <Text style={styles.textStyle}> Animal: </Text>

        <View style={styles.inputView}>
          <Text style={styles.TextInput}> {item.animal} </Text>
        </View>

        <Text style={styles.textStyle}> Breed: </Text>

        <View style={styles.inputView}>
          <Text style={styles.TextInput}> {item.breed} </Text>
        </View>

        <Text style={styles.textStyle}> Gender: </Text>

        <View style={styles.inputView}>
          <Text style={styles.TextInput}> {item.gender} </Text>
        </View>

        <Text style={styles.textStyle}> Weight: </Text>

        <View style={styles.inputView}>
          <Text style={styles.TextInput}> {item.weight} </Text>
        </View>

        <Text style={styles.textStyle}> Birth Date: </Text>

        <View style={styles.inputView}>
          <Text style={styles.TextInput}> {item.birth_date} </Text>
        </View>

        <Text style={styles.textStyle}> Vaccination Data: </Text>

        <DataTable style={styles.dataTableView}>
          <DataTable.Header>
            <DataTable.Title>Vaccination</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Location</DataTable.Title>
          </DataTable.Header>

          {vaccination_data.map((vaccination_data, key) => (
            <DataTable.Row>
              <DataTable.Cell>
                {vaccination_data.vaccinationName}
              </DataTable.Cell>
              <DataTable.Cell>
                {vaccination_data.vaccinationDate}
              </DataTable.Cell>
              <DataTable.Cell>
                {vaccination_data.vaccinationLocation}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <Text style={styles.textStyle}> Notes: </Text>

        <View style={styles.inputView}>
          <Text style={styles.TextInput}> {item.notes} </Text>
        </View>

        <TouchableOpacity
          style={styles.addPetBtn}
          onPress={() => {
            {
              navigation.navigate("List");
            }
          }}
        >
          <Text>Go to List</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },

  scrollView: {
    backgroundColor: "white",
  },

  imageView: {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
    alignSelf: "flex-start",
    backgroundColor: "#DCDCDC",
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").height * 0.2,
    borderRadius: Math.round(
      (Dimensions.get("window").height + Dimensions.get("window").width) / 2
    ),
  },

  petImage: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },

  addBtn: {
    marginRight: 5,
    marginTop: Dimensions.get("window").height * 0.14,
    alignSelf: "flex-end",
    height: Dimensions.get("window").height * 0.05,
    width: Dimensions.get("window").height * 0.05,
    borderRadius: Math.round(
      (Dimensions.get("window").height + Dimensions.get("window").width) / 2
    ),
  },

  plusImage: {
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: Math.round(
      (Dimensions.get("window").height + Dimensions.get("window").width) / 2
    ),
  },

  textStyle: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 5,
  },

  inputView: {
    backgroundColor: "#DCDCDC",
    height: Dimensions.get("window").height * 0.05,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    alignItems: "flex-start",
  },

  TextInput: {
    height: Dimensions.get("window").height * 0.05,
    width: "100%",
    flex: 1,
    padding: 10,
  },

  // This only works on iOS
  datePicker: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  dataTableView: {
    width: "84%",
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
  },

  addVaccinationDataBtn: {
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    marginRight: 30,
    backgroundColor: "#DCDCDC",
    height: Dimensions.get("window").height * 0.03,
    width: "15%",
    borderRadius: Math.round(
      (Dimensions.get("window").height + Dimensions.get("window").width) / 2
    ),
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "black",
    paddingRight: 30,
  },
});
