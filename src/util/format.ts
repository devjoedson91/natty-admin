import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export const {format: formatPrice} = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

export const dateFormat = (date: string) => {

    const getDate = new Date(date);

    return new Intl.DateTimeFormat('pt-BR').format(getDate);
}

const currentDate = (date: Date) => {

    const currentDay = date.getDate().toString().length === 1 ? date.getDate().toString().padStart(2, '0') : date.getDate();

    const currentMonth = date.getMonth().toString().length === 1 ? (date.getMonth()+1).toString().padStart(2, '0') : date.getMonth();

    return `${date.getFullYear()}-${currentMonth}-${currentDay}`;

}

export { currentDate };