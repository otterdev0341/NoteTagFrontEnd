import { use, useEffect, useState } from "react";
import "./newnote.css";
import Modal from "./modals/Modal";
import { ICreateNoteDto } from "../../domain/NoteDto";
import { getColorPalatte } from "../../utility/colorPalatte";
import ColorPalatte from "./ColorPalatte";
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
    
    // handle user tag to check is it already exist or not

    const [appendTag, setAppendTag] = useState<string[]>([]);

    return (
        <>
        <div className="new-note">
            <form action="" onFocus={onOpen}>
                <div className="new-note-title">
                    <input type="text" placeholder="add note" autoComplete="off" />
                </div>
               
            </form>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} setBackgroundColor={newNote.color}>
            <div className="new-note-container">
                <div className="pin-color-area">
                    <div>
                        Create Note
                    </div>
                    <div className="display-pin-toggle">
                        pin section
                    </div>
                    <div className="display-color-palatte">
                        {color_palatte.map((color, index) => (
                            
                            <ColorPalatte key={index} color={color} appendColor={selectedColor} isSelected={newNote.color === color} />
                        ))}
                    </div>
                </div>
                <div className="note-area">
                    this is handle note data
                </div>
                <div className="tag-area">
                    this is handle tag data
                </div>
            </div>
        </Modal>
        </>
  )
}