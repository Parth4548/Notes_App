import React from 'react'
import { StyleSheet } from 'react-native'
import Home from './src/screens/Home'
import Card from './src/component/Card'
import Search from './src/screens/Search'

// to debug apk file- cd android then,
// gradlew assembleRelease

// Navigation
// yarn add @react-navigation/native
// yarn add react-native-screens react-native-safe-area-context
// npm install @react-navigation/native-stack
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerTitle: "My Notes",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="card"
          component={Card}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTitle: "Searching Notes",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
})

export default App