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