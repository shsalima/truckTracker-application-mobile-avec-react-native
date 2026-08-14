import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

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

  const [search, setSearch] = useState("");

  const filteredTrucks = trucks.filter((truck) => {
    const sameStatus = truck.status === status;

    const matchesSearch = truck.plateNumber
      .toLowerCase()
      .includes(search.toLowerCase());

    return sameStatus && matchesSearch;
  });

  const oilChangeCount = filteredTrucks.filter(
    (truck) =>
      truck.mileage >= truck.nextOilChangeMileage
  ).length;

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>
            TruckTracker
          </Text>

          <Text style={styles.subtitle}>
            Gestion de flotte
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            // Ajouter plus tard
          }}
        >
          <Ionicons
            name="add"
            size={19}
            color="#FFFFFF"
          />

          <Text style={styles.addText}>
            Nouveau
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={18}
          color="#64748B"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par immatriculation..."
          placeholderTextColor="#64748B"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Informations */}
      <View style={styles.infoRow}>
        <Text style={styles.counter}>
          {filteredTrucks.length} camion
          {filteredTrucks.length > 1 ? "s" : ""}
          {" "}dans « {status} »
        </Text>

        {oilChangeCount > 0 && (
          <View style={styles.alertBadge}>
            <Ionicons
              name="warning-outline"
              size={12}
              color="#F43F5E"
            />

            <Text style={styles.alertText}>
              {oilChangeCount} vidange
              {oilChangeCount > 1 ? "s" : ""} due
              {oilChangeCount > 1 ? "s" : ""}
            </Text>
          </View>
        )}
      </View>

      {/* Liste des camions */}
      <FlatList
        data={filteredTrucks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TruckCard
            truck={item}
            onPress={() =>
              navigation.navigate("TruckDetail", {
                truckId: item.id,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="bus-outline"
              size={40}
              color="#475569"
            />

            <Text style={styles.emptyText}>
              Aucun camion trouvé
            </Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07101F",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  appName: {
    color: "#F8FAFC",
    fontSize: 19,
    fontWeight: "800",
  },

  subtitle: {
    color: "#64748B",
    fontSize: 10,
    marginTop: 2,
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
    gap: 4,
  },

  addText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111B2E",
    borderWidth: 1,
    borderColor: "#26344D",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
  },

  searchInput: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 12,
    marginLeft: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },

  counter: {
    color: "#CBD5E1",
    fontSize: 11,
  },

  alertBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#9F1239",
    backgroundColor: "#2A1020",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  alertText: {
    color: "#F43F5E",
    fontSize: 9,
    fontWeight: "700",
  },

  list: {
    paddingBottom: 20,
  },

  empty: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyText: {
    color: "#64748B",
    marginTop: 10,
    fontSize: 13,
  },
});