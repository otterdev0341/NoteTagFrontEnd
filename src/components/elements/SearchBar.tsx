import { IQueryDto } from "../../domain/QueryDto";
import "./searchbar.css";

interface SearchBarProps {
    onSearch: <T extends keyof IQueryDto>(field: T, value: IQueryDto[T]) => void;
}

export default function SearchBar({onSearch}: SearchBarProps) {


    return (
        <div className="search-container">
            <form action="">
                <div className="search-note-title">
                    <input onInput={(event) => onSearch("title",(event.target as HTMLInputElement).value)} type="text" placeholder="Search Content" autoComplete="off" />
                </div>
               
            </form>
            

        </div>
    )
}