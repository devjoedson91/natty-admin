import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Entypo, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthContext } from '../contexts/AuthContext';

import Dashboard from '../pages/Dashboard';
import Reservations from '../pages/Reservations';
import StackServicesNavigation from '../pages/StackServicesNavigation';
import Services from '../pages/Services';

export type StackParamsList = {
	MainTabs: {
		screen: string;
	};
	StackServicesNavigation: {
		service_id?: string | undefined;
	};
};

export type TabParamsList = {
	Dashboard: undefined;
	Reservations: undefined;
	Services: undefined;
};

const Stack = createNativeStackNavigator<StackParamsList>();
const Tab = createBottomTabNavigator<TabParamsList>();

export default function AppRoutes() {
	const { signOut } = useContext(AuthContext);

	const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

	function MainTabs() {
		return (
			<Tab.Navigator
				screenOptions={{
					tabBarHideOnKeyboard: true,
					headerBackgroundContainerStyle: {
						borderBottomWidth: 1,
						borderColor: '#A5A4B4',
					},
					tabBarActiveTintColor: '#5841AD',
					tabBarStyle: {
						paddingBottom: 5,
						paddingTop: 5,
						borderTopWidth: 1,
						borderColor: '#A5A4B4',
						height: 60,
					},
				}}
			>
				<Tab.Screen
					name="Dashboard"
					component={Dashboard}
					options={{
						headerTitle: 'Dashboard',
						headerTitleAlign: 'center',
						headerTitleStyle: {
							color: '#5841AD',
						},
						tabBarLabel: 'Dashboard',
						headerShadowVisible: false, // applied here
						headerLeft: () => (
							<TouchableOpacity style={{ marginLeft: 10 }} onPress={signOut}>
								<Feather name="log-out" size={28} color="#ff3f4b" />
							</TouchableOpacity>
						),
						tabBarIcon: ({ color, size }) => (
							<Feather name="home" size={size} color={color} />
						),
					}}
				/>

				<Tab.Screen
					name="Reservations"
					component={Reservations}
					options={{
						headerTitle: 'Reservas',
						headerTitleAlign: 'center',
						headerTitleStyle: {
							color: '#5841AD',
						},
						tabBarLabel: 'Reservas',
						headerShadowVisible: false, // applied here
						tabBarIcon: ({ color, size }) => (
							<Entypo name="calendar" size={size} color={color} />
						),
					}}
				/>

				<Tab.Screen
					name="Services"
					component={Services}
					options={{
						headerTitle: 'Serviços',
						headerTitleAlign: 'center',
						headerTitleStyle: {
							color: '#5841AD',
						},
						tabBarLabel: 'Serviços',
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 15 }}
								onPress={() =>
									navigation.navigate('StackServicesNavigation', {
										service_id: undefined,
									})
								}
							>
								<Entypo name="circle-with-plus" size={35} color="#5841AD" />
							</TouchableOpacity>
						),
						tabBarIcon: ({ color, size }) => (
							<Feather name="settings" size={size} color={color} />
						),
					}}
				/>
			</Tab.Navigator>
		);
	}

	return (
		<Stack.Navigator
			screenOptions={{
				headerShadowVisible: false,
				contentStyle: {
					borderTopWidth: 1,
					borderBottomWidth: 1,
					borderColor: '#A5A4B4',
				},
			}}
		>
			<Stack.Screen
				name="MainTabs"
				component={MainTabs}
				options={{
					headerShown: false,
					contentStyle: {
						borderBottomWidth: 0,
					},
				}}
			/>
			<Stack.Screen
				name="StackServicesNavigation"
				component={StackServicesNavigation}
				options={{
					headerShown: false,
					contentStyle: {
						borderBottomWidth: 0,
					},
				}}
			/>
		</Stack.Navigator>
	);
}
