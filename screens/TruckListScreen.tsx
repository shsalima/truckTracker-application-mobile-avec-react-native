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

  // Filtrer les camions selon le statut
  const filteredTrucks = trucks.filter(
    (truck) => truck.status === status
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            {status}
          </Text>

          <Text style={styles.count}>
            {filteredTrucks.length} camion
            {filteredTrucks.length > 1 ? "s" : ""}
          </Text>
        </View>

        {/* BOUTON AJOUTER */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AddTruck")
          }
        >
          <Text style={styles.addButtonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTE */}
      <View style={styles.list}>

        {filteredTrucks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Aucun camion
            </Text>

            <Text style={styles.emptyText}>
              Aucun camion dans ce statut.
            </Text>
          </View>
        ) : (
          filteredTrucks.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              onPress={() =>
                navigation.navigate(
                  "TruckDetail",
                  {
                    truckId: truck.id,
                  }
                )
              }
            />
          ))
        )}

      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "800",
  },

  count: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "400",
    lineHeight: 30,
  },

  list: {
    flex: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  emptyText: {
    color: "#64748B",
    fontSize: 12,
  },
});