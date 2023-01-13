import styled from 'styled-components/native';


export const CategoryName = styled.Text`
    margin: 18px;
    font-size: 14px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text};
`;