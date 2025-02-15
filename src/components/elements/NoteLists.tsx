import Note from "./Note";
import "./notelist.css";
import { MdOutlinePushPin } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import {  INoteListDto } from "../../domain/NoteDto";
import { useEffect, useState } from "react";
import { fetchNotes } from "../../hooks/note";
import { injectUserToken } from "../../utility/inject_cookies";

export default function NoteLists() {

    const [notes, setNotes] = useState<INoteListDto>({
        total: 0,
        notes: [],
    });
    
    const [loadNoteTrigger, setLoadNoteTrigger] = useState(0);

    const user_token = injectUserToken();
    if (!user_token) {
        throw new Error("Token not found");
    }

    

    useEffect(() => {
        fetchNotes(user_token, setNotes, notes);
        setLoadNoteTrigger(0);
    }, [user_token,loadNoteTrigger]);
    
   

    return (
        <div className="note-display">
            <div className="note-pinned">
                <span className="section-detail">
                    <MdOutlinePushPin />
                </span>
                {notes?.notes?.filter(note => note.status === "pin").map(note => (
                    <Note key={note.id} noteData={note} handleLoadTrigger={() => setLoadNoteTrigger(prev => prev + 1)} />
                ))}
                
                
            </div>
            <div className="note-list">
                <span className="section-detail">
                    <FaRegStickyNote />    
                </span>
                {notes?.notes?.filter(note => note.status === "unpin").map(note => (
                    <Note key={note.id} noteData={note}  handleLoadTrigger={() => setLoadNoteTrigger(prev => prev + 1)} />
                ))}
            </div>
            
            
            
        </div>
    );
}