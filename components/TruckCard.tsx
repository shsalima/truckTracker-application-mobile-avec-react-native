import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Truck } from "../types/Truck";

type Props = {
  truck: Truck;
  onPress: () => void;
};

export default function TruckCard({ truck, onPress }: Props) {
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
      style={[
        styles.card,
        oilChangeDue && styles.warningCard,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.truckInfo}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="bus-outline"
              size={22}
              color="#D8E5FF"
            />
          </View>

          <View>
            <Text style={styles.plate}>
              {truck.plateNumber}
            </Text>

            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>
                {truck.plateNumber}
              </Text>
            </View>
          </View>
        </View>

        {/* Status */}
        <View
          style={[
            styles.statusBadge,
            { borderColor: statusColor },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: statusColor },
            ]}
          />

          <Text
            style={[
              styles.statusText,
              { color: statusColor },
            ]}
          >
            {truck.status}
          </Text>
        </View>
      </View>

      {/* Informations */}
      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <Ionicons
            name="ellipse"
            size={12}
            color="#3B82F6"
          />

          <Text style={styles.infoText}>
            {truck.color}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons
            name="flame-outline"
            size={16}
            color="#9CA3AF"
          />

          <Text style={styles.infoText}>
            {truck.fuelType}
          </Text>
        </View>

        <View style={styles.infoBottom}>
          <View style={styles.infoItem}>
            <Ionicons
              name="speedometer-outline"
              size={15}
              color="#9CA3AF"
            />

            <Text style={styles.infoText}>
              {truck.mileage.toLocaleString()} km
            </Text>
          </View>

          <Text style={styles.oilText}>
            Proch. vidange :{" "}
            {truck.nextOilChangeMileage.toLocaleString()} km
          </Text>
        </View>
      </View>

      {/* Vidange */}
      <View
        style={[
          styles.oilBadge,
          oilChangeDue && styles.oilBadgeWarning,
        ]}
      >
        <Ionicons
          name="build-outline"
          size={14}
          color={oilChangeDue ? "#FFFFFF" : "#CBD5E1"}
        />

        <Text
          style={[
            styles.oilBadgeText,
            oilChangeDue && styles.oilBadgeTextWarning,
          ]}
        >
          {oilChangeDue
            ? "Vidange requise"
            : `Vidange : ${truck.nextOilChangeMileage.toLocaleString()} km`}
        </Text>
      </View>

      {/* Detail */}
      <View style={styles.detailRow}>
        <Text style={styles.detailText}>
          Détails
        </Text>

        <Ionicons
          name="chevron-forward"
          size={18}
          color="#3B82F6"
        />
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
    padding: 14,
    marginBottom: 14,
  },

  warningCard: {
    borderColor: "#B91C4A",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  truckInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#17254D",
    justifyContent: "center",
    alignItems: "center",
  },

  plate: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "700",
  },

  plateBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#26344D",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 4,
  },

  plateText: {
    color: "#E2E8F0",
    fontSize: 10,
    fontWeight: "600",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: "#0D2630",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },

  infoBox: {
    backgroundColor: "#172338",
    borderRadius: 10,
    padding: 12,
    gap: 10,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  infoText: {
    color: "#CBD5E1",
    fontSize: 12,
  },

  infoBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  oilText: {
    color: "#94A3B8",
    fontSize: 10,
  },

  oilBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#26344D",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 10,
  },

  oilBadgeWarning: {
    backgroundColor: "#C51F55",
  },

  oilBadgeText: {
    color: "#CBD5E1",
    fontSize: 10,
    fontWeight: "600",
  },

  oilBadgeTextWarning: {
    color: "#FFFFFF",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
  },

  detailText: {
    color: "#60A5FA",
    fontSize: 11,
    fontWeight: "600",
  },
});