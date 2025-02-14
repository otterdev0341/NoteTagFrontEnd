import { useState } from "react";
import "./newnote.css";
import Modal from "./modals/Modal";
import { ICreateNoteDto } from "../../domain/NoteDto";
import { getColorPalatte } from "../../utility/colorPalatte";
import ColorPalatte from "./ColorPalatte";
import { RiPushpinFill, RiUnpinFill } from "react-icons/ri";

import { Tooltip } from "react-tooltip";
import { getUserTags } from "../../utility/getUserTags";
import EachTag from "./EachTag";
import { FaCirclePlus } from "react-icons/fa6";
import { isAlphanumeric } from "../../utility/validateData";



export default function NewNote() {
    
    

    // new note to persist to api area
    const [newNote, setNewNote] = useState<ICreateNoteDto>({
        title:"",
        content:"",
        color:"",
        status:"",
        noteTags:[]
     });
 
     
    function setNoteContentnt(content: string) {
        setNewNote({
            ...newNote,
            content: content
        });
    }
    function setNoteTitle(title: string) {
        setNewNote({
            ...newNote,
            title: title
        });
    }
    // modal handle area
    const [isOpen, setIsOpen] = useState(false);
    function onClose() {
        setIsOpen(false);
        // call new note api here
    }
    function onOpen() {
        setIsOpen(true);
    }
    // handle color palate list
    const color_palatte: string[]= getColorPalatte();
    
    function selectedColor(color: string) {
        setNewNote({
            ...newNote,
            color: color
        });
    }
    // handle note status
    
    function setNoteStatusToggle(){
        // default is "" is equal to unpin
        if(newNote.status === ""){
            setNewNote({
                ...newNote,
                status: "pin"
            });
        }else if(newNote.status === "pin"){
            setNewNote({
                ...newNote,
                status: "unpin"
            });
        } else {
            setNewNote({
                ...newNote,
                status: "pin"
            });
        }
    }
    // handle user tag to check is it already exist or not
    const allTags = getUserTags();
    const [appendTag, setAppendTag] = useState<string[]>([]);
    
    function appendTagHandler(tag: string) {
        if(appendTag.includes(tag)){
            return;
        }
        setAppendTag([...appendTag, tag]);
    }
    function removeTagHandler(tag: string) {
        setAppendTag(appendTag.filter(t => t !== tag));
    }

    const [filterTag, setFilterTag] = useState<string[]>([]);
    const [filterTagKeyword, setFilterTagKeyword] = useState<string>("");
    
    // new-tag funtion
    // rule filterTag must be empty and must not contain in allTags
    // new length > 1
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
    // useEffect(() => {
    //     setNewNote({
    //         ...newNote,
    //         noteTags: appendTag
    //     });
    // }, [appendTag]);

    // useEffect(() => {
    //     const filteredTag = allTags.filter(tag => tag.includes(filterTagKeyword));
    //     setFilterTag(filteredTag);
        
        
    // }, [filterTagKeyword]);


    // >>>> DISPLAY UI <<<<
    return (
        <>
        <div className="new-note">
            <form action="" onFocus={onOpen}>
                <div className="new-note-title">
                    <input type="text" placeholder="add note" autoComplete="off"   />
                </div>
               
            </form>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} setBackgroundColor={newNote.color}>
            <div className="new-note-container">
                <div className="pin-color-area">
                    <div className="display-frame">
                        
                    </div>
                    <div className="display-pin-toggle">
                        <a className="pin-icon" onClick={setNoteStatusToggle}>
                            {
                                (newNote.status === "pin" 
                                ? <RiUnpinFill data-tooltip-id="my-tooltip" data-tooltip-content="click to unpin note" />
                                : <RiPushpinFill data-tooltip-id="my-tooltip" data-tooltip-content="click to pin note" />
                                )
                            }
                        </a>
                        <Tooltip id="my-tooltip" />
                    </div>
                    
                    <div className="display-color-palatte">
                        {color_palatte.map((color, index) => (
                            
                            <ColorPalatte key={color} color={color} appendColor={selectedColor} isSelected={newNote.color === color} />
                        ))}
                    </div>
                </div>
                <div className="note-area">
                    <form action="" id="new-note-form">
                        <div className="form-group">
                            <label htmlFor="note-title">Title</label>
                            <input id="note-title" type="text" autoComplete="off" onInput={(e) => setNoteTitle(e.currentTarget.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note-content">Content</label>
                            <textarea name="" id="note-content" cols={30} rows={25} maxLength={255} onInput={(e) => setNoteContentnt(e.currentTarget.value)}></textarea>
                        </div>
                    </form>
                </div>
                <div className="tag-area">
                    <div className="appended-tag">
                        {
                            appendTag.map((tag, index) => (
                                <a key={index}  data-tooltip-id="my-tooltip" data-tooltip-content="click to remove tag">
                                    <EachTag tag={tag} onClick={() => removeTagHandler(tag)} />
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
                                    <a key={index}  data-tooltip-id="my-tooltip" data-tooltip-content="click to append tag">
                                        <EachTag key={index} tag={tag} onClick={() => appendTagHandler(tag)} />
                                    </a>
                                ))
                            ) : (
                                allTags.map((tag, index) => (
                                    <a key={index} data-tooltip-id="my-tooltip" data-tooltip-content="click to append tag">
                                        <EachTag key={index} tag={tag} onClick={() => appendTagHandler(tag)} />
                                    </a>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </Modal>
        {/* <EditNoteModal /> */}
        </>
  )
}