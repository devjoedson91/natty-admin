import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';

import EditServices from '../EditServices';
import EditSchedules from '../EditSchedules';

export type TabParamsList = {
	EditServices: {
		service_id: string | undefined;
	};
	EditSchedules: {
		service_id: string | undefined;
	};
};

const Tab = createBottomTabNavigator<TabParamsList>();

type RouteDetailsParams = {
	Service: {
		service_id: string | undefined;
	};
};

type ServiceRouteProps = RouteProp<RouteDetailsParams, 'Service'>;

export default function StackServicesNavigation() {
	const navigation = useNavigation();
	const route = useRoute<ServiceRouteProps>();

	const serviceSelected = route.params.service_id;

	return (
		<Tab.Navigator
			screenOptions={{
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
			initialRouteName="EditServices"
		>
			<Tab.Screen
				name="EditServices"
				options={{
					headerTitle: 'Editar Serviço',
					headerTitleAlign: 'center',
					headerTitleStyle: {
						color: '#5841AD',
					},
					headerShadowVisible: false, // applied here
					tabBarLabel: 'Dados do serviço',
					tabBarIconStyle: {
						display: 'none',
					},
					headerLeft: () => (
						<TouchableOpacity
							style={{ marginLeft: 10 }}
							onPress={() => navigation.goBack()}
						>
							<AntDesign name="arrowleft" size={30} color="#5841AD" />
						</TouchableOpacity>
					),
					tabBarLabelStyle: {
						fontWeight: 'bold',
						fontSize: 16,
						textAlignVertical: 'center',
						height: '95%',
						width: '100%',
					},
				}}
			>
				{(props) => <EditServices serviceSelected={serviceSelected} {...props} />}
			</Tab.Screen>
			<Tab.Screen
				name="EditSchedules"
				options={{
					headerTitle: 'Horários',
					headerTitleAlign: 'center',
					headerTitleStyle: {
						color: '#5841AD',
					},
					headerShadowVisible: false, // applied here
					tabBarLabel: 'Horários',
					tabBarIconStyle: {
						display: 'none',
					},
					tabBarLabelStyle: {
						fontWeight: 'bold',
						fontSize: 16,
						textAlignVertical: 'center',
						height: '95%',
						width: '100%',
					},
				}}
			>
				{(props) => <EditSchedules serviceSelected={serviceSelected} {...props} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
}
