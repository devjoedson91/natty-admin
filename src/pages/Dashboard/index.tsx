import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import {
	Container,
	Logo,
	ContentHeader,
	AmountClientView,
	PredictionView,
	TextContent,
	TotalPrediction,
	BodyText,
	ContainerReservations,
	AreaDescription,
	ServiceName,
	ClientName,
	DescriptionBlock,
	Price,
	Hour,
	ButtonReserve,
	ButtonText,
} from './styles';
import { api } from '../../services/api';
import Loading from '../../components/Loading';
import { formatPrice } from '../../util/format';
import { ReservationsProps } from '../../@types/reservations';
import { Octicons, Entypo } from '@expo/vector-icons';
import { currentDate } from '../../util/format';

export interface UserInfo {
	id: string;
	name: string;
	email: string;
}

export default function Dashboard() {
	const [loading, setLoading] = useState(false);
	const [reservations, setReservations] = useState<ReservationsProps[]>([]);
	const [totalCashToday, setTotalCashToday] = useState(formatPrice(0));

	useEffect(() => {
		async function loadReservations() {
			setLoading(true);

			try {
				const response = await api.get('/reserve/detail/date', {
					params: {
						date: new Date(currentDate(new Date())),
					},
				});

				setReservations(response.data);
				setLoading(false);
			} catch (err) {
				console.log('Erro de requisição: ', err);
				setLoading(false);
			}
		}

		loadReservations();
	}, []);

	useEffect(() => {
		if (reservations) {
			setTotalCashToday(() => {
				const total = formatPrice(
					reservations.reduce((sumTotal, { services }) => {
						return (sumTotal += parseFloat(services.price));
					}, 0)
				);

				return total;
			});
		}
	}, [reservations]);

	if (loading) {
		return <Loading />;
	}

	return (
		<Container>
			<Logo source={require('../../assets/logo.png')} />
			<ContentHeader>
				<AmountClientView>
					<TotalPrediction>{reservations && reservations.length}</TotalPrediction>
					<TextContent>Clientes Hoje</TextContent>
				</AmountClientView>
				<PredictionView>
					<TotalPrediction>{totalCashToday}</TotalPrediction>
					<TextContent>Previsão Hoje</TextContent>
				</PredictionView>
			</ContentHeader>
			<BodyText>PRÓXIMOS ATENDIMENTOS</BodyText>
			{reservations.length === 0 ? (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text>Sem reservas para hoje até o momento 🙁</Text>
				</View>
			) : (
				<FlatList
					style={{ marginTop: 20 }}
					data={reservations}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ContainerReservations>
							<AreaDescription>
								<ServiceName>{item.services.name}</ServiceName>
								<ClientName>{item.users.name}</ClientName>
								<DescriptionBlock>
									<Octicons name="stopwatch" size={15} color="black" />
									<Hour>{item.hour}</Hour>
								</DescriptionBlock>
								<DescriptionBlock>
									<Entypo name="price-tag" size={15} color="black" />
									<Price>{formatPrice(parseFloat(item.services.price))}</Price>
								</DescriptionBlock>
							</AreaDescription>
							<ButtonReserve disabled={item.status} isFinalized={item.status}>
								<ButtonText>
									{item.status ? 'Finalizada' : 'Finalizar Reserva'}
								</ButtonText>
							</ButtonReserve>
						</ContainerReservations>
					)}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</Container>
	);
}
