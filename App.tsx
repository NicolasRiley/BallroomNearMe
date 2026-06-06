import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import { SavedContext, useSavedVenuesProvider } from './src/hooks/useSavedVenues'
import HomeScreen from './src/screens/HomeScreen'
import VenueListScreen from './src/screens/VenueListScreen'
import VenueDetailScreen from './src/screens/VenueDetailScreen'
import VenueMapScreen from './src/screens/VenueMapScreen'
import SavedScreen from './src/screens/SavedScreen'
import AccountScreen from './src/screens/AccountScreen'
import PaymentsScreen from './src/screens/PaymentsScreen'
import BookingHistoryScreen from './src/screens/BookingHistoryScreen'
import DatePickerScreen from './src/screens/DatePickerScreen'
import BookingSummaryScreen from './src/screens/BookingSummaryScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VenueList" component={VenueListScreen} />
      <Stack.Screen name="VenueDetail" component={VenueDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VenueMap" component={VenueMapScreen} />
      <Stack.Screen name="DatePicker" component={DatePickerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccountHome" component={AccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Payments" component={PaymentsScreen} />
      <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} options={{ title: 'Booking history' }} />
    </Stack.Navigator>
  )
}

export default function App() {
  const saved = useSavedVenuesProvider()

  return (
    <SavedContext.Provider value={saved}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Search') {
                return <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
              }
              if (route.name === 'Saved') {
                return <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
              }
              if (route.name === 'Account') {
                return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
              }
            },
            tabBarActiveTintColor: '#c1603a',
            tabBarInactiveTintColor: '#999',
          })}
        >
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="Saved" component={SavedScreen} />
          <Tab.Screen name="Account" component={AccountStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </SavedContext.Provider>
  )
}