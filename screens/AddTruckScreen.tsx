import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useTrucks } from "../context/TrucksContext";
import { TruckStackParamList } from "../navigation/TruckStack";
import { TruckStatus, Truck } from "../types/Truck";

type Props = NativeStackScreenProps<
  TruckStackParamList,
  "AddTruck"
>;

export default function AddTruckScreen({
  navigation,
}: Props) {
  const { addTruck } = useTrucks();

  const [plateNumber, setPlateNumber] = useState("");
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [mileage, setMileage] = useState("");
  const [nextOilChangeMileage, setNextOilChangeMileage] =
    useState("");

  const [status, setStatus] =
    useState<TruckStatus>("En service");

  const handleAdd = () => {
    // 1. Vérifier les champs
    if (
      plateNumber.trim() === "" ||
      color.trim() === "" ||
      fuelType.trim() === "" ||
      mileage.trim() === "" ||
      nextOilChangeMileage.trim() === ""
    ) {
      Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs."
      );

      return;
    }

    // 2. Convertir les kilomètres
    const mileageNumber = Number(mileage);
    const nextOilNumber = Number(
      nextOilChangeMileage
    );

    // 3. Vérifier les nombres
    if (
      !Number.isFinite(mileageNumber) ||
      !Number.isFinite(nextOilNumber)
    ) {
      Alert.alert(
        "Erreur",
        "Le kilométrage doit être un nombre."
      );

      return;
    }

    // 4. Vérifier les valeurs négatives
    if (
      mileageNumber < 0 ||
      nextOilNumber < 0
    ) {
      Alert.alert(
        "Erreur",
        "Le kilométrage ne peut pas être négatif."
      );

      return;
    }

    // 5. Vérifier la vidange
    if (nextOilNumber < mileageNumber) {
      Alert.alert(
        "Erreur",
        "La prochaine vidange doit être supérieure ou égale au kilométrage actuel."
      );

      return;
    }

    // 6. Créer le camion
    const newTruck: Truck = {
      id: Date.now().toString(),
      plateNumber: plateNumber.trim(),
      color: color.trim(),
      fuelType: fuelType.trim(),
      mileage: mileageNumber,
      status: status,
      nextOilChangeMileage: nextOilNumber,
    };

    // 7. Ajouter le camion
    addTruck(newTruck);

    // 8. Confirmation
    Alert.alert(
      "Succès",
      "Le camion a été ajouté avec succès.",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Ajouter un camion
      </Text>

      {/* IMMATRICULATION */}
      <Text style={styles.label}>
        Immatriculation
      </Text>

      <TextInput
        style={styles.input}
        value={plateNumber}
        onChangeText={setPlateNumber}
        placeholder="Ex : 12345-A-6"
        placeholderTextColor="#64748B"
        autoCapitalize="characters"
      />

      {/* COULEUR */}
      <Text style={styles.label}>
        Couleur
      </Text>

      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
        placeholder="Ex : Blanc"
        placeholderTextColor="#64748B"
      />

      {/* CARBURANT */}
      <Text style={styles.label}>
        Type de carburant
      </Text>

      <TextInput
        style={styles.input}
        value={fuelType}
        onChangeText={setFuelType}
        placeholder="Ex : Diesel"
        placeholderTextColor="#64748B"
      />

      {/* KILOMETRAGE */}
      <Text style={styles.label}>
        Kilométrage initial
      </Text>

      <TextInput
        style={styles.input}
        value={mileage}
        onChangeText={setMileage}
        keyboardType="numeric"
        placeholder="Ex : 120000"
        placeholderTextColor="#64748B"
      />

      {/* PROCHAINE VIDANGE */}
      <Text style={styles.label}>
        Prochaine vidange
      </Text>

      <TextInput
        style={styles.input}
        value={nextOilChangeMileage}
        onChangeText={setNextOilChangeMileage}
        keyboardType="numeric"
        placeholder="Ex : 130000"
        placeholderTextColor="#64748B"
      />

      {/* STATUT */}
      <Text style={styles.label}>
        Statut
      </Text>

      <View style={styles.statusContainer}>

        {/* EN SERVICE */}
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "En service" &&
              styles.activeStatus,
          ]}
          onPress={() => setStatus("En service")}
        >
          <Text
            style={[
              styles.statusText,
              status === "En service" &&
                styles.activeText,
            ]}
          >
            En service
          </Text>
        </TouchableOpacity>

        {/* À L'ARRÊT */}
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "À l'arrêt" &&
              styles.activeStatus,
          ]}
          onPress={() => setStatus("À l'arrêt")}
        >
          <Text
            style={[
              styles.statusText,
              status === "À l'arrêt" &&
                styles.activeText,
            ]}
          >
            À l'arrêt
          </Text>
        </TouchableOpacity>

        {/* EN MAINTENANCE */}
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "En maintenance" &&
              styles.activeStatus,
          ]}
          onPress={() =>
            setStatus("En maintenance")
          }
        >
          <Text
            style={[
              styles.statusText,
              status === "En maintenance" &&
                styles.activeText,
            ]}
          >
            En maintenance
          </Text>
        </TouchableOpacity>

      </View>

      {/* AJOUTER */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAdd}
      >
        <Text style={styles.addButtonText}>
          Ajouter le camion
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07101F",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 25,
  },

  label: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    height: 45,
    backgroundColor: "#111B2E",
    borderWidth: 1,
    borderColor: "#26344D",
    borderRadius: 9,
    paddingHorizontal: 12,
    color: "#F8FAFC",
    fontSize: 12,
  },

  statusContainer: {
    gap: 8,
  },

  statusButton: {
    backgroundColor: "#111B2E",
    borderWidth: 1,
    borderColor: "#26344D",
    borderRadius: 9,
    padding: 12,
  },

  activeStatus: {
    backgroundColor: "#172B50",
    borderColor: "#2563EB",
  },

  statusText: {
    color: "#CBD5E1",
    textAlign: "center",
    fontSize: 12,
  },

  activeText: {
    color: "#60A5FA",
    fontWeight: "700",
  },

  addButton: {
    backgroundColor: "#2563EB",
    height: 48,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});