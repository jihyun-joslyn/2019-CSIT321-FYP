import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import login from './screen/login.js';
import register from './screen/register.js';
import user from './screen/user';
import menu from './component/menu.js';
import cart from './screen/cart.js';
import favourite from './screen/favourite.js';
import purchasedList from './screen/purchasedList.js';
import editprofile from './screen/editUserProfile';
import category from './screen/category.js';
import itemdetail from './screen/itemdetail.js';
import changePW from './screen/changePW.js';
import userInfo from './screen/userInfo.js'
import following from './screen/following.js'
import payment from './screen/payment.js'
import pay from './screen/pay.js'
import editdetail from './screen/editdetail.js'
import addComment from './screen/addComment.js'
import moredetail from './screen/moredetail.js'
import transdetail from './screen/transdetail.js'
import searchResult from './screen/searchResult.js'
import viewHistory from './screen/viewHistory.js'
import subComment from './screen/subComment.js'

const Stack = createStackNavigator();

const getFonts = () => Font.loadAsync({
  'roboto-regular': require('./assets/font/Roboto-Regular.ttf'),
  'roboto-bold': require('./assets/font/Roboto-Bold.ttf'),
  'roboto-light': require('./assets/font/Roboto-Light.ttf')
});


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1979a9',
            },
            headerTintColor: 'white'
          }}>
          <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
          <Stack.Screen name="register" component={register} options={{ headerShown: false }} />
          <Stack.Screen name="menu" component={menu} options={{ headerShown: false }} />
          <Stack.Screen name="user" component={user} options={{ headerShown: false }} />
          <Stack.Screen name="cart" component={cart} options={{ title: '' }} />
          <Stack.Screen name="favourite" component={favourite} options={{ title: ' ' }} />
          <Stack.Screen name="purchased" component={purchasedList} options={{ title: '' }} />
          <Stack.Screen name="editprofile" component={editprofile} options={{ title: '' }} />
          <Stack.Screen name="category" component={category} options={{ title: '' }} />
          <Stack.Screen name="itemdetail" component={itemdetail} options={{ title: '' }} />
          <Stack.Screen name="changePW" component={changePW} options={{ title: '' }} />
          <Stack.Screen name="userInfo" component={userInfo} options={{ title: '' }} />
          <Stack.Screen name="following" component={following} options={{ title: '' }} />
          <Stack.Screen name="payment" component={payment} options={{ title: '' }} />
          <Stack.Screen name="pay" component={pay} options={{ title: '' }} />
          <Stack.Screen name="editdetail" component={editdetail} options={{ title: '' }} />
          <Stack.Screen name="addComment" component={addComment} options={{ title: '' }} />
          <Stack.Screen name="moredetail" component={moredetail} options={{ title: '' }} />
          <Stack.Screen name="transdetail" component={transdetail} options={{ title: '' }} />
          <Stack.Screen name="searchResult" component={searchResult} options={{ title: '' }} />
          <Stack.Screen name="viewHistory" component={viewHistory} options={{ title: '' }} />
          <Stack.Screen name="subComment" component={subComment} options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
}


