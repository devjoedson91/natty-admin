import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background: ${({theme}) => theme.colors.white};  
`;

export const ReservationsContainer = styled.View`
    flex: 1;
    padding: 20px 10px;
`;

export const BodyText = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: 18px;
    color: ${({theme}) => theme.colors.blue400};
    text-transform: uppercase;
`;