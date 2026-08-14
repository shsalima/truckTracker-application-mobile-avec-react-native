import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useTrucks } from "../context/TrucksContext";
import { TruckStackParamList } from "../navigation/TruckStack";

type Props = NativeStackScreenProps<
  TruckStackParamList,
  "TruckDetail"
>;

export default function TruckDetailScreen({
  route,
  navigation,
}: Props) {
  const {
    trucks,
    changeStatus,
    deleteTruck,
  } = useTrucks();

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

  const oilChangeDue =
    truck.mileage >= truck.nextOilChangeMileage;

  const statusColor =
    truck.status === "En service"
      ? "#00C781"
      : truck.status === "À l'arrêt"
      ? "#F59E0B"
      : "#EF4444";

  const handleDelete = () => {
    Alert.alert(
      "Supprimer le camion",
      `Voulez-vous vraiment supprimer ${truck.plateNumber} ?`,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            deleteTruck(truck.id);
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
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color="#CBD5E1"
          />

          <Text style={styles.backText}>
            Retour
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Camion {truck.plateNumber}
        </Text>

        <Ionicons
          name="refresh-outline"
          size={20}
          color="#94A3B8"
        />
      </View>

      {/* INFORMATIONS CAMION */}
      <View style={styles.mainCard}>
        <View style={styles.topRow}>
          <View style={styles.truckInfo}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="bus-outline"
                size={25}
                color="#3B82F6"
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

        {/* ACTIONS */}
        <View style={styles.actions}>
          {/* MODIFIER */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("EditTruck", {
                truckId: truck.id,
              })
            }
          >
            <Ionicons
              name="create-outline"
              size={17}
              color="#60A5FA"
            />

            <Text style={styles.editText}>
              Modifier
            </Text>
          </TouchableOpacity>

          {/* SUPPRIMER */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Ionicons
              name="trash-outline"
              size={17}
              color="#F43F5E"
            />

            <Text style={styles.deleteText}>
              Supprimer
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SUIVI KILOMETRAGE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Suivi du kilométrage & Vidange
        </Text>

        <View style={styles.oilBadge}>
          <Ionicons
            name="build-outline"
            size={13}
            color={
              oilChangeDue
                ? "#FFFFFF"
                : "#CBD5E1"
            }
          />

          <Text
            style={[
              styles.oilText,
              oilChangeDue &&
                styles.oilTextWarning,
            ]}
          >
            Vidange :{" "}
            {truck.nextOilChangeMileage.toLocaleString()} km
          </Text>
        </View>

        <View style={styles.nextOilBox}>
          <View style={styles.checkIcon}>
            <Ionicons
              name={
                oilChangeDue
                  ? "warning-outline"
                  : "checkmark"
              }
              size={17}
              color={
                oilChangeDue
                  ? "#F59E0B"
                  : "#00C781"
              }
            />
          </View>

          <View>
            <Text style={styles.nextOilTitle}>
              Prochaine vidange :{" "}
              <Text style={styles.greenText}>
                {truck.nextOilChangeMileage.toLocaleString()} km
              </Text>
            </Text>

            <Text style={styles.nextOilSubtitle}>
              {oilChangeDue
                ? "Vidange requise"
                : `Reste ${
                    truck.nextOilChangeMileage -
                    truck.mileage
                  } km avant révision`}
            </Text>
          </View>
        </View>

        <View style={styles.mileageRow}>
          <Text style={styles.smallText}>
            Actuel :{" "}
            {truck.mileage.toLocaleString()} km
          </Text>

          <Text style={styles.smallText}>
            Objectif :{" "}
            {truck.nextOilChangeMileage.toLocaleString()} km
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progress,
              {
                width: `${Math.min(
                  (truck.mileage /
                    truck.nextOilChangeMileage) *
                    100,
                  100
                )}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* CARACTERISTIQUES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Caractéristiques techniques
        </Text>

        <View style={styles.grid}>
          <View style={styles.infoCard}>
            <Text style={styles.label}>
              Couleur
            </Text>

            <Text style={styles.value}>
              {truck.color}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>
              Carburant
            </Text>

            <Text style={styles.value}>
              {truck.fuelType}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>
              Kilométrage total
            </Text>

            <Text style={styles.value}>
              {truck.mileage.toLocaleString()} km
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>
              Seuil vidange
            </Text>

            <Text style={styles.value}>
              {truck.nextOilChangeMileage.toLocaleString()} km
            </Text>
          </View>
        </View>
      </View>

      {/* CHANGEMENT DE STATUT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Changer le statut
        </Text>

        {/* EN SERVICE */}
        <TouchableOpacity
          style={[
            styles.statusButton,
            truck.status === "En service" &&
              styles.activeStatusButton,
          ]}
          onPress={() =>
            changeStatus(
              truck.id,
              "En service"
            )
          }
        >
          <Text
            style={[
              styles.statusButtonText,
              truck.status === "En service" &&
                styles.activeStatusText,
            ]}
          >
            En service
          </Text>
        </TouchableOpacity>

        {/* À L'ARRÊT */}
        <TouchableOpacity
          style={[
            styles.statusButton,
            truck.status === "À l'arrêt" &&
              styles.activeStatusButton,
          ]}
          onPress={() =>
            changeStatus(
              truck.id,
              "À l'arrêt"
            )
          }
        >
          <Text
            style={[
              styles.statusButtonText,
              truck.status === "À l'arrêt" &&
                styles.activeStatusText,
            ]}
          >
            À l'arrêt
          </Text>
        </TouchableOpacity>

        {/* EN MAINTENANCE */}
        <TouchableOpacity
          style={[
            styles.statusButton,
            truck.status === "En maintenance" &&
              styles.activeStatusButton,
          ]}
          onPress={() =>
            changeStatus(
              truck.id,
              "En maintenance"
            )
          }
        >
          <Text
            style={[
              styles.statusButtonText,
              truck.status === "En maintenance" &&
                styles.activeStatusText,
            ]}
          >
            En maintenance
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07101F",
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  backText: {
    color: "#CBD5E1",
    fontSize: 12,
  },

  headerTitle: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "700",
  },

  mainCard: {
    backgroundColor: "#111B2E",
    borderWidth: 1,
    borderColor: "#26344D",
    borderRadius: 14,
    padding: 15,
    marginBottom: 14,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  truckInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#17254D",
    justifyContent: "center",
    alignItems: "center",
  },

  plate: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "800",
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
    fontSize: 9,
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

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  editButton: {
    flex: 1,
    height: 40,
    backgroundColor: "#172338",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },

  editText: {
    color: "#CBD5E1",
    fontWeight: "600",
    fontSize: 12,
  },

  deleteButton: {
    flex: 1,
    height: 40,
    backgroundColor: "#291426",
    borderWidth: 1,
    borderColor: "#9F1239",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },

  deleteText: {
    color: "#F43F5E",
    fontWeight: "600",
    fontSize: 12,
  },

  section: {
    backgroundColor: "#111B2E",
    borderWidth: 1,
    borderColor: "#26344D",
    borderRadius: 14,
    padding: 15,
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
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
    marginBottom: 10,
  },

  oilText: {
    color: "#CBD5E1",
    fontSize: 10,
  },

  oilTextWarning: {
    color: "#F59E0B",
  },

  nextOilBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#172338",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 9,
    padding: 10,
    gap: 10,
  },

  checkIcon: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: "#073B35",
    justifyContent: "center",
    alignItems: "center",
  },

  nextOilTitle: {
    color: "#CBD5E1",
    fontSize: 10,
  },

  greenText: {
    color: "#00C781",
    fontWeight: "700",
  },

  nextOilSubtitle: {
    color: "#64748B",
    fontSize: 9,
    marginTop: 3,
  },

  mileageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  smallText: {
    color: "#94A3B8",
    fontSize: 9,
  },

  progressBackground: {
    height: 4,
    backgroundColor: "#26344D",
    borderRadius: 3,
    marginTop: 6,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#F59E0B",
    borderRadius: 3,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  infoCard: {
    width: "48%",
    backgroundColor: "#172338",
    borderWidth: 1,
    borderColor: "#26344D",
    borderRadius: 9,
    padding: 11,
  },

  label: {
    color: "#64748B",
    fontSize: 9,
    marginBottom: 5,
  },

  value: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: "600",
  },

  statusButton: {
    backgroundColor: "#172338",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    padding: 11,
    marginBottom: 8,
  },

  activeStatusButton: {
    backgroundColor: "#172B50",
    borderColor: "#2563EB",
  },

  statusButtonText: {
    color: "#CBD5E1",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
  },

  activeStatusText: {
    color: "#60A5FA",
  },

  error: {
    color: "#F43F5E",
    textAlign: "center",
    marginTop: 50,
  },
});