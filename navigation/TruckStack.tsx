import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

function TruckList() {
  return (
    <View>
      <Text>Liste des camions</Text>
    </View>
  );
}

function TruckDetail() {
  return (
    <View>
      <Text>Détail du camion</Text>
    </View>
  );
}

export default function TruckStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TruckList"
        component={TruckList}
        options={{ title: "Camions" }}
      />

      <Stack.Screen
        name="TruckDetail"
        component={TruckDetail}
        options={{ title: "Détail" }}
      />
    </Stack.Navigator>
  );
}