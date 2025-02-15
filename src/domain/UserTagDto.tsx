export interface IUserTagDto{
    tag_name: string;
}

export interface IUpdateUserTagDto {
    oldTagName: string;
    newTagName: string;
}

export interface IUserTagListDto{
    totalTag: number;
    tagList: Array<string>;
}