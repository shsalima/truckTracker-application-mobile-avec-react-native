import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TruckListScreen from "../screens/TruckListScreen";
import { TruckStatus } from "../types/Truck";

type Props = {
  status: TruckStatus;
};

const Stack = createNativeStackNavigator();

export default function TruckStack({ status }: Props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TruckList">
        {() => <TruckListScreen status={status} />}
      </Stack.Screen>

      <Stack.Screen
        name="TruckDetail"
        component={() => null}
        options={{ title: "Détail" }}
      />
    </Stack.Navigator>
  );
}