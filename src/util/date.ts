export function getChartLabels(minDate, maxDate) {
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
