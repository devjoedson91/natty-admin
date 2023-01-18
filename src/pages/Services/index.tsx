import { useEffect, useState, useLayoutEffect } from 'react';
import {
	Container,
	ContainerCategory,
	ContainerServices,
	CategoryName,
	ButtonService,
	NameService,
} from './styles';
import { FlatList } from 'react-native';
import { api } from '../../services/api';
import Loading from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { toastMessages } from '../../util/toastMessages';

export interface CategoriesProps {
	id: string;
	name: string;
	services: ServicesProps[];
}

export interface ServicesProps {
	id: string;
	name: string;
	price: string;
	category_id: string;
	categories: CategoriesProps;
}

export default function Services() {
	const [listCategories, setListCategories] = useState<CategoriesProps[]>([]);
	const [loading, setLoading] = useState(false);

	const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

	useEffect(() => {
		navigation.addListener('focus', () => {
			async function loadCategoriesAndServices() {
				setLoading(true);

				try {
					const response = await api.get('/category');
					setListCategories(response.data);
					setLoading(false);
				} catch (err) {
					console.log('Erro ao carregar categorias: ', err);
					toastMessages('Erro ao carregar categorias');
					setLoading(false);
				}
			}

			loadCategoriesAndServices();
		});
	}, [navigation]);

	function handleNavigateService(service_id: string) {
		navigation.navigate('StackServicesNavigation', { service_id: service_id });
	}

	if (loading) {
		return <Loading />;
	}

	return (
		<Container>
			<FlatList
				data={listCategories}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					return (
						<>
							<ContainerCategory>
								<CategoryName>{item.name}</CategoryName>
							</ContainerCategory>

							{item.services.map((service) => {
								return (
									<ContainerServices key={service.id}>
										<ButtonService
											onPress={() => handleNavigateService(service.id)}
										>
											<NameService>{service.name}</NameService>
										</ButtonService>
									</ContainerServices>
								);
							})}
						</>
					);
				}}
			/>
		</Container>
	);
}
