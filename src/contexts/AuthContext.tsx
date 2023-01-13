import React, { useState, createContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { api } from '../services/api';

type AuthContextData = {
	user: UserProps;
	isAuthenticated: boolean;
	signIn: (credentials: SignInProps) => Promise<void>; // <void> promise nao vai devolver nada
	signUp: (credentials: SignUpProps) => Promise<void>;
	signOut: () => Promise<void>;
	loadingAuth: boolean;
	loading: boolean;
};

type UserProps = {
	id: string;
	name: string;
	email: string;
	admin: boolean;
	token: string;
};

type AuthProviderProps = {
	children: ReactNode;
};

type SignInProps = {
	email: string;
	password: string;
};

type SignUpProps = {
	name: string;
	email: string;
	password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserProps>({
		id: '',
		name: '',
		email: '',
		admin: false,
		token: '',
	});

	const [loadingAuth, setLoadingAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	const isAuthenticated = !!user.name;

	useEffect(() => {
		async function getUser() {
			const userInfo = await AsyncStorage.getItem('@nattyapp');

			let hasUser: UserProps = JSON.parse(userInfo || '{}');

			// verificar se recebemos as informações

			if (Object.keys(hasUser).length > 0) {
				api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

				setUser({
					id: hasUser.id,
					name: hasUser.name,
					email: hasUser.email,
					admin: hasUser.admin,
					token: hasUser.token,
				});
			}

			setLoading(false);
		}

		getUser();
	}, []);

	async function signUp({ name, email, password }: SignUpProps) {
		setLoadingAuth(true);

		try {
			const response = await api.post('/users', { name, email, password, admin: true });
			setLoadingAuth(false);
		} catch (err) {
			console.log('ERRO AO CADASTRAR: ', err);
			setLoadingAuth(false);
		}
	}

	async function signIn({ email, password }: SignInProps) {
		setLoadingAuth(true);

		try {
			const response = await api.post('/session', { email, password });

			const { id, name, admin, token } = response.data;

			const data = { ...response.data };

			if (!admin) {
				console.log('entrou aqui');

				ToastAndroid.showWithGravity(
					'Usuário sem permissão de administrador',
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM
				);

				setLoadingAuth(false);
				return;
			}

			await AsyncStorage.setItem('@nattyapp', JSON.stringify(data));

			// informando o token do usuario para todas as rotas

			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

			setUser({ id, name, email, admin, token });

			setLoadingAuth(false);
		} catch (err) {
			console.log('erro ao acessar', err);
			setLoadingAuth(false);
		}
	}

	// metodo para fazer logout

	async function signOut() {
		await AsyncStorage.clear().then(() => {
			setUser({ id: '', name: '', email: '', admin: false, token: '' });
		});
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, loading, loadingAuth, signIn, signOut, signUp }}
		>
			{children}
		</AuthContext.Provider>
	);
}
