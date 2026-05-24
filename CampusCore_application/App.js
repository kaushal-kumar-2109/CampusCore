import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

import { db,initLocalDatabase, } from './src/database/connect';
import { RootNavigator } from './src/navigation/rootNavigation';


export default function App() {
  useEffect(()=>{
    async function setTables() {
      await initLocalDatabase();
    }
    setTables();
  },[]);

  return (
    <NavigationContainer>
      <RootNavigator db={db} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
