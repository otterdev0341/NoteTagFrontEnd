import { useEffect, useState } from "react";
import "./newnote.css";
import Modal from "./modals/Modal";
import { IReqCreateNoteDto } from "../../domain/NoteDto";
import { getColorPalatte } from "../../utility/colorPalatte";
import ColorPalatte from "./ColorPalatte";
import { RiPushpinFill, RiUnpinFill } from "react-icons/ri";

import { Tooltip } from "react-tooltip";
import EachTag from "./EachTag";
import { FaCirclePlus } from "react-icons/fa6";
import { isAlphanumeric, isNewNoteEmpty } from "../../utility/validateData";
import { IUserTagListDto } from "../../domain/UserTagDto";
import { injectUserToken } from "../../utility/inject_cookies";
import { fetchUserTag } from "../../hooks/user_tag";
import { persistNewNote } from "../../hooks/note";
import { useNavigate } from "react-router-dom";




export default function NewNote() {
    
    const use_navigate = useNavigate();

    // STATE DEFEINITION AREA
    const [newNote, setNewNote] = useState<IReqCreateNoteDto>({
        title:"",
        content:"",
        color:"",
        status:"",
        noteTags:[]
     });
    const [userTag, setUserTag] = useState<IUserTagListDto>({
        totalTag : 0,
        tagList: []
    });
    
    const [appendTag, setAppendTag] = useState<string[]>([]);
    const [filterTag, _setFilterTag] = useState<string[]>([]);
    const [filterTagKeyword, setFilterTagKeyword] = useState<string>("");

    // USEE EFFECT DEFINITION AREA && inject hooks funtion
    const user_token = injectUserToken();
    if (!user_token) {
        throw new Error("Token not found");
    }
    useEffect(() => {
        fetchUserTag(user_token, setUserTag);
        setNoteField("noteTags", appendTag);
    },[user_token,appendTag.length]);

    
    // handle new note update data
    function setNoteField<T extends keyof IReqCreateNoteDto>(field: T, value: IReqCreateNoteDto[T]) {
        setNewNote(prevNote => ({
            ...prevNote,
            [field]: value
        }));
    }

    // modal handle area
    const [isOpen, setIsOpen] = useState(false);
    async function onClose() {
        setIsOpen(false);
        setAppendTag([]);
        // call new note api here
        if(!isNewNoteEmpty(newNote)){
            try {
                await persistNewNote(user_token, newNote);
                use_navigate("/notes");
                    // this work but refresh th page
                    // window.location.href = "/notes"; 
                
            } catch(error) {
                console.error("Error creating note:", error);
            }
        }
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
    
    
    
    function appendTagHandler(tag: string) {
        if(appendTag.includes(tag)){
            return;
        }
        setAppendTag([...appendTag, tag]);
    }
    function removeTagHandler(tag: string) {
        setAppendTag(appendTag.filter(t => t !== tag));
    }

    
    
    // new-tag funtion
    // rule filterTag must be empty and must not contain in allTags
    // new length > 1
    function createNewTag(tag: string){
        if(filterTag.length > 0){
            return;
        }
        if(userTag.tagList.includes(tag)){
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
                        {color_palatte.map((color) => (
                            
                            <ColorPalatte key={color} color={color} appendColor={() => selectedColor(color)} isSelected={newNote.color === color} />
                        ))}
                    </div>
                </div>
                <div className="note-area">
                    <form action="" id="new-note-form">
                        <div className="form-group">
                            <label htmlFor="note-title">Title</label>
                            <input id="note-title" type="text" autoComplete="off" onInput={(e) => setNoteField("title",e.currentTarget.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note-content">Content</label>
                            <textarea name="" id="note-content" cols={30} rows={25} maxLength={255} onInput={(e) => setNoteField("content",e.currentTarget.value)}></textarea>
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
                                userTag.tagList.map((tag, index) => (
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