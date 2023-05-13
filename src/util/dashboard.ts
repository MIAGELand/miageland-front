import {Ref} from "vue";

export function aggregateDataByMonthAndYear(labels: Ref, items: any[], callback: (item: any) => number): number[] {
    const aggregatedData = [];
    for (let i = 0; i < labels.value.length; i++) {
        aggregatedData.push(0);
    }
    items.forEach((item: any) => {
        const itemDate = new Date(item.date);
        const month = itemDate.getMonth() + 1;
        const itemMonth = month < 10 ? `0${month}` : month;
        const itemYear = itemDate.getFullYear().toString().substring(2);
        const itemIndex = labels.value.findIndex((label: string) => label === `${itemMonth}/${itemYear}`);
        aggregatedData[itemIndex] += callback(item);
    });
    return aggregatedData;
}