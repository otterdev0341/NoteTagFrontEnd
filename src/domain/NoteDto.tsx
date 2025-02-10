export interface Note{
    id: String;
    title: String;
    content: String;
    colorCode: String;
    status:  String;
    tags: String[];
    createdAt: Date;
}
export interface NoteList{
    totalNote: number;
    noteLists: Note[];
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
    note_id: string;
    title?: string;
    detail?: string;
    color?: string;
    status?: string;
    noteTags?: string[];

}