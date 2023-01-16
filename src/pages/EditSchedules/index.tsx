import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
	const [scheduleDate, setScheduleDate] = useState<ScheduleProps[]>([]);
	const [hour, setHour] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadSchedules();
	}, [dateSelected]);

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
			console.log('erro ao carregar horários:', err);
			toastMessages('Erro ao carregar horários');
		}
	}

	async function handleRemoveSchedule(schedule_id: string) {
		setLoading(true);

		try {
			await api.delete('/schedule', { params: { schedule_id: schedule_id } });

			setLoading(false);
			loadSchedules();
		} catch (err) {
			console.log('erro ao excluir horário:', err);
			toastMessages('Erro ao excluir horário');
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
			console.log('erro ao adicionar horário: ', err);
			toastMessages('Erro ao adicionar horário');
		}
	}

	function validateHourText(value: string) {
		let elementText = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1:$2');

		return elementText;
	}

	let currentDateMarked = dateSelected.dateString;

	let markedDates: MarkedDateKeysProp = {};

	markedDates[currentDateMarked ?? initialDate] = { selected: true, selectedColor: '#ee4691' };

	localeConfig.defaultLocale = 'br';

	return (
		<Container>
			<Calendar
				style={styles.calendar}
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
								<RemoveButton onPress={() => handleRemoveSchedule(item.id)}>
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

const styles = StyleSheet.create({
	calendar: {
		borderBottomWidth: 1,
		borderColor: '#e6e6e6',
	},
});
