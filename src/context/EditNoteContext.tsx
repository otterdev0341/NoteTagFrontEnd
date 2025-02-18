import React from "react";
import { IReqUpdateNoteDto, IResNoteEntryDto } from "../domain/NoteDto";

export const EditNoteContext = React.createContext({

    setUpdateNote: (_note: IResNoteEntryDto) => {},

    editNote: {} as IReqUpdateNoteDto,

    updateNoteTitle: (_title: string) => {},

    updateNoteContent: (_content: string) => {},

    updateNoteStatus: () => {},

    updateNoteColor: (_color: string) => {},

    updateNoteTags: (_tags: string[]) => {}

});