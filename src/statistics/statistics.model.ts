interface IChartData {
    data: number[];
    fill: boolean;
    borderColor: string;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBorderColor: string;
    showLine: boolean;
}

export interface IDataset {
    dataset: IChartData[];
}

interface IPlotData {
    dataset: IDataset;
    labels: string[];
}

export interface IStatisticsData {
    counts: any[];
    total: number;
    courseEfficiency: number;
    paymentEfficiency: number;
    plotData: IPlotData;
}

export interface IWard {
    first_name: string;
    second_name: string;
    icon_url: string;
    country: string;
    note: string;
    status: string;
    from: string;
    step: number;
    created_date: Date;
    phone_number: string;
    last_send_time: Date;
    role: string;
}

export interface IWardOptions {
    messengerFilter?: string;
    lessonFilter?: number;
    statusFilter?: string;
    startDateFilter?: string;
    endDateFilter?: string;
    leadFilter: boolean;
    partnerFilter: boolean;
}