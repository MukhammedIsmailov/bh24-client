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
    courseFinished: string;
    counts: any[];
}

export interface ILatestRegistrationByLeaders {
    firstName: string;
    secondName: string;
    iconUrl: string;
    count: string;
}

export interface IPage {
    id: number;
    isSystem: boolean;
    verboseName: string;
    name: string;
    content: Array<IContent>;
}

export interface IContent {
    id: number;
    body: string;
}
