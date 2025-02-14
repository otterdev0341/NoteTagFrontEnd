import { ICreateNoteDto, INoteListDto, IReqUpdateNoteDto, IResNoteEntryDto } from "../../domain/NoteDto";

export enum NoteOperationStatus{
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export interface INoteContext {
    notes: INoteListDto[];
    performCreateNote: (note: ICreateNoteDto) => NoteOperationStatus;
    performUpdateNote: (id: string) => NoteOperationStatus;
    performDeleteNote: (note: IReqUpdateNoteDto) => NoteOperationStatus;
    performGetNoteById: (id: number) => IResNoteEntryDto;
    performGetAllNotes: () => INoteListDto;
}