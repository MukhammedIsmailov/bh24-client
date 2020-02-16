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
    id: number;
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
    username: string;
    mobiPartnerInfoActive?: boolean;
    active: boolean;
}

export interface IWardOptions {
    facebookFilter: boolean;
    telegramFilter: boolean;
    lessonFilter: string;
    startDateFilter: string;
    endDateFilter: string;
    clientFilter: boolean;
    partnerFilter: boolean;
    renouncementFilter: boolean;
    contactFilter: boolean;
    contactsSeeFilter: boolean;
    searchFilter: string;
    feedbackFilter: boolean;
}

export interface ILesson {
    lessonNumber: number;
    readingDate: Date;
}

export interface ILessonInfo {
    firstName: string;
    secondName: string;
    iconUrl?: string;
    lessons: ILesson[];
}

export enum Status {
    renouncement = 'renouncement',
    contact = 'contact',
    client = 'client',
    partner = 'partner',
}