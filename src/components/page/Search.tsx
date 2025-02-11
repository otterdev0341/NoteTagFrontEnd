import { useEffect, useState } from "react";
import SearchBar from "../elements/SearchBar";
import "./search.css";
import { IQueryDto } from "../../domain/QueryDto";
import EachTag from "../elements/EachTag";
import { MdRemoveCircle } from "react-icons/md";
import { getUserTags } from "../../utility/getUserTags";



export default function Search() {
    
   
       // use this to perform fetch api
       const [queryCiteria, setQueryCiteria] = useState<IQueryDto>({
           title: "",
           detail: "",
           noteTags: []
       });
   
       useEffect(() => {
           console.log(queryCiteria);
       }, [queryCiteria]);
   
       // use this to represent ui,
       const [queryTag, setQueryTag] = useState<string[]>([]);
       // simulation all tag user has
       const userFetchTag: string[] = getUserTags();
   
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
   
       // use this to hanle search bar
       function handleSearch(query: string){
           setQueryCiteria({
               ...queryCiteria,
               title: query
           });
           console.log(queryCiteria);
       }
   
       return (
           <>
           <SearchBar onSearch={handleSearch}/>
           <div className="tags-container">
               <aside className="display-user-tags">
                   <ul className="tag-list">
                       {
                           userFetchTag.map((tag, index) => (
                               <li className="each-tag" key={index}>
                                   <EachTag tag={tag} onClick={() => appendQueryTag(tag)}/>
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
                       <div>Note 1</div>
                       <div>Note 2</div>
                       <div>Note 3</div>
                       <div>Note 4</div>
                       <div>Note 5</div>
                   </div>
                       
               </div>
           </div>
           </>
       );
}