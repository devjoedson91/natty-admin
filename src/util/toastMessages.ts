import { ToastAndroid } from 'react-native';

export function toastMessages(message: string) {

    ToastAndroid.showWithGravity(
        `${message}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
}
