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
import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DATA } from "./Data.js";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function AddNewPetScreenPrototype({ navigation }) {
  // The variables to be stored as an object in the database
  const [key, setKey] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [age, setAge] = useState("");
  const [vaccination_name, setVaccinationName] = useState("");
  const [vaccination_date, setVaccinationDate] = useState("");
  const [vaccination_location, setVaccinationLocation] = useState("");
  const [notes, setNotes] = useState("");
  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Neutered", value: "Neutered" },
    { label: "Spayed", value: "Spayed" },
  ];
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [ageDate, setAgeDate] = useState(new Date(Date.now()));
  const [showAgeCalendar, showAgeCalendarToggle] = useState(false);
  const [showRow, showRowToggle] = useState(false);

  const [VaccinationDate, setRawVaccinationDate] = useState(
    new Date(Date.now())
  );
  const [showVaccinationDateCalendar, showVaccinationDateCalendarToggle] =
    useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onAgeChange = (event, value) => {
    setAgeDate(value);
    setBirthDate(ageDate.toUTCString());
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onVaccinationDateChange = (event, value) => {
    setRawVaccinationDate(value);
    setVaccinationDate(VaccinationDate.toUTCString());
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const [vaccination_data, setVaccinationData] = useState([]);

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
          <TextInput
            style={styles.TextInput}
            secureTextEntry={false}
            onChangeText={(name) => setName(name)}
          />
        </View>

        <Text style={styles.textStyle}> Animal: </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={false}
            onChangeText={(animal) => setAnimal(animal)}
          />
        </View>

        <Text style={styles.textStyle}> Breed: </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={false}
            onChangeText={(breed) => setBreed(breed)}
          />
        </View>

        <Text style={styles.textStyle}> Gender: </Text>

        <View style={styles.inputView}>
          <RNPickerSelect
            placeholder={{
              label: "Select a gender...",
              value: null,
              color: "blue",
            }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
                right: 10,
              },
            }}
            onValueChange={(value) => setGender(value)}
            items={genders}
          />
        </View>

        <Text style={styles.textStyle}> Weight: </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={false}
            onChangeText={(weight) => setWeight(weight)}
          />
        </View>

        <Text style={styles.textStyle}> Birth Date: </Text>

        <TouchableOpacity
          style={styles.inputView}
          onPress={() => {
            if (showAgeCalendar) showAgeCalendarToggle(false);
            else showAgeCalendarToggle(true);
          }}
        >
          <Text style={styles.TextInput}>{ageDate.toUTCString()}</Text>
        </TouchableOpacity>

        {showAgeCalendar && (
          <DateTimePicker
            value={ageDate}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onAgeChange}
            style={styles.datePicker}
          />
        )}

        <Text style={styles.textStyle}> Vaccination Data: </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={false}
            onChangeText={(vaccination_name) => {
              setVaccinationName(vaccination_name);
              showRowToggle(true);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.inputView}
          onPress={() => {
            if (showVaccinationDateCalendar)
              showVaccinationDateCalendarToggle(false);
            else showVaccinationDateCalendarToggle(true);
          }}
        >
          <Text style={styles.TextInput}>{VaccinationDate.toUTCString()}</Text>
        </TouchableOpacity>

        {showVaccinationDateCalendar && (
          <DateTimePicker
            value={VaccinationDate}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onVaccinationDateChange}
            style={styles.datePicker}
          />
        )}

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={false}
            onChangeText={(vaccination_location) => {
              setVaccinationLocation(vaccination_location);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.addVaccinationDataBtn}
          onPress={() => {
            {
              setVaccinationData([
                ...vaccination_data,
                {
                  key: "key" + vaccination_data.length,
                  vaccinationName: vaccination_name,
                  vaccinationDate: vaccination_date,
                  vaccinationLocation: vaccination_location,
                },
              ]);
            }
          }}
        >
          <Text>Add+</Text>
        </TouchableOpacity>

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
          <TextInput
            style={styles.TextInput}
            secureTextEntry={false}
            onChangeText={(notes) => setNotes(notes)}
          />
        </View>

        <TouchableOpacity
          style={styles.addPetBtn}
          onPress={() => {
            {
              DATA.push({
                key: "key" + name + DATA.length,
                name: name,
                animal: animal,
                breed: breed,
                gender: gender,
                weight: weight,
                birth_date: birth_date,
                vaccination_data: vaccination_data,
                notes: notes,
              });
            }
            {
              navigation.navigate("PetProfile", {
                item: DATA.slice(-1)[0],
              });
            }
          }}
        >
          <Text>Add Pet</Text>
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
