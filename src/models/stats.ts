export interface AttractionStats {
    nbTotal: number
    nbOpened: number
    nbClosed: number
}

export interface EmployeeStats {
    nbTotal: number
    nbAdmin: number
    nbClassic: number
}

export interface NumberStatsTicket {
    nbTotal: number
    nbPaid: number
    nbUsed: number
    nbCancelled: number
}

export interface MonthlyTicketInfos {
    monthYear: string,
    numberStatsTicket: NumberStatsTicket,
    totalAmount: number,
    benefits: number
}

export interface TicketStats {
    numberStatsTicket: NumberStatsTicket
    monthlyTicketInfos: MonthlyTicketInfos[]
}