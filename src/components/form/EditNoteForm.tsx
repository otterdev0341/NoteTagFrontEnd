import { RiPushpinFill, RiUnpinFill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import ColorPalatte from "../elements/ColorPalatte";
import { getColorPalatte } from "../../utility/colorPalatte";
import { IResNoteEntryDto } from "../../domain/NoteDto";
import { useState } from "react";
import EachTag from "../elements/EachTag";
import { FaCirclePlus } from "react-icons/fa6";
import { getUserTags } from "../../utility/getUserTags";
import { isAlphanumeric } from "../../utility/validateData";

interface IEdnitNoteProps{
    noteData: IResNoteEntryDto;
    
}

export default function EditNoteForm({ noteData}: IEdnitNoteProps) {
    const { id, title, content, colorCode, status, tag, createdAt } = noteData;
    const initialNoteValue: IResNoteEntryDto = {
        id: id,
        createdAt: createdAt,
        title: title,
        content: content,
        status: status,
        colorCode: colorCode,
        tag: tag
    };
    const [note, setNote] = useState<IResNoteEntryDto>(initialNoteValue);
    
    // load color 
    const color_palatte = getColorPalatte();

    function setNoteStatusToggle(){
        note.status === "unpin" || note.status === "" ? note.status = "pin" : note.status = "unpin";
    }

    function onNoteValueChange(event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>){
        const {name, value} = event.target as HTMLInputElement | HTMLTextAreaElement;
        setNote((prevNote) => {
            return {
                ...note,
                [name]: value
            }
        });
    };

    function selectedColor(color: string){
        setNote((prevNote) => {
            return {
                ...note,
                color: color
            }
        });
    }

    function removeTagHandler(thisTag: string){
        const updatedTags = note.tag.filter((tag) => tag !== thisTag);
        setNote((prevNote) => {
            return {
                ...note,
                noteTags: updatedTags
            }
        });

    }

    // load all user tag
    const allTags = getUserTags();
    const [filterTag, setFilterTag] = useState<string[]>([]);
    const [filterTagKeyword, setFilterTagKeyword] = useState<string>("");
    const [appendTag, setAppendTag] = useState<string[]>([]);
    
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
        if(appendTag.includes(tag)){
            return;
        }
        setAppendTag([...appendTag, tag]);
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
                                (note.status === "pin" 
                                ? <RiUnpinFill data-tooltip-id="my-tooltip" data-tooltip-content="click to unpin note" />
                                : <RiPushpinFill data-tooltip-id="my-tooltip" data-tooltip-content="click to pin note" />
                                )
                            }
                        </a>
                        <Tooltip id="my-tooltip" />
                    </div>
                    
                    <div className="display-color-palatte">
                        {color_palatte.map((color, index) => (
                            
                            <ColorPalatte key={index} color={color} appendColor={selectedColor} isSelected={note.colorCode === color} />
                        ))}
                    </div>
                </div>
                <div className="note-area">
                    <form action="" id="new-note-form">
                        <div className="form-group">
                            <label htmlFor="note-title">Title</label>
                            <input value={note.title} id="note-title" type="text" autoComplete="off" onInput={onNoteValueChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note-content">Content</label>
                            <textarea value={note.content} name="" id="note-content" cols={30} rows={25} maxLength={255} onChange={onNoteValueChange}></textarea>
                        </div>
                    </form>
                </div>
                <div className="tag-area">
                    <div className="appended-tag">
                        {
                            note.tag.map((tag, index) => (
                                <a data-tooltip-id="my-tooltip" data-tooltip-content="click to remove tag">
                                    <EachTag key={index} tag={tag} onClick={() => removeTagHandler(tag)} />
                                </a>
                            ))
                        }
                    </div>
                    {/* <Tooltip id="my-tooltip" /> */}
                    <div className="new-note-tag-container">
                        <div className="filter-tag">
                            <input value={filterTagKeyword} type="text" id="filter-tag" placeholder="search tag" onInput={(e) => setFilterTagKeyword(e.currentTarget.value)} />
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