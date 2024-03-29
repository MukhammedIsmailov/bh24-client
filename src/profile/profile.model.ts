export interface IProfile {
    id?: number;
    firstName: string;
    secondName: string;
    iconUrl: string;
    referId: string;
    phoneNumber: string;
    email: string;
    password: string;
    questionWhoAreYou: string;
    questionWhy: string;
    questionValue: string;
    questionStaff: string;
    questionResults: string;
    login: string;
    facebook?: string;
    telegram?: string;
    skype?: string;
    viber?: string;
    vk?: string;
    whatsapp?: string;
    subscription_end?: string;
    subscription_name?: string;
}
