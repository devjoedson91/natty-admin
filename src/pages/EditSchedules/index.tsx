import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { localeConfig } from '../../util/calendarConfig';
import { currentDate } from '../../util/format';
import { EditServicesProps } from '../EditServices';
import { Feather } from '@expo/vector-icons';
import {
	Container,
	ScheduleContainer,
	AddScheduleButton,
	TextButton,
	InputSchedule,
	LabelInput,
	ListContainer,
	HourDescription,
	RemoveButton,
	FormContainer,
} from './styles';
import { api } from '../../services/api';
import { toastMessages } from '../../util/toastMessages';
import Loading from '../../components/Loading';
import { ReservationsProps } from '../../@types/reservations';

export interface DateProps {
	dateString: string;
	day: number;
	month: number;
	timestamp: number;
	year: number;
}

interface ScheduleProps {
	id: string;
	date: string;
	hour: string;
	service_id: string;
}

interface MarkedDateProps {
	selected: boolean;
	selectedColor: string;
	// dotColor: string;
	// marked: boolean;
	// disabled: boolean;
	// disableTouchEvent: boolean;
	// activeOpacity: number;
}

export interface MarkedDateKeysProp {
	[key: string]: MarkedDateProps;
}

export default function EditSchedules({ serviceSelected }: EditServicesProps) {
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
	const [scheduleDate, setScheduleDate] = useState<ScheduleProps[]>([]);
	const [hour, setHour] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadReservations();
		loadSchedules();
	}, [dateSelected]);

	async function loadReservations() {
		const response = await api.get('/reserve/detail/date', {
			params: {
				date: dateSelected.dateString,
				service_id: serviceSelected,
			},
		});

		setReservations(response.data);
	}

	async function loadSchedules() {
		setLoading(true);
		try {
			const response = await api.get('/schedule/service/date', {
				params: {
					service_id: serviceSelected,
					date: dateSelected.dateString,
				},
			});

			setLoading(false);
			setScheduleDate(response.data);
		} catch (err) {
			setLoading(false);
			toastMessages('Erro ao carregar horários');
		}
	}

	async function handleRemoveSchedule(schedule_id: string, hour: string) {
		const reserverExists = reservations.some((reserve) => reserve.hour === hour);

		if (reserverExists) {
			toastMessages('Há reservas cadastradas para esse horário!');
		} else {
			setLoading(true);

			try {
				await api.delete('/schedule', { params: { schedule_id: schedule_id } });

				setLoading(false);
				loadSchedules();
			} catch (err) {
				setLoading(false);
				toastMessages('Erro ao excluir horário');
			}
		}
	}

	async function handleAddSchedule() {
		let hourPattern = /([01][0-9]|2[0-3]):[0-5][0-9]/;

		let isValid = hourPattern.test(hour);

		let scheduleExists = scheduleDate.find((schedule) => schedule.hour === hour);

		if (!isValid) {
			toastMessages('Horário inválido!');
			return;
		}

		if (scheduleExists) {
			toastMessages('Horário já existe!');
			return;
		}

		setLoading(true);

		try {
			const response = await api.post('/schedule', {
				date: dateSelected.dateString,
				hour: hour,
				service_id: serviceSelected,
			});

			loadSchedules();
			setLoading(false);
		} catch (err) {
			toastMessages('Erro ao adicionar horário');
			setLoading(false);
		}
	}

	function validateHourText(value: string) {
		let hour = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1:$2');

		return hour.slice(0, 5);
	}

	let currentDateMarked = dateSelected.dateString;

	let markedDates: MarkedDateKeysProp = {};

	markedDates[currentDateMarked ?? initialDate] = { selected: true, selectedColor: '#ee4691' };

	localeConfig.defaultLocale = 'br';

	return (
		<Container>
			<Calendar
				style={{ borderBottomWidth: 1, borderColor: '#e6e6e6' }}
				current={
					dateSelected?.dateString === undefined ? initialDate : dateSelected?.dateString
				}
				markedDates={markedDates}
				minDate={initialDate}
				onDayPress={(date) => {
					setDateSelected(date);
				}}
			/>
			<ScheduleContainer>
				<LabelInput>adicione seus horários</LabelInput>
				<FormContainer>
					<InputSchedule
						value={hour}
						keyboardType="numeric"
						placeholder="00:00"
						maxLength={5}
						onChangeText={(value) => setHour(validateHourText(value))}
					/>
					<AddScheduleButton onPress={handleAddSchedule}>
						<TextButton>add</TextButton>
					</AddScheduleButton>
				</FormContainer>
				{loading ? (
					<Loading />
				) : (
					<FlatList
						data={scheduleDate}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<ListContainer>
								<HourDescription>{item.hour}</HourDescription>
								<RemoveButton
									onPress={() => handleRemoveSchedule(item.id, item.hour)}
								>
									<Feather name="trash-2" size={30} color="#ff3f4b" />
								</RemoveButton>
							</ListContainer>
						)}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</ScheduleContainer>
		</Container>
	);
}
