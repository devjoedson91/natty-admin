import React, {useState, useContext} from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
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
  } from './styles';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Animatable from "react-native-animatable";
import { StackParamsList } from "../../routes/app.routes";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  
    const { signIn, loadingAuth } = useContext(AuthContext);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    async function handleLogin() {
      if (email === "" || password === "") return;
  
      await signIn({ email, password });
    }
  
    // function handleRegisterUser() {
  
    //     navigation.navigate('SignUp');
        
    // }
  
    return (
      <Container>
        <Logo source={require("../../assets/logo.png")} />
  
        <Animatable.View
          animation="fadeInUp"
          delay={500}
          style={styles.inputContainer}
        >
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
  
          <Button onPress={handleLogin}>
            {loadingAuth ? (
              <ActivityIndicator size={25} color="#fff" />
            ) : (
              <ButtonText>Acessar</ButtonText>
            )}
          </Button>
  
          {/* <ButtonRegister onPress={handleRegisterUser}>
            <RegisterText>Não possui uma conta? Cadastre-se</RegisterText>
          </ButtonRegister> */}
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