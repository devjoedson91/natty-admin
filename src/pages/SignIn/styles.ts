import styled from 'styled-components/native';

export const Container = styled.View`

    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background};

`;

export const Logo = styled.Image`

    margin-bottom: 18px;

`;

export const Input = styled.TextInput`

    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.colors.grayLight};
    height: 40px;
    margin-bottom: 12px;
    font-size: 16px;

`;

export const Title = styled.Text`
    font-size: 20px;
    margin-top: 28px;
`;

export const Button = styled.TouchableOpacity`

    width: 280px;
    height: 54px;
    background-color: ${({theme}) => theme.colors.primary};
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-top: 28px;
`;

export const Text = styled.Text`

    font-size: 20px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.text};

`;

export const ButtonText = styled.Text`

    font-size: 18px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.white};
`;

export const ButtonRegister = styled.TouchableOpacity`
    margin-top: 14px;
    align-self: center;
`;

export const RegisterText = styled.Text`
    color: ${({theme}) => theme.colors.grayLight};
`;
