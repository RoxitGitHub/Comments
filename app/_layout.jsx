import { Stack } from "expo-router"; 
import {useFonts } from "expo-font";
import * as SecureStore from 'expo-secure-store'
import {ClerkProvider } from "@clerk/clerk-expo"


const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

// Clear Clerk session cache on app load
{/*const clearClerkSession = async () => {
  await SecureStore.deleteItemAsync('__clerk_client_jwt');
  await SecureStore.deleteItemAsync('__clerk_refresh_token');
  console.log("Cleared Clerk session.");
}; 

clearClerkSession(); */}


export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
 

  useFonts({
      'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
      'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
      'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),

  })

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index"/>
        <Stack.Screen name="(tabs)"
           options={{
            headerShown: false
           }}
        />
        <Stack.Screen name="login/index"
        options={{
          headerShown:false 
        }}
        
        />
       
      </Stack>
      </ClerkProvider>
  );
}
