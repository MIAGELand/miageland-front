export function getChartLabelsMonthAndYear(minDate, maxDate) {
    let labels = [];
    let currentDate = new Date(minDate);
    maxDate = new Date(maxDate);
    maxDate.setMonth(maxDate.getMonth() + 1);
    while (currentDate < maxDate) {
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(2);
        labels.push(`${month}/${year}`);
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return labels;
}

export function getAllDays(minDate, maxDate) {
    let labels = [];
    let currentDate = new Date(minDate);
    maxDate = new Date(maxDate);
    maxDate.setDate(maxDate.getDate() + 1);
    while (currentDate < maxDate) {
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(2);
        labels.push(`${day}/${month}/${year}`);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return labels;
}

export function createDateFromMMYY(date) {
    const [month, year] = date.split('/');
    const formattedYear = `20${year}`;
    const formattedMonth = month.padStart(2, '0');
    return new Date(Number(formattedYear), formattedMonth - 1);
}

