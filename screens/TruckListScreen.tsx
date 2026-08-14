import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { TruckStatus } from "../types/Truck";
import { useTrucks } from "../context/TrucksContext";
import TruckCard from "../components/TruckCard";
import { TruckStackParamList } from "../navigation/TruckStack";

type Props = {
  status: TruckStatus;
  navigation: NativeStackNavigationProp<
    TruckStackParamList,
    "TruckList"
  >;
};

export default function TruckListScreen({
  status,
  navigation,
}: Props) {
  const { trucks } = useTrucks();

  const filteredTrucks = trucks.filter(
    (truck) => truck.status === status
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {status}
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AddTruck")
          }
        >
          <Text style={styles.addText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTE */}
      {filteredTrucks.length === 0 ? (
        <Text style={styles.emptyText}>
          Aucun camion dans cette catégorie.
        </Text>
      ) : (
        filteredTrucks.map((truck) => (
          <TruckCard
            key={truck.id}
            truck={truck}
            onPress={() =>
              navigation.navigate("TruckDetail", {
                truckId: truck.id,
              })
            }
          />
        ))
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07101F",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "bold",
  },

  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "400",
    lineHeight: 30,
  },

  emptyText: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },
});