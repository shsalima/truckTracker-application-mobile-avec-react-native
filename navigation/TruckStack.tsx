import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TruckListScreen from "../screens/TruckListScreen";
import TruckDetailScreen from "../screens/TruckDetailScreen";
import EditTruckScreen from "../screens/EditTruckScreen";
import AddTruckScreen from "../screens/AddTruckScreen";

import { TruckStatus } from "../types/Truck";

export type TruckStackParamList = {
  TruckList: undefined;

  TruckDetail: {
    truckId: string;
  };

  EditTruck: {
    truckId: string;
  };

  AddTruck: undefined;
};

type Props = {
  status: TruckStatus;
};

const Stack =
  createNativeStackNavigator<TruckStackParamList>();

export default function TruckStack({ status }: Props) {
  return (
    <Stack.Navigator>

      {/* LISTE DES CAMIONS */}
      <Stack.Screen
        name="TruckList"
        options={{
          title: status,
        }}
      >
        {(props) => (
          <TruckListScreen
            {...props}
            status={status}
          />
        )}
      </Stack.Screen>

      {/* DETAIL DU CAMION */}
      <Stack.Screen
        name="TruckDetail"
        component={TruckDetailScreen}
        options={{
          title: "Détail du camion",
        }}
      />

      {/* MODIFIER LE CAMION */}
      <Stack.Screen
        name="EditTruck"
        component={EditTruckScreen}
        options={{
          title: "Modifier le camion",
        }}
      />

      {/* AJOUTER UN CAMION */}
      <Stack.Screen
        name="AddTruck"
        component={AddTruckScreen}
        options={{
          title: "Ajouter un camion",
        }}
      />

    </Stack.Navigator>
  );
}