import styled, {css} from "styled-components/native";

export const Container = styled.View`

    flex: 1;
    background-color: ${({theme}) => theme.colors.white};
    padding: 15px;

`;

export const Logo = styled.Image.attrs({
    resizeMode: 'contain'
})`
   width: 200px;
   height: 70px
`;

export const ContentHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
`;

export const AmountClientView = styled.View`
    width: 156px;
    height: 97px;
    background: ${({theme}) => theme.colors.blue400};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const PredictionView = styled.View`
    width: 200px;
    height: 97px;
    background: ${({theme}) => theme.colors.blue400};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const TextContent = styled.Text`
    color: ${({theme}) => theme.colors.white};
    text-align: center;
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.medium};
`;

export const TotalPrediction = styled.Text`
    color: ${({theme}) => theme.colors.white};
    text-align: center;
    font-size: 26px;
    font-family: ${({theme}) => theme.fonts.medium};
`;

export const BodyText = styled.Text`
    margin-top: 30px;
    color: ${({theme}) => theme.colors.text};
    font-size: 18px;
    font-family: ${({theme}) => theme.fonts.medium};
`;

export const ContainerReservations = styled.View`

    width: 100%;
    /* height: 120px; */
    border-top-width: 1px;
    border-color: ${({theme}) => theme.colors.grayLight};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0;
`;

export const AreaDescription = styled.View`
    
    justify-content: flex-end;
    
`;

export const ServiceName = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text};
    margin-bottom: 5px;
    line-height: 19px;

`;

export const ClientName = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.blue400};
    margin-bottom: 5px;
    line-height: 19px;
`;

export const DescriptionBlock = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Price = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.blue400};
    margin-left: 5px;
`;

export const Hour = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.gray400};
    margin-left: 5px;
`;

export const ButtonText = styled.Text`
    font-size: 14px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.white};
`;

interface ButtonProps {
    isFinalized: boolean;
}

export const ButtonReserve = styled.TouchableOpacity<ButtonProps>`
    width: 147px;
    height: 38px;
    border-radius: 6px;
    background-color: ${({theme}) => theme.colors.blue400};
    justify-content: center;
    align-items: center;
    align-self: center;
    ${(props) => css`opacity: ${props.isFinalized ? 0.7 : 1};`};
`;
