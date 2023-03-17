import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home'
import Search from './Search'
import Detail from './Detail'

const Tab = createBottomTabNavigator();
const Bottom_Tab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('../image/home.png')} />
          ),
        }}
      />
      <Tab.Screen name="Detail" component={Detail}
        options={{
          tabBarButton: () => { }
        }}
      />
      <Tab.Screen name="Search" component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('../image/search.png')} />
          ),
        }}

      />
    </Tab.Navigator>
  );
}

export default Bottom_Tab
