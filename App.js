import { View, Text, Image, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Detail from './src/Detail'

import Bottom_Tab from './src/Bottom_Tab'


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Bottom_Tab' screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="Bottom_Tab" component={Bottom_Tab} />
          <Stack.Screen name="Detail" component={Detail}  />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
export default App;
