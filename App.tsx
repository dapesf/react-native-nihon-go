import { NavigationContainer } from '@react-navigation/native';
import Navigatior from './Navigation';
import './global.css'

//
import { SQLiteProvider } from 'expo-sqlite';

export default function App() {
  return (
    <SQLiteProvider
      databaseName="nihongo.db"
      assetSource={{ assetId: require('@/db/kanji.db') }}
    >
      <NavigationContainer>
        <Navigatior></Navigatior>
      </NavigationContainer>
    </SQLiteProvider>
  )
}