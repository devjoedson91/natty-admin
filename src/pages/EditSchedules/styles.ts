import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    background: ${({theme}) => theme.colors.white};
    
`;

export const ScheduleContainer = styled.View`
    flex: 1;
    padding: 15px;
`;

export const BaseText = styled.Text`
    text-align: center;
    text-transform: uppercase;
    font-family: ${({theme}) => theme.fonts.medium};
`;

export const LabelInput = styled(BaseText)`
    color: ${({theme}) => theme.colors.text};
    font-size: 14px;
    margin-bottom: 20px;
`;

export const HourDescription = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text};
`;

export const RemoveButton = styled.TouchableOpacity``;

export const InputSchedule = styled.TextInput`
    width: 120px;
    height: 50px;
    text-align: center;
    background: #fff;
    color: #525865;
    border-radius: 4px;
    border: 1px solid #d1d1d1;
    margin-bottom: 20px;
    /* box-shadow: inset 1px 2px 8px rgba(0, 0, 0, 0.07); */
    font-size: 18px;
    font-family: ${({theme}) => theme.fonts.medium};
    /* font-size: 8px; */
    /* line-height: 1.45; */
    outline: none;
    /* padding: 0.6em 1.45em 0.7em; */
`;

export const ListContainer = styled.View`
    width: 100%;
    /* height: 120px; */
    padding: 5px 0;
    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.colors.grayLight};
    flex-direction: row;
    justify-content: space-between;
`;

export const FormContainer = styled.View`
    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 20px;
`;

export const AddScheduleButton = styled.TouchableOpacity`
    width: 100px;
    height: 50px;
    border-radius: 4px;
    background-color: ${({theme}) => theme.colors.blue400};
    justify-content: center;
`;

export const TextButton = styled(BaseText)`
    color: ${({theme}) => theme.colors.white};
    font-size: 16px;
`;


