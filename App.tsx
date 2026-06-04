import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './src/screens/HomeScreen'
import VenueListScreen from './src/screens/VenueListScreen'
import VenueDetailScreen from './src/screens/VenueDetailScreen'
import VenueMapScreen from './src/screens/VenueMapScreen'
import SavedScreen from './src/screens/SavedScreen'
import AccountScreen from './src/screens/AccountScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VenueList" component={VenueListScreen} />
      <Stack.Screen name="VenueDetail" component={VenueDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VenueMap" component={VenueMapScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
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
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}