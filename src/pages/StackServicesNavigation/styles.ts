import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: space-around;
    background: ${({theme}) => theme.colors.white};
`;

export const DataContainer = styled.View`
    padding: 0 20px;
    min-height: 270px;
    justify-content: space-between;
`;

export const ButtonDeleteService = styled.TouchableOpacity`
    margin: 0 auto;
`;

const BaseTextDescriptions = styled.Text`

    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 16px;
    line-height: 19px;
    color: ${({theme}) => theme.colors.text};
`;

export const Description = styled(BaseTextDescriptions)``;
export const Category = styled(BaseTextDescriptions)``;
export const Price = styled(BaseTextDescriptions)``;

export const CategorySelectedText = styled.Text`
    font-size: 16px;
`;

export const InputCategory = styled.TouchableOpacity`
    border-radius: 4px;
    width: 100%;
    height: 40px;
    margin-bottom: 12px;
    justify-content: center;
    border-bottom-width: 1px;
    border-color:  ${({theme}) => theme.colors.grayLight};
`;

export const Input = styled.TextInput`
    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.colors.grayLight};
    height: 40px;
    margin-bottom: 12px;
    font-size: 16px;
`;