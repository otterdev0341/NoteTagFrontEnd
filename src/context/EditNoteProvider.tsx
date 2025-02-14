import { useState } from "react";
import { IReqUpdateNoteDto, IResNoteEntryDto } from "../domain/NoteDto";
import { EditNoteContext } from "./EditNoteContext";

export const EditNoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [editNote, setEditNote] = useState<IReqUpdateNoteDto>({
        id: "",
        title: "",
        content: "",
        status: "",
        color: "",
        noteTags: []
    });

    const setUpdateNote = (note: IResNoteEntryDto) => {
        setEditNote((prevNote) => ({
            ...prevNote,
            id: note.id.toString(),
            title: note.title,
            content: note.content,
            status: note.status,
            color: note.colorCode,
            noteTags: note.noteTags
        }));
    };

    const updateNoteTitle = (title: string) => {
        setEditNote((prevNote) => ({
            ...prevNote,
            title: title
        }));
    };

    const updateNoteContent = (content: string) => {
        setEditNote((prevNote) => ({
            ...prevNote,
            content: content
        }));
    };

    const updateNoteStatus = () => {
        const status  = editNote.status === "unpin" || editNote.status === "" ? "pin" : "unpin";
        setEditNote((prevNote) => ({
            ...prevNote,
            status: status
        }));
    };

    const updateNoteColor = (color: string) => {
        setEditNote((prevNote) => ({
            ...prevNote,
            color: color
        }));
    };

    const updateNoteTags = (tags: string[]) => {
        setEditNote((prevNote) => ({
            ...prevNote,
            noteTags: tags
        }));
    };

    return (
        <EditNoteContext.Provider value={{ setUpdateNote, editNote, updateNoteTitle, updateNoteContent, updateNoteStatus, updateNoteColor, updateNoteTags }}>
            {children}
        </EditNoteContext.Provider>
    );
};