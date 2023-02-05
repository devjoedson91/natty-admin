import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { CategoryName } from './styles';
import { CategoriesProps } from '../../pages/Services';

interface ModalPickerProps {
	options: CategoriesProps[];
	handleCloseModal: () => void;
	selectedItem: (item: CategoriesProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {
	function onPressItem(item: CategoriesProps) {
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
		backgroundColor: '#872BC9',
		borderRadius: 4,
	},

	option: {
		alignItems: 'flex-start',
		borderTopWidth: 0.8,
		borderTopColor: '#e6e6e6',
	},
});
