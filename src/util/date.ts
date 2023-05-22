export function createDateFromMMYY(date) {
    const [month, year] = date.split('/');
    const formattedYear = `20${year}`;
    const formattedMonth = month.padStart(2, '0');
    return new Date(Number(formattedYear), formattedMonth - 1);
}
