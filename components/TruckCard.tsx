import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Truck } from "../types/Truck";

type Props = {
  truck: Truck;
  onPress: () => void;
};

export default function TruckCard({
  truck,
  onPress,
}: Props) {
  const oilChangeDue =
    truck.mileage >= truck.nextOilChangeMileage;

  const statusColor =
    truck.status === "En service"
      ? "#00C781"
      : truck.status === "À l'arrêt"
      ? "#F59E0B"
      : "#EF4444";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.plate}>
            {truck.plateNumber}
          </Text>

          <Text style={styles.color}>
            {truck.color}
          </Text>
        </View>

        {/* STATUS */}
        <View
          style={[
            styles.statusBadge,
            {
              borderColor: statusColor,
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: statusColor,
              },
            ]}
          />

          <Text
            style={[
              styles.statusText,
              {
                color: statusColor,
              },
            ]}
          >
            {truck.status}
          </Text>
        </View>
      </View>

      {/* INFORMATIONS */}
      <View style={styles.infoRow}>
        <View style={styles.info}>
          <Text style={styles.label}>
            Carburant
          </Text>

          <Text style={styles.value}>
            {truck.fuelType}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>
            Kilométrage
          </Text>

          <Text style={styles.value}>
            {truck.mileage.toLocaleString()} km
          </Text>
        </View>
      </View>

      {/* VIDANGE */}
      <View
        style={[
          styles.oilBadge,
          oilChangeDue
            ? styles.oilWarning
            : styles.oilNormal,
        ]}
      >
        <Text
          style={[
            styles.oilText,
            oilChangeDue
              ? styles.oilWarningText
              : styles.oilNormalText,
          ]}
        >
          {oilChangeDue
            ? "⚠ Vidange due"
            : `Vidange : ${truck.nextOilChangeMileage.toLocaleString()} km`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111B2E",
    borderWidth: 1,
    borderColor: "#26344D",
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  plate: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "800",
  },

  color: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },

  infoRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 25,
  },

  info: {
    flex: 1,
  },

  label: {
    color: "#64748B",
    fontSize: 9,
    marginBottom: 4,
  },

  value: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: "600",
  },

  oilBadge: {
    alignSelf: "flex-start",
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginTop: 14,
  },

  oilNormal: {
    backgroundColor: "#172338",
  },

  oilWarning: {
    backgroundColor: "#4A2A0A",
    borderWidth: 1,
    borderColor: "#F59E0B",
  },

  oilText: {
    fontSize: 10,
    fontWeight: "600",
  },

  oilNormalText: {
    color: "#94A3B8",
  },

  oilWarningText: {
    color: "#F59E0B",
  },
});