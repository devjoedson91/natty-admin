import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Reservations() {
	const [text, setText] = useState('');
	return (
		<View>
			<TextInput value={text} placeholder="digite" onChangeText={setText} />
			<Text>Reservations</Text>
		</View>
	);
}
