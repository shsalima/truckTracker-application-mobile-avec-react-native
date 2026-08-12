import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

function EnServiceScreen() {
  return (
    <View>
      <Text>En service</Text>
    </View>
  );
}

function AArretScreen() {
  return (
    <View>
      <Text>À l'arrêt</Text>
    </View>
  );
}

function MaintenanceScreen() {
  return (
    <View>
      <Text>En maintenance</Text>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="En service"
        component={EnServiceScreen}
      />

      <Tab.Screen
        name="À l'arrêt"
        component={AArretScreen}
      />

      <Tab.Screen
        name="En maintenance"
        component={MaintenanceScreen}
      />
    </Tab.Navigator>
  );
}