import { useEffect, useState } from "react";
import SearchBar from "../elements/SearchBar";
import "./search.css";
import { IQueryDto } from "../../domain/QueryDto";
import EachTag from "../elements/EachTag";
import { MdRemoveCircle } from "react-icons/md";
import Note from "../elements/Note";
import EditNoteModal from "../elements/modals/EditNoteModal";
import { INoteListDto, IResNoteEntryDto } from "../../domain/NoteDto";
import { injectUserToken } from "../../utility/inject_cookies";
import { fetchNotes } from "../../hooks/note";
import { IUserTagListDto } from "../../domain/UserTagDto";
import { fetchUserTag } from "../../hooks/user_tag";



export default function Search() {
    
    const user_token = injectUserToken();
    // load all note of the user
    const [notes, setNotes] = useState<INoteListDto>({
        total: 0,
        notes: [],
    });
    
    const [loadNoteTrigger, setLoadNoteTrigger] = useState(0);
    if (!user_token) {
        throw new Error("Token not found");
    }
    useEffect(() => {
            fetchNotes(user_token, setNotes, notes);
            setLoadNoteTrigger(0);
    }, [user_token,loadNoteTrigger]);

    // fetch all tag from user
    const [userTag, setUserTag] = useState<IUserTagListDto>({
        totalTag : 0,
        tagList: []
    });
    useEffect(() => {
        fetchUserTag(user_token, setUserTag);
    },[user_token]);

    // initial citeria
    const [queryCiteria, setQueryCiteria] = useState<IQueryDto>({
        title: "",
        detail: "",
        noteTags: []
    });
    function setQueryCiteriaField<T extends keyof IQueryDto>(field: T, value: IQueryDto[T]) {
        setQueryCiteria(prevNote => ({
                ...prevNote,
                [field]: value
            }));
        }
    const [queryTag, setQueryTag] = useState<string[]>([]);
    function appendQueryTag(tag: string){
        if(queryTag.includes(tag)) return;
        setQueryTag([...queryTag, tag]);
        setQueryCiteria({
            ...queryCiteria,
            noteTags: [...(queryCiteria.noteTags || []), tag]
        });
        
    }
    function removeQueryTag(tag: string){
        setQueryTag(queryTag.filter((query) => query !== tag));
        setQueryCiteria({
            ...queryCiteria,
            noteTags: queryCiteria.noteTags?.filter((query) => query !== tag)
        });
        
    }
    // apply on citeria
    useEffect(() => {
        setQueryCiteriaField("noteTags", queryTag);
    }, [queryTag]);
    
    
    // Modal handle
    const [isModalOpen, setIsModalOpen] = useState(false);
    function handleCloseModal(){
        setIsModalOpen(false);
        setSelectedNote({} as IResNoteEntryDto);
    };
    
       
    // handle update process
    const [selectedNote, setSelectedNote] = useState<IResNoteEntryDto>();
    
        
       
       
       
       
   
    
   

   
       return (
           <>
           <SearchBar onSearch={setQueryCiteriaField}/>
           <div className="tags-container">
               <aside className="display-user-tags">
                   <ul className="tag-list">
                   {
                        userTag.tagList
                            .slice() // Create a shallow copy to avoid mutating the original array
                            .sort((a, b) => a.localeCompare(b)) // Sort alphabetically
                            .map((tag, index) => (
                                <li className="each-tag" key={index}>
                                    <EachTag tag={tag} onClick={() => appendQueryTag(tag)} />
                                </li>
                            ))
                    } 
                   </ul>
               </aside>
               <div className="display-note-tags">
                   <div className="tag-selected-area">
                      {
                       queryTag.map((tag, index) => (
                               <div key={index} className="each-tag-selected" onClick={() => removeQueryTag(tag)}>
                                   {tag}
                                   <a className="remove-button"><MdRemoveCircle  /></a>
                               </div>
                       ))
                      }
                   </div>
                   <div className="all-note">
                       {
                            // query citeria
                            notes.notes
                            .filter(note => {
                                // Check for matching title
                                const titleMatch = note.title.toLowerCase().includes(queryCiteria.title?.toLowerCase() || "");
                                
                                // Check for matching content
                                const contentMatch = note.content.toLowerCase().includes(queryCiteria.title?.toLowerCase() || "");
                                
                                // do it if tag != null
                                const tagsMatch = queryCiteria.noteTags && queryCiteria.noteTags.length > 0 
                                    ? queryCiteria.noteTags.every(tag => note.noteTags.includes(tag)) 
                                    : true;

                                return (titleMatch || contentMatch) && tagsMatch;
                            })
                            .map((note) => (
                                <Note noteData={note} handleLoadTrigger={() => setLoadNoteTrigger(prev => prev + 1)}    /> // Pass the `noteData` prop here
                            ))
                       }
                   </div>
                       
               </div>
           </div>
           {
                           isModalOpen && (
                               <EditNoteModal isOpen={isModalOpen} noteData={selectedNote} onClose={handleCloseModal}  />
                           )
                       }
           </>
       );
}