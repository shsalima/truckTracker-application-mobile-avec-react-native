import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TruckStack from "./TruckStack";

const Tab = createBottomTabNavigator();

function ServiceStack() {
  return <TruckStack status="En service" />;
}

function ArretStack() {
  return <TruckStack status="À l'arrêt" />;
}

function MaintenanceStack() {
  return <TruckStack status="En maintenance" />;
}

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="En service"
        component={ServiceStack}
      />

      <Tab.Screen
        name="À l'arrêt"
        component={ArretStack}
      />

      <Tab.Screen
        name="En maintenance"
        component={MaintenanceStack}
      />
    </Tab.Navigator>
  );
}