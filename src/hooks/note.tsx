import { INoteListDto, IReqCreateNoteDto, IResNoteEntryDto } from "../domain/NoteDto";
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

