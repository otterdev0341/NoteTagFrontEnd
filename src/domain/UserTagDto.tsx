export interface IUserTagDto{
    tagName: string;
}

export interface IUpdateUserTagDto {
    oldTagName: string;
    newTagName: string;
}

export interface IUserTagListDto{
    totalTag: number;
    tagList: Array<string>;
}