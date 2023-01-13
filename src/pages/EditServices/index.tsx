import { useState, useEffect, useLayoutEffect } from 'react';
import {
	Container,
	ButtonDeleteService,
	Description,
	Category,
	Price,
	Input,
	DataContainer,
	InputCategory,
	CategorySelectedText,
} from './styles';
import { View, Modal, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { ModalPicker } from '../../components/ModalPicker';
import { TextInputMask } from 'react-native-masked-text';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { CategoriesProps, ServicesProps } from '../Services';
import { toastMessages } from '../../util/toastMessages';
import Loading from '../../components/Loading';

export interface EditServicesProps {
	serviceSelected: string | undefined;
}

export default function EditServices({ serviceSelected }: EditServicesProps) {
	const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
	const setOptionsNavigation = useNavigation();

	const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

	const [servicesById, setServicesById] = useState<ServicesProps>();
	const [category, setCategory] = useState<CategoriesProps[]>([]);
	const [categorySelected, setCategorySelected] = useState<CategoriesProps | undefined>();

	const [description, setDescription] = useState('');
	const [inputCurrency, setInputCurrency] = useState('');
	const [loading, setLoading] = useState(false);

	// esconder tab de horários se o serviço não existir

	useLayoutEffect(() => {
		if (!serviceSelected) {
			setOptionsNavigation.setOptions({
				tabBarStyle: { display: 'none' },
			});
		}
	}, [setOptionsNavigation]);

	useLayoutEffect(() => {
		setOptionsNavigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 10 }}
					onPress={handleCreateAndUpdateService}
				>
					<AntDesign name="checkcircle" size={30} color="#5841AD" />
				</TouchableOpacity>
			),
		});
	}, [inputCurrency, description, categorySelected]);

	// carregando categorias

	useEffect(() => {
		async function loadInfo() {
			const response = await api.get('/category');

			setCategory(response.data);
		}

		loadInfo();
	}, []);

	// selecionando serviço

	useEffect(() => {
		async function loadServices() {
			if (serviceSelected !== undefined) {
				try {
					setLoading(true);
					const response = await api.get('/service', {
						params: {
							service_id: serviceSelected,
						},
					});

					setServicesById(response.data);

					const { name, price, categories } = response.data;

					setDescription(name);
					setCategorySelected(categories);
					setInputCurrency(price);
					setLoading(false);
				} catch (err) {
					console.log(err);
					setLoading(false);
					toastMessages('Erro ao carregar serviço');
				}
			}
		}

		loadServices();
	}, [serviceSelected]);

	// mudando categoria selecionada

	function handleChangeCategory(item: CategoriesProps) {
		setCategorySelected(item);
	}

	async function handleCreateAndUpdateService() {
		if (serviceSelected) {
			Alert.alert('Serviços', 'Deseja realmente editar esse serviço?', [
				{
					text: 'SIM',
					onPress: async () => {
						try {
							const response = await api.patch('/service', {
								service_id: serviceSelected,
								name: description,
								price: inputCurrency.replace('R$', ''),
								category_id: categorySelected?.id,
							});
							navigation.goBack();
							toastMessages('Serviço editado com sucesso!');
						} catch (err) {
							console.log('erro ao editar serviço: ', err);
							toastMessages('Erro ao editar serviço');
						}
					},
				},
				{
					text: 'NÂO',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
			]);
		} else {
			if (description === '' || inputCurrency === '' || categorySelected?.id === undefined) {
				toastMessages('Campos obrigatórios não preenchidos');
				return;
			}

			try {
				const response = await api.post('/service', {
					name: description,
					price: inputCurrency.replace('R$', ''),
					category_id: categorySelected.id,
				});
				navigation.navigate('MainTabs', { screen: 'Service' });
				toastMessages('Serviço cadastrado com sucesso!');
			} catch (err) {
				console.log('erro ao cadastrar serviço: ', err);
				toastMessages('Erro ao cadastrar serviço');
			}
		}
	}

	// removendo serviço

	async function handleRemoveService() {
		if (!serviceSelected) {
			toastMessages('Serviço não encontrado');
		} else {
			Alert.alert('Serviços', 'Deseja realmente excluir esse serviço?', [
				{
					text: 'SIM',
					onPress: async () => {
						try {
							await api.delete('/service', {
								params: {
									service_id: serviceSelected,
								},
							});

							navigation.navigate('MainTabs', {
								screen: 'Services',
							});

							toastMessages('Serviço excluído com sucesso!');
						} catch (err) {
							console.log('erro ao excluir serviço: ', err);
							toastMessages('erro ao excluir serviço');
						}
					},
				},
				{
					text: 'NÃO',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
			]);
		}
	}

	if (loading) {
		return <Loading />;
	}

	return (
		<Container>
			<DataContainer>
				<View>
					<Description>Descrição</Description>
					<Input
						placeholder="Nome do serviço"
						value={description}
						onChangeText={setDescription}
					/>
				</View>
				<View>
					<Category>Categoria</Category>
					<InputCategory onPress={() => setModalCategoryVisible(true)}>
						<CategorySelectedText>
							{categorySelected?.name ?? 'Selecione uma categoria'}
						</CategorySelectedText>
					</InputCategory>
				</View>
				<View>
					<Price>Valor do serviço</Price>
					<TextInputMask
						style={styles.price}
						type={'money'}
						maxLength={18}
						placeholder="0.00"
						value={inputCurrency}
						onChangeText={(value) => {
							setInputCurrency(value);
							// value = value.replace('R$', '');
							// value = value.replace('.', '');
							// value = value.replace(',', '');
							// setValueCurrency(Number(value));
						}}
					/>
				</View>
			</DataContainer>

			<ButtonDeleteService onPress={handleRemoveService}>
				<Feather name="trash-2" size={60} color="#ff3f4b" />
			</ButtonDeleteService>

			<Modal transparent={true} visible={modalCategoryVisible} animationType="fade">
				<ModalPicker
					handleCloseModal={() => setModalCategoryVisible(false)}
					options={category}
					selectedItem={handleChangeCategory}
				/>
			</Modal>
		</Container>
	);
}

const styles = StyleSheet.create({
	price: {
		fontSize: 16,
		marginTop: 7,
		borderBottomWidth: 1,
		borderColor: '#e6e6e6',
	},
});
