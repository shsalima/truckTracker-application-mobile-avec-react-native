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
import { TruckStatus } from "../types/Truck";

type Props = NativeStackScreenProps<
  TruckStackParamList,
  "AddTruck"
>;

export default function AddTruckScreen({
  navigation,
}: Props) {
  const { addTruck } = useTrucks();

  const [plateNumber, setPlateNumber] =
    useState("");

  const [color, setColor] =
    useState("");

  const [fuelType, setFuelType] =
    useState("");

  const [mileage, setMileage] =
    useState("");

  const [nextOilChangeMileage, setNextOilChangeMileage] =
    useState("");

  const [status, setStatus] =
    useState<TruckStatus>("En service");

  const handleAddTruck = () => {
    // Vérifier les champs obligatoires
    if (
      !plateNumber.trim() ||
      !color.trim() ||
      !fuelType.trim() ||
      !mileage.trim() ||
      !nextOilChangeMileage.trim()
    ) {
      Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs."
      );

      return;
    }

    // Convertir les kilométrages en nombres
    const mileageNumber = Number(mileage);

    const nextOilNumber = Number(
      nextOilChangeMileage
    );

    // Vérifier que les valeurs sont numériques
    if (
      Number.isNaN(mileageNumber) ||
      Number.isNaN(nextOilNumber)
    ) {
      Alert.alert(
        "Erreur",
        "Le kilométrage doit être numérique."
      );

      return;
    }

    // Vérifier que les kilométrages sont positifs
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

    // Vérifier la prochaine vidange
    if (nextOilNumber <= mileageNumber) {
      Alert.alert(
        "Erreur",
        "Le kilométrage de la prochaine vidange doit être supérieur au kilométrage actuel."
      );

      return;
    }

    // Créer le nouveau camion
    const newTruck = {
      id: Date.now().toString(),
      plateNumber: plateNumber.trim(),
      color: color.trim(),
      fuelType: fuelType.trim(),
      mileage: mileageNumber,
      status: status,
      nextOilChangeMileage: nextOilNumber,
    };

    // Ajouter le camion dans le Context
    addTruck(newTruck);

    // Message de confirmation
    Alert.alert(
      "Succès",
      "Le camion a été ajouté.",
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
    >
      {/* TITRE */}

      <Text style={styles.title}>
        Ajouter un camion
      </Text>

      <Text style={styles.subtitle}>
        Remplissez les informations du nouveau camion.
      </Text>

      {/* IMMATRICULATION */}

      <Text style={styles.label}>
        Immatriculation *
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
        Couleur *
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
        Type de carburant *
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
        Kilométrage initial *
      </Text>

      <TextInput
        style={styles.input}
        value={mileage}
        onChangeText={setMileage}
        placeholder="Ex : 120000"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
      />

      {/* PROCHAINE VIDANGE */}

      <Text style={styles.label}>
        Prochaine vidange *
      </Text>

      <TextInput
        style={styles.input}
        value={nextOilChangeMileage}
        onChangeText={setNextOilChangeMileage}
        placeholder="Ex : 130000"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
      />

      {/* STATUT */}

      <Text style={styles.label}>
        Statut initial *
      </Text>

      <View style={styles.statusContainer}>

        {/* EN SERVICE */}

        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "En service" &&
              styles.activeStatus,
          ]}
          onPress={() =>
            setStatus("En service")
          }
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
          onPress={() =>
            setStatus("À l'arrêt")
          }
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

      {/* BOUTON AJOUTER */}

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTruck}
      >
        <Text style={styles.addButtonText}>
          Ajouter le camion
        </Text>
      </TouchableOpacity>

      {/* BOUTON ANNULER */}

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>
          Annuler
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
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },

  subtitle: {
    color: "#64748B",
    fontSize: 12,
    marginBottom: 20,
  },

  label: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 7,
  },

  input: {
    height: 46,
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
    padding: 13,
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
    height: 48,
    backgroundColor: "#2563EB",
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

  cancelButton: {
    height: 45,
    backgroundColor: "#111B2E",
    borderWidth: 1,
    borderColor: "#26344D",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  cancelButtonText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "600",
  },
});