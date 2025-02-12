import React from "react";
import { IReqUpdateNoteDto, IResNoteEntryDto } from "../domain/NoteDto";

export const EditNoteContext = React.createContext({

    setUpdateNote: (note: IResNoteEntryDto) => {},

    editNote: {} as IReqUpdateNoteDto,

    updateNoteTitle: (title: string) => {},

    updateNoteContent: (content: string) => {},

    updateNoteStatus: () => {},

    updateNoteColor: (color: string) => {},

    updateNoteTags: (tags: string[]) => {}

});