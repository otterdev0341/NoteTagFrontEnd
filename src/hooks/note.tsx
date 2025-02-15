import { INoteListDto, IReqCreateNoteDto, IReqUpdateNoteDto, IResNoteEntryDto } from "../domain/NoteDto";
import { NoteService } from "../services/note";
import { Result, ResultUtils } from "../types/Result";

export async function fetchNotes(user_token: string, setNotes: React.Dispatch<React.SetStateAction<INoteListDto>>, notes: INoteListDto) {
            try {
                const note_service = new NoteService(user_token);
                const response = await note_service.get_all_notes();
                
                if (response.ok) {
                    const { value } = response;
                    const castObject = Object.entries(value.notes);
                    setNotes({
                        total: castObject[0][1] as unknown as number,
                        notes: castObject[1][1] as unknown as IResNoteEntryDto[],
                    });
                    return ResultUtils.Err("Failed to create note");
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
}

export async function persistNewNote(user_token: string, newNote: IReqCreateNoteDto): Promise<Result<IResNoteEntryDto, string>> {
    

    try {
        const note_service = new NoteService(user_token);
        const response = await note_service.create_note(newNote);
        if (response.ok) {
            return ResultUtils.Ok(response.value);
        } else {
            return ResultUtils.Err("Failed to create note");
        }
    } catch (error) {
        console.error("Error creating note:", error);
        return ResultUtils.Err("Failed to create note");
    }
}


export async function deleteNote(user_token: string, noteId: number): Promise<Result<string, string>> {
    try {
        const note_service = new NoteService(user_token);
        const response = await note_service.delete_note(noteId);
        if (response.ok) {
            return ResultUtils.Ok("note deleted");
        } else {
            return ResultUtils.Err("Failed to delete note");
        }
    } catch (error) {
        console.error("Error deleting note:", error);
        return ResultUtils.Err("Failed to delete note");
    }
}


export async function updateNote(user_token: string, newNote: IReqUpdateNoteDto): Promise<Result<string, string>> {
    try {
     
        const note_service = new NoteService(user_token);
        const response = await note_service.update_note(newNote);
        if (response.ok) {
            return ResultUtils.Ok("note updated");
        } else {
            return ResultUtils.Err("Failed to update note");
        }
    } catch (error) {
        console.error("Error updating note:", error);
        return ResultUtils.Err("Failed to update note");
    }
}


