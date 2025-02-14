
import { ICreateNoteDto, INoteListDto, IReqUpdateNoteDto, IResNoteEntryDto } from "../domain/NoteDto";
import { Option } from "../types/Option";
import { Result, ResultUtils } from "../types/Result";
export class NoteService{
    
    
    
    private user_token: string;
    private base_url: string;
    private feature_url: string;
    
    constructor(token: string) {
        
        this.user_token = token;
        this.base_url = import.meta.env.VITE_API_BASE_URL;
        this.feature_url = import.meta.env.VITE_FEATURE_NOTE;
    }

    async get_note_by_id(note_id: number)
        : Promise<Result<Option<IResNoteEntryDto>, string>> 
    {
        try {
            const response = await fetch(`${this.base_url}${this.feature_url}${note_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.user_token}`
                }
            });
    
            if (!response.ok) {
                // If the response is not OK, return Err with a meaningful error message
                return ResultUtils.Err<Option<IResNoteEntryDto>, string>("Failed to fetch the note");
            }
    
            const result: IResNoteEntryDto = await response.json();
            return ResultUtils.Ok<Option<IResNoteEntryDto>, string>(Option.Some(result));
        } catch (error) {
            console.error(error);
            // If an error occurs, return Err with the error message
            return ResultUtils.Err<Option<IResNoteEntryDto>, string>("An error occurred while fetching the note");
        }
    };

    async update_note(the_note: IReqUpdateNoteDto)
        : Promise<Result<IResNoteEntryDto, string>> 
    {
        try {
            const response = await fetch(`${this.base_url}${this.feature_url}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.user_token}`
                },
                body: JSON.stringify(the_note)
            });

            if (!response.ok) {
                // If the response is not OK, return Err with a meaningful error message
                return ResultUtils.Err<IResNoteEntryDto, string>("Failed to update the note");
            }

            const result: IResNoteEntryDto = await response.json();
            return ResultUtils.Ok<IResNoteEntryDto, string>(result);
        } catch (error) {
            console.error(error);
            // If an error occurs, return Err with the error message
            return ResultUtils.Err<IResNoteEntryDto, string>("An error occurred while updating the note");
        }
    };

    async create_note(the_note: ICreateNoteDto)
        : Promise<Result<IResNoteEntryDto, string>> 
    {
        try {
            const response = await fetch(`${this.base_url}${this.feature_url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.user_token}`
                },
                body: JSON.stringify(the_note)
            });
            if (!response.ok) {
                // If the response is not OK, return Err with a meaningful error message
                return ResultUtils.Err<IResNoteEntryDto, string>("Failed to create the note");
            }
            const result: IResNoteEntryDto = await response.json();
            return ResultUtils.Ok<IResNoteEntryDto, string>(result);
    }catch (error) {
        console.error(error);
        // If an error occurs, return Err with the error message
        return ResultUtils.Err<IResNoteEntryDto, string>("An error occurred while creating the note");
        }
    }

    async get_all_notes()
        : Promise<Result<INoteListDto, string>> 
    {
        try {
            const response = await fetch(`${this.base_url}${this.feature_url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.user_token}`
                }
                
            });
            if (!response.ok) {
                // If the response is not OK, return Err with a meaningful error message
                return ResultUtils.Err<INoteListDto, string>("Failed to fetch the notes");
            }
            const result: IResNoteEntryDto[] = await response.json();
            // console.log(result);
            return ResultUtils.Ok<INoteListDto, string>({
                total: result.length,
                notes: result
            });
        } catch (error) {
            console.error(error);
            // If an error occurs, return Err with the error message
            return ResultUtils.Err<INoteListDto, string>("An error occurred while fetching the notes");
        }
    };

    async delete_note(note_id: number) 
        : Promise<Result<null, string>> 
    {
        try {
            const response = await fetch(`${this.base_url}${this.feature_url}${note_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.user_token}`
                }
            });
            if (!response.ok) {
                // If the response is not OK, return Err with a meaningful error message
                return ResultUtils.Err<null, string>("Failed to delete the note");
            }
            return ResultUtils.Ok<null, string>(null);
        } catch (error) {
            console.error(error);
            // If an error occurs, return Err with the error message
            return ResultUtils.Err<null, string>("An error occurred while deleting the note");
        }
    };

    
}