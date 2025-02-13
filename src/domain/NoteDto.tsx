export interface Note{
    id: String;
    title: String;
    content: String;
    colorCode: String;
    status:  String;
    tags: String[];
    createdAt: Date;
}
export interface INoteListDto{
    totalNote: number;
    noteLists: IResNoteEntryDto[];
}

export interface ICreateNoteDto{
    title: string;
    content: string;
    color: string;
    status: string;
    noteTags: string[];
}

export interface IResNoteEntryDto{
    id: string;
    title: string;
    content:string;
    colorCode: string;
    status: string;
    tag: string[];
    createdAt: Date;
}

export interface IReqUpdateNoteDto{
    id: string;
    title?: string;
    content?: string;
    color?: string;
    status?: string;
    noteTags?: string[];

}

export const defaultQueryNote: IQueryNoteDto = {
    title: "",
    detail: "",
    noteTags: [],
};

export interface IQueryNoteDto{
    title?: string;
    detail?: string;
    noteTags?: string[];
}