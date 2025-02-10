import "./searchbar.css";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar(props: SearchBarProps) {

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
        props.onSearch(e.target.value);
    }

    return (
        <div className="search-container">
            <form action="">
                <div className="search-note-title">
                    <input onInput={handleSearch} type="text" placeholder="Search Content" autoComplete="off" />
                </div>
               
            </form>
            

        </div>
    )
}