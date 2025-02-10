import { use, useEffect, useState } from "react";
import "./newnote.css";
import Modal from "./modals/Modal";
import { ICreateNoteDto } from "../../domain/NoteDto";
import { getColorPalatte } from "../../utility/colorPalatte";
import ColorPalatte from "./ColorPalatte";
import { RiPushpinFill, RiUnpinFill } from "react-icons/ri";
import { noteStatus } from "../../utility/noteStatus";

import { Tooltip } from "react-tooltip";


export default function NewNote() {

    // new note to persist to api area
    const [newNote, setNewNote] = useState<ICreateNoteDto>({
        title:"",
        content:"",
        color:"",
        status:"",
        noteTags:[]
     });
 
     useEffect(() => {
         console.log(newNote);
     }, [newNote]);
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
        setIsOpen(true);
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

    const [appendTag, setAppendTag] = useState<string[]>([]);

    return (
        <>
        <div className="new-note">
            <form action="" onFocus={onOpen}>
                <div className="new-note-title">
                    <input type="text" placeholder="add note" autoComplete="off"  />
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
                            
                            <ColorPalatte key={index} color={color} appendColor={selectedColor} isSelected={newNote.color === color} />
                        ))}
                    </div>
                </div>
                <div className="note-area">
                    <form action="" id="new-note-form">
                        <div className="form-group">
                            
                            <input id="note-title" type="text" placeholder="Note Title" autoComplete="off" onInput={(e) => setNoteTitle(e.currentTarget.value)} />
                        </div>
                        <div className="form-group">
                            <textarea name="" id="note-content" cols={30} rows={25} placeholder="Note Content" maxLength={255} onInput={(e) => setNoteContentnt(e.currentTarget.value)}></textarea>
                        </div>
                    </form>
                </div>
                <div className="tag-area">
                    this is handle tag data
                </div>
            </div>
        </Modal>
        </>
  )
}