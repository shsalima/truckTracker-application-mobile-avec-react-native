import { NavigationContainer } from "@react-navigation/native";
import { TrucksProvider } from "./context/TrucksContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <TrucksProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TrucksProvider>
  );
}