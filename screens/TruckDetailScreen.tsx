import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useTrucks } from "../context/TrucksContext";
import { TruckStackParamList } from "../navigation/TruckStack";

type Props = NativeStackScreenProps<
  TruckStackParamList,
  "TruckDetail"
>;

export default function TruckDetailScreen({
  route,
}: Props) {
  const { trucks } = useTrucks();

  const truck = trucks.find(
    (truck) => truck.id === route.params.truckId
  );

  if (!truck) {
    return (
      <View style={styles.container}>
        <Text>Camion introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {truck.plateNumber}
      </Text>

      <Text>Couleur : {truck.color}</Text>
      <Text>Carburant : {truck.fuelType}</Text>
      <Text>Kilométrage : {truck.mileage} km</Text>
      <Text>Statut : {truck.status}</Text>
      <Text>
        Prochaine vidange : {truck.nextOilChangeMileage} km
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
});