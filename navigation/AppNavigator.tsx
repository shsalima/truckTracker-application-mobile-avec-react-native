import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TruckStack from "./TruckStack";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="En service"
        component={TruckStack}
        options={{ title: "En service" }}
      />

      <Tab.Screen
        name="À l'arrêt"
        component={TruckStack}
        options={{ title: "À l'arrêt" }}
      />

      <Tab.Screen
        name="En maintenance"
        component={TruckStack}
        options={{ title: "Maintenance" }}
      />
    </Tab.Navigator>
  );
}