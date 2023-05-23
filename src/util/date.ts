import {DailyTicketInfos, MonthlyTicketInfos} from "../models/stats";

export function createDateFromYYYYMM(date) {
    const dateArray = date.split("-");
    return new Date(dateArray[0], dateArray[1]);
}

export function createDateFromYYYYMMDD(date) {
    const dateArray = date.split("-");
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
}

export function getTicketNumberByMonthAndYear(monthYear: string, ticketInfos: MonthlyTicketInfos[], filter: string): number {
    const monthYearToCompare = monthYear.split("/").reverse().join("-");
    const ticketInfo = ticketInfos.find((info) => monthYearToCompare === info.monthYear.toString());
    switch (filter) {
        case "nbTotal":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbTotal : 0;
        case "nbReserved":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbReserved : 0;
        case "nbPaid":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbPaid : 0;
        case "nbUsed":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbUsed : 0;
        case "nbCancelled":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbCancelled : 0;
        case "benefits":
            return ticketInfo ? ticketInfo.benefits : 0;
    }
}

export function getTicketNumberByDay(dayMonthYear: string, ticketInfos: DailyTicketInfos[], filter: string): number {
    const dayMonthYearToCompare = dayMonthYear.split("/").reverse().join("-");
    const ticketInfo = ticketInfos.find((info) => dayMonthYearToCompare === info.dayMonthYear.toString());
    switch (filter) {
        case "nbTotal":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbTotal : 0;
        case "nbReserved":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbReserved : 0;
        case "nbPaid":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbPaid : 0;
        case "nbUsed":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbUsed : 0;
        case "nbCancelled":
            return ticketInfo ? ticketInfo.numberStatsTicket.nbCancelled : 0;
        case "benefits":
            return ticketInfo ? ticketInfo.benefits : 0;
    }
}
