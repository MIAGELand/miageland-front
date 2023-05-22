import { Ref } from "vue";

export function aggregateDataByMonthAndYear(
  labels: Ref,
  items: any[],
  callback: (item: any) => number
): number[] {
  const aggregatedData = [];
  for (let i = 0; i < labels.value.length; i++) {
    aggregatedData.push(0);
  }
  items.forEach((item: any) => {
    const itemDate = new Date(item.date);
    const month = itemDate.getMonth() + 1;
    const itemMonth = month < 10 ? `0${month}` : month;
    const itemYear = itemDate.getFullYear().toString().substring(2);
    const itemIndex = labels.value.findIndex(
      (label: string) => label === `${itemMonth}/${itemYear}`
    );
    aggregatedData[itemIndex] += callback(item);
  });
  return aggregatedData;
}

export function aggregateData(
  labels: Ref,
  items: any[],
  groupBy: "day" | "month" | "year",
  callback: (item: any) => number
): number[] {
  const aggregatedData = [];
  for (let i = 0; i < labels.value.length; i++) {
    aggregatedData.push(0);
  }
  items.forEach((item: any) => {
    const itemDate = new Date(item.date);
    let itemFilter: number | string = "";
    // Add month and year to itemFilter
    if (groupBy !== "day") {
      const itemYear = itemDate.getFullYear().toString().substring(2);
      itemFilter = `${itemFilter}/${itemYear}`;
    } else {
      const day = itemDate.getDate();
      const itemDay = day < 10 ? `0${day}` : day;
      const month = itemDate.getMonth() + 1;
      const itemMonth = month < 10 ? `0${month}` : month;
      const itemYear = itemDate.getFullYear().toString().substring(2);
      itemFilter = `${itemDay}/${itemMonth}/${itemYear}`;
    }
    const itemIndex = labels.value.findIndex(
      (label: string) => label === itemFilter
    );
    aggregatedData[itemIndex] += callback(item);
  });
  return aggregatedData;
}
