import { IUserTagDto } from "../domain/UserTagDto";
import { Result, ResultUtils } from "../types/Result";

export class UserTagService{
    
    private user_token: string;
    private base_url: string;
    private feature_url: string;
    
    constructor(token: string) {
        this.user_token = token;
        this.base_url = import.meta.env.VITE_API_BASE_URL;
        this.feature_url = import.meta.env.VITE_FEATURE_USER_TAG;
    }

    async add_user_tag(tag: IUserTagDto)
        : Promise<Result<null, string>> 
    {
        try {
            const response = await fetch(`${this.base_url}${this.feature_url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.user_token}`
                },
                body: JSON.stringify(tag)
            });
            if (!response.ok) {
                return ResultUtils.Err("Failed to add the tag");
            }
            return ResultUtils.Ok(null);
        }catch (error) {
            console.error(error);
            return ResultUtils.Err("An error occurred while adding the tag");
        }
    }

    async get_user_tags(): Promise<Result<IUserTagDto, string>>
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
                return ResultUtils.Err("Failed to fetch the tags");
            }
            const data: IUserTagDto = await response.json();
            return ResultUtils.Ok(data);
        } catch (error) {
            console.error(error);
            return ResultUtils.Err("An error occurred while fetching the tags");
        }
    }

    async update_user_tag(tag: IUserTagDto)
        : Promise<Result<null, string>>
    {
        try {
            const response = await fetch(`${this.base_url}${this.feature_url}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.user_token}`
                },
                body: JSON.stringify(tag)
            });
            if (!response.ok) {
                return ResultUtils.Err("Failed to update the tag");
            }
            return ResultUtils.Ok(null);
        } catch (error) {
            console.error(error);
            return ResultUtils.Err("An error occurred while updating the tag");
        }
    }

    async delete_tag_from_user(tag: IUserTagDto) 
        : Promise<Result<null, string>>
    {
        try {
            const response = await fetch(`${this.base_url}${this.feature_url}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.user_token}`
                },
                body: JSON.stringify(tag)
            });
            if (!response.ok) {
                return ResultUtils.Err("Failed to delete the tag");
            }
            return ResultUtils.Ok(null);
        } catch (error) {
            console.error(error);
            return ResultUtils.Err("An error occurred while deleting the tag");
        }
    }
}