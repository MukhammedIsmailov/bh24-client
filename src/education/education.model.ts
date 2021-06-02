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
