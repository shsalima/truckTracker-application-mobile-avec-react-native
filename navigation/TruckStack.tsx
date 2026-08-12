import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TruckListScreen from "../screens/TruckListScreen";
import TruckDetailScreen from "../screens/TruckDetailScreen";
import { TruckStatus } from "../types/Truck";

export type TruckStackParamList = {
  TruckList: undefined;
  TruckDetail: {
    truckId: string;
  };
};

type Props = {
  status: TruckStatus;
};

const Stack = createNativeStackNavigator<TruckStackParamList>();

export default function TruckStack({ status }: Props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TruckList">
        {(props) => (
          <TruckListScreen
            navigation={props.navigation}
            status={status}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="TruckDetail"
        component={TruckDetailScreen}
        options={{ title: "Détail du camion" }}
      />
    </Stack.Navigator>
  );
}