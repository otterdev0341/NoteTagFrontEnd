import { INoteListDto, IQueryNoteDto, IResNoteEntryDto } from "../domain/NoteDto";
import { Result, ResultUtils } from "../types/Result";

export class QueryService{
    
    private user_token: string;
    private base_url: string;
    private feature_url: string;
    
    constructor(token: string) {
        this.user_token = token;
        this.base_url = import.meta.env.VITE_API_BASE_URL;
        this.feature_url = import.meta.env.VITE_FEATURE_QUERY;
    }

    async query_notes(query: IQueryNoteDto)
        : Promise<Result<INoteListDto, string>>
    {
        try{
            const response = await fetch(`${this.base_url}/${this.feature_url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.user_token}`
                },
                body: JSON.stringify(query)
            });
            if(!response.ok){
                return ResultUtils.Err<INoteListDto, string>("Failed to fetch the notes query");
            }
            const data = await response.json();
            const result: INoteListDto = {
                totalNote: data.totalNote as number,
                noteLists: data.noteLists as IResNoteEntryDto[]
            };
            return ResultUtils.Ok(result);
        } catch (error){
            console.error(error);
            return ResultUtils.Err<INoteListDto, string>("An error occurred while fetching the notes query");
        }
    }
}