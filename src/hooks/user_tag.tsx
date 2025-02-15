import { IUserTagListDto } from "../domain/UserTagDto";
import { UserTagService } from "../services/user_tag";

export async function fetchUserTag(user_token: string, setUserTag: React.Dispatch<React.SetStateAction<IUserTagListDto>>) {
    try {
        const user_tag_service = new UserTagService(user_token);
        const response = await user_tag_service.get_user_tags();
        if (response.ok) {
            const { value } = response;
            const castObject = Object.entries(value);
            setUserTag({
                totalTag: castObject[0][1],
                tagList: castObject[1][1]
            });
        }
    } catch (error) {
        console.error("Error fetching user tags:", error);
    }
}

