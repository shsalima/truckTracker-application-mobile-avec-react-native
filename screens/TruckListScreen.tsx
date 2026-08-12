import { View, Text, StyleSheet } from "react-native";
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
      <Text style={styles.title}>{status}</Text>

      {filteredTrucks.map((truck) => (
        <TruckCard
          key={truck.id}
          truck={truck}
          onPress={() =>
            navigation.navigate("TruckDetail", {
              truckId: truck.id,
            })
          }
        />
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
});