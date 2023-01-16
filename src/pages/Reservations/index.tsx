import { useState, useEffect } from 'react';
import { Container, ReservationsContainer, BodyText } from './styles';
import {
	ContainerReservations,
	AreaDescription,
	ServiceName,
	ClientName,
	DescriptionBlock,
	Hour,
	Price,
	ButtonReserve,
	ButtonText,
} from '../Dashboard/styles';
import { Octicons, Entypo } from '@expo/vector-icons';
import { formatPrice } from '../../util/format';
import { Calendar } from 'react-native-calendars';
import { localeConfig } from '../../util/calendarConfig';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { currentDate } from '../../util/format';
import { DateProps, MarkedDateKeysProp } from '../EditSchedules';
import { api } from '../../services/api';
import { ReservationsProps } from 'src/@types/reservations';
import Loading from '../../components/Loading';
import { toastMessages } from '../../util/toastMessages';

export default function Reservations() {
	const initialDate = currentDate(new Date());
	const [dateSelected, setDateSelected] = useState<DateProps>(() => {
		return {
			dateString: initialDate,
			day: Number(initialDate.slice(8, 10)),
			month: Number(initialDate.slice(5, 7)),
			timestamp: Date.parse(initialDate),
			year: new Date(initialDate).getFullYear(),
		};
	});
	const [reservations, setReservations] = useState<ReservationsProps[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadReservations();
	}, [dateSelected]);

	async function loadReservations() {
		setLoading(true);

		try {
			const response = await api.get('/reserve/detail/date', {
				params: {
					date: new Date(dateSelected.dateString),
				},
			});

			setReservations(response.data);
			setLoading(false);
		} catch (err) {
			console.log('Erro de requisição de reservas: ', err);
			toastMessages('Erro ao carregar reservas');
			setLoading(false);
		}
	}

	async function handleFinalizeReservation(reserve_id: string) {}

	let reserveDay = dateSelected.dateString.slice(8, 10);
	let reserveMonth = dateSelected.dateString.slice(5, 7);

	let currentDateMarked = dateSelected.dateString;

	let markedDates: MarkedDateKeysProp = {};

	markedDates[currentDateMarked ?? initialDate] = { selected: true, selectedColor: '#5841AD' };

	localeConfig.defaultLocale = 'br';
	return (
		<Container>
			<Calendar
				style={styles.calendar}
				current={
					dateSelected?.dateString === undefined ? initialDate : dateSelected?.dateString
				}
				markedDates={markedDates}
				onDayPress={(date) => {
					setDateSelected(date);
				}}
			/>
			<ReservationsContainer>
				<BodyText>
					reservas em {reserveDay}/{reserveMonth}
				</BodyText>
				{loading ? (
					<Loading />
				) : reservations.length === 0 ? (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Text>Sem reservas para esta data 🙁</Text>
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
										<Price>
											{formatPrice(parseFloat(item.services.price))}
										</Price>
									</DescriptionBlock>
								</AreaDescription>
								<ButtonReserve
									onPress={() => handleFinalizeReservation(item.id)}
									isFinalized={item.status}
								>
									<ButtonText>
										{item.status ? 'Finalizada' : 'Finalizar Reserva'}
									</ButtonText>
								</ButtonReserve>
							</ContainerReservations>
						)}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</ReservationsContainer>
		</Container>
	);
}

const styles = StyleSheet.create({
	calendar: {
		borderBottomWidth: 1,
		borderColor: '#e6e6e6',
	},
});
