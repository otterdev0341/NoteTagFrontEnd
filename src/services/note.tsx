import { IResNoteEntryDto } from "../domain/NoteDto";

export class NoteService {
    
    private user_token: string;
    private base_url: string;
    private feature_url: string;
    
    constructor(token: string) {
        this.user_token = token;
        this.base_url = import.meta.env.VITE_API_BASE_URL;
        this.feature_url = import.meta.env.VITE_FEATURE_NOTE;
    }

    async get_note_by_id(note_id: number) {
        const response = await fetch(`${this.base_url}${this.feature_url}${note_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.user_token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: IResNoteEntryDto = await response.json();
        return result;
        
    }
}