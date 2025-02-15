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
    total: number;
    notes: Array<IResNoteEntryDto>;
}


export interface IResNoteEntryDto{
    id: number;
    title: string;
    content:string;
    colorCode: string;
    status: "pin" | "unpin";
    noteTags: string[];
    createdAt: string;
    updatedAt: string;
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
export interface IReqCreateNoteDto{
    title?: string;
    content?: string;
    color?: string;
    status?: string;
    noteTags?: string[];
}