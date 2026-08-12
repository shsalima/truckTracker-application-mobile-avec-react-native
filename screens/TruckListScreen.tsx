import { View, Text, StyleSheet } from "react-native";
import { TruckStatus } from "../types/Truck";
import { useTrucks } from "../context/TrucksContext";

type Props = {
  status: TruckStatus;
};

export default function TruckListScreen({ status }: Props) {
  const { trucks } = useTrucks();

  const filteredTrucks = trucks.filter(
    (truck) => truck.status === status
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{status}</Text>

      {filteredTrucks.map((truck) => (
        <View key={truck.id} style={styles.card}>
          <Text style={styles.plate}>{truck.plateNumber}</Text>
          <Text>Couleur : {truck.color}</Text>
          <Text>Carburant : {truck.fuelType}</Text>
          <Text>Kilométrage : {truck.mileage} km</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
  },

  plate: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});