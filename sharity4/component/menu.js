import * as React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import home from '../screen/home.js'
import search from '../screen/search.js';
import user from '../screen/user.js';
import upload from '../screen/upload.js';

const Tab = createBottomTabNavigator();

export default function menu() {
    return (
        <Tab.Navigator
            initialRouteName="home"
            tabBarOptions={{
                activeTintColor: '#1979a9',
                keyboardHidesTabBar :true
            }}
        >
            <Tab.Screen name="home" component={home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (<Feather name="home" color={'grey'} size={30} />)
                }}
            />
            <Tab.Screen name="search" component={search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (<Feather name="search" color={'grey'} size={30} />)
                }}
            />
            <Tab.Screen name="upload" component={upload}
                options={{
                    tarBarLabel: 'Upload',
                    tabBarIcon: ({ color, size }) => (<Feather name="upload" color={'grey'} size={30} />)
                }}
            />
            <Tab.Screen name="user" component={user}
                options={{
                    tabBarLabel: 'User',
                    tabBarIcon: ({ color, size }) => (<Feather name="user" color={'grey'} size={30} />)
                }}
            />
        </Tab.Navigator>
    );
}