import { RiPushpinFill, RiUnpinFill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import ColorPalatte from "../elements/ColorPalatte";
import { getColorPalatte } from "../../utility/colorPalatte";

import {  useContext, useState } from "react";
import EachTag from "../elements/EachTag";
import { FaCirclePlus } from "react-icons/fa6";
import { getUserTags } from "../../utility/getUserTags";
import { isAlphanumeric } from "../../utility/validateData";
import { EditNoteContext } from "../../context/EditNoteContext";


export default function EditNoteForm() {
    
    const {
        editNote, 
        updateNoteColor, 
        updateNoteContent, 
        updateNoteStatus, 
        updateNoteTags, 
        updateNoteTitle } = useContext(EditNoteContext);
   
    
    
    // load color 
    const color_palatte = getColorPalatte();

    function setNoteStatusToggle(){
        updateNoteStatus();
    }
    function selectedColor(color: string){
        updateNoteColor(color);
    }
    function removeTagHandler(thisTag: string){
        const updateTag = (editNote.noteTags ?? []).filter(tag => tag !== thisTag);
        updateNoteTags(updateTag);

    }
    // load all user tag
    const allTags = getUserTags();
    const [filterTag, setFilterTag] = useState<string[]>([]);
    const [filterTagKeyword, setFilterTagKeyword] = useState<string>("");
    
    
     function createNewTag(tag: string){
            if(filterTag.length > 0){
                return;
            }
            if(allTags.includes(tag)){
                return;
            }
            if(tag.length < 1){
                return;
            }
            if(!isAlphanumeric(tag)){
                setFilterTagKeyword("");
                return;
                
            }
            appendTagHandler(tag);
            setFilterTagKeyword("");
            
        }
    
    function appendTagHandler(tag: string) {
        if((editNote.noteTags ?? []).includes(tag)){
            return;
        }
        updateNoteTags([...editNote.noteTags ?? [], tag]);
    }

    function filterTagHandler(event: React.ChangeEvent<HTMLInputElement>){
        const keyword = event.target.value;
        setFilterTagKeyword(keyword);
        if(keyword.length < 1){
            setFilterTag([]);
            return;
        }
        const filterTag = allTags.filter(tag => tag.includes(keyword));
        setFilterTag(filterTag);
    }

    return(
        <>
        <div className="new-note-container">
                <div className="pin-color-area">
                    <div className="display-frame">
                        
                    </div>
                    <div className="display-pin-toggle">
                        <a className="pin-icon" onClick={setNoteStatusToggle}>
                            {
                                (editNote.status === "pin" 
                                ? <RiUnpinFill data-tooltip-id="my-tooltip" data-tooltip-content="click to unpin note" />
                                : <RiPushpinFill data-tooltip-id="my-tooltip" data-tooltip-content="click to pin note" />
                                )
                            }
                        </a>
                        <Tooltip id="my-tooltip" />
                    </div>
                    
                    <div className="display-color-palatte">
                        {color_palatte.map((color, index) => (
                            
                            <ColorPalatte key={index} color={color} appendColor={selectedColor} isSelected={editNote.color === color} />
                        ))}
                    </div>
                </div>
                <div className="note-area">
                    <form action="" id="new-note-form">
                        <div className="form-group">
                            <label htmlFor="note-title">Title</label>
                            <input value={editNote.title} id="note-title" type="text" autoComplete="off" onInput={(event) => updateNoteTitle((event.target as HTMLInputElement).value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note-content">Content</label>
                            <textarea value={editNote.content} name="" id="note-content" cols={30} rows={25} maxLength={255} onChange={(event) => updateNoteContent((event.target as HTMLTextAreaElement).value)}></textarea>
                        </div>
                    </form>
                </div>
                <div className="tag-area">
                    <div className="appended-tag">
                        {
                            editNote && (editNote.noteTags ?? []).map((tag, index) => (
                                <a data-tooltip-id="my-tooltip" data-tooltip-content="click to remove tag">
                                    <EachTag key={index} tag={tag} onClick={() => removeTagHandler(tag)} />
                                </a>
                            ))
                        }
                    </div>
                    {/* <Tooltip id="my-tooltip" /> */}
                    <div className="new-note-tag-container">
                        <div className="filter-tag">
                            <input value={filterTagKeyword} type="text" id="filter-tag" placeholder="search tag" onInput={(e) => setFilterTagKeyword(e.currentTarget.value)} onChange={filterTagHandler} />
                        </div>
                        <div className="apply-new-tag">
                            <a id="new-tag" onClick={() => createNewTag(filterTagKeyword)}>
                                <FaCirclePlus id="new-tag-icon" />
                                <span>create</span>
                            </a>
                        </div>
                        
                    </div>
                    <div className="display-user-tag">
                        {
                            filterTag.length > 0 || filterTagKeyword.length > 0 ? (
                                filterTag.map((tag, index) => (
                                    <a data-tooltip-id="my-tooltip" data-tooltip-content="click to append tag">
                                        <EachTag key={index} tag={tag} onClick={() => appendTagHandler(tag)} />
                                    </a>
                                ))
                            ) : (
                                allTags.map((tag, index) => (
                                    <a data-tooltip-id="my-tooltip" data-tooltip-content="click to append tag">
                                        <EachTag key={index} tag={tag} onClick={() => appendTagHandler(tag)} />
                                    </a>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}