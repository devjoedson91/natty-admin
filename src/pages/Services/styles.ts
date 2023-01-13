import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.white};
`;

export const ContainerCategory = styled.View`
    width: 100%;
    height: 60px;
    justify-content: center;
    padding-left: 10px;
    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.colors.grayLight};
`;

export const ContainerServices = styled.View`
    width: 100%;
    height: 60px;   
    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.colors.grayLight};
    justify-content: center;
    padding-left: 40px;
`;

export const ButtonService = styled.TouchableOpacity``;

export const NameService = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: 16px;
    color: ${({theme}) => theme.colors.text};
    line-height: 19px;
`;

export const CategoryName = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: 20px;
    color: ${({theme}) => theme.colors.blue400};
    line-height: 24px;
`;