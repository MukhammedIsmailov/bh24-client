export interface ILatestRegistration {
    registrations: ILatestRegistrationItem[];
    count: string;
}

export interface ILatestRegistrationItem {
    firstName: string;
    secondName: string;
    country: string;
    createdDate: string;
}

export interface IStatistics {
    counts: any[];
}

export interface ILatestRegistrationByLeaders {
    firstName: string;
    secondName: string;
    iconUrl: string;
    count: string;
}