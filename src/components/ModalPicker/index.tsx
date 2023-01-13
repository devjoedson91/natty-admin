import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { CategoryProps } from '../../pages/StackServicesNavigation';
import { CategoryName } from './styles';

interface ModalPickerProps {
	options: CategoryProps[];
	handleCloseModal: () => void;
	selectedItem: (item: CategoryProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {
	function onPressItem(item: CategoryProps) {
		selectedItem(item);
		handleCloseModal();
	}

	const option = options.map((item, index) => {
		return (
			<TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
				<CategoryName>{item?.name}</CategoryName>
			</TouchableOpacity>
		);
	});

	return (
		<TouchableOpacity onPress={handleCloseModal} style={styles.container}>
			<View style={styles.content}>
				<ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	content: {
		width: WIDTH - 20,
		height: HEIGHT / 2,
		backgroundColor: '#f0f0f5',
		borderWidth: 1,
		borderColor: '#8a8a8a',
		borderRadius: 4,
	},

	option: {
		alignItems: 'flex-start',
		borderTopWidth: 0.8,
		borderTopColor: '#8a8a8a',
	},
});
