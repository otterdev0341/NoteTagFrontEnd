import { Result, ResultUtils } from "../types/Result";

export class NoteStatusService{
    
    private user_token: string;
    private base_url: string;
    private feature_url: string;
    
    constructor(token: string) {
        this.user_token = token;
        this.base_url = import.meta.env.VITE_API_BASE_URL;
        this.feature_url = import.meta.env.VITE_FEATURE_NOTE_STATUS;
    }

    async toggle_note_status(note_id: number): Promise<Result<null, string>>
    {
        try {
            const response = await fetch(`${this.base_url}${this.feature_url}${note_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.user_token}`
                }
            });

            if (!response.ok) {
                return ResultUtils.Err("Failed to toggle the note status");
            }

            return ResultUtils.Ok(null);
        } catch (error) {
            console.error(error);
            return ResultUtils.Err("An error occurred while toggling the note status");
        }
    }
}