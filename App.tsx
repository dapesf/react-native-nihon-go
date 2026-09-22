import { NavigationContainer } from '@react-navigation/native';
import Navigatior from './src/navigation/Navigation';
import './global.css'

//
import { SQLiteProvider } from 'expo-sqlite';

export default function App() {
  return (
    <SQLiteProvider
      databaseName="nihongo.db"
      assetSource={{ assetId: require('@/db/kanji_20260919.db') }}
    >
      <NavigationContainer>
        <Navigatior></Navigatior>
      </NavigationContainer>
    </SQLiteProvider>
  )
}