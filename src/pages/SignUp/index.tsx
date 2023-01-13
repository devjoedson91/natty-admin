import React, {useState, useContext} from "react";
import { ActivityIndicator, StyleSheet, ToastAndroid } from "react-native";
import {
    Container,
    Logo,
    Input,
    Button,
    ButtonText,
    Text,
    Title,
    ButtonRegister,
    RegisterText,
  } from "../SignIn/styles";

import * as Animatable from "react-native-animatable";
import {AuthContext} from '../../contexts/AuthContext';
import { NativeStackNavigationProp  } from "@react-navigation/native-stack";
import { StackParamsList } from '../../routes/app.routes';
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const {signUp, loadingAuth} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function goToSignIn() {

        navigation.popToTop();

    }

    async function handleSignUp() {

        if (email  === '' || password === '' || name === '') {

            ToastAndroid.showWithGravity(
                'Dados obrigatórios não preenchidos',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            
            return;

        }

        let data = {name, email, password};

        await signUp(data);

        navigation.popToTop();

    }

    return (
        <Container>

            <Logo source={require("../../assets/logo.png")} />

            <Animatable.View animation="fadeInLeft" delay={500}>
                <Text>Cadastre-se!</Text>
            </Animatable.View>

            <Animatable.View
                animation="fadeInUp"
                delay={500}
                style={styles.inputContainer}
            >

                <Title>Nome</Title>
                <Input
                    placeholder="Digite seu nome"
                    value={name}
                    onChangeText={setName}
                />
                <Title>Email</Title>
                <Input
                    placeholder="Digite um email..."
                    value={email}
                    onChangeText={setEmail}
                />

                <Title>Senha</Title>
                <Input
                    placeholder="Digite sua senha..."
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <Button onPress={handleSignUp}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color="#fff" />
                        ) : (
                        <ButtonText>Criar conta</ButtonText>
                    )}
                </Button>

                <ButtonRegister onPress={goToSignIn}>
                    <RegisterText>Já possui uma conta? Faça o login</RegisterText>
                </ButtonRegister>
            </Animatable.View>
        </Container>
    );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "95%",
    alignItens: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
});