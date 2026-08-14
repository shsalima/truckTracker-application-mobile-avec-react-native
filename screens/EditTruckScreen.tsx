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
  "EditTruck"
>;

export default function EditTruckScreen({
  route,
  navigation,
}: Props) {
  const { trucks, updateTruck } = useTrucks();

  const truck = trucks.find(
    (item) => item.id === route.params.truckId
  );

  if (!truck) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Camion introuvable
        </Text>
      </View>
    );
  }

  return (
    <EditTruckForm
      truck={truck}
      updateTruck={updateTruck}
      navigation={navigation}
    />
  );
}

type EditTruckFormProps = {
  truck: {
    id: string;
    plateNumber: string;
    color: string;
    fuelType: string;
    mileage: number;
    status: TruckStatus;
    nextOilChangeMileage: number;
  };

  updateTruck: (
    id: string,
    updatedTruck: {
      plateNumber: string;
      color: string;
      fuelType: string;
      mileage: number;
      status: TruckStatus;
      nextOilChangeMileage: number;
    }
  ) => void;

  navigation: Props["navigation"];
};

function EditTruckForm({
  truck,
  updateTruck,
  navigation,
}: EditTruckFormProps) {
  const [plateNumber, setPlateNumber] = useState(
    truck.plateNumber
  );

  const [color, setColor] = useState(
    truck.color
  );

  const [fuelType, setFuelType] = useState(
    truck.fuelType
  );

  const [mileage, setMileage] = useState(
    String(truck.mileage)
  );

  const [nextOilChangeMileage, setNextOilChangeMileage] =
    useState(
      String(truck.nextOilChangeMileage)
    );

  const [status, setStatus] =
    useState<TruckStatus>(truck.status);

  const handleUpdate = () => {
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

    const mileageNumber = Number(mileage);
    const nextOilNumber = Number(
      nextOilChangeMileage
    );

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

    updateTruck(truck.id, {
      plateNumber: plateNumber.trim(),
      color: color.trim(),
      fuelType: fuelType.trim(),
      mileage: mileageNumber,
      status: status,
      nextOilChangeMileage: nextOilNumber,
    });

    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Modifier le camion
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
        Kilométrage
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

      {/* ENREGISTRER */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleUpdate}
      >
        <Text style={styles.saveText}>
          Enregistrer les modifications
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

  saveButton: {
    backgroundColor: "#2563EB",
    height: 48,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  error: {
    color: "#F43F5E",
    textAlign: "center",
    marginTop: 50,
  },
});