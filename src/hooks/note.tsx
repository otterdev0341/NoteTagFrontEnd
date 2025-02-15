import { INoteListDto, IResNoteEntryDto } from "../domain/NoteDto";
import { NoteService } from "../services/note";

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
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        }