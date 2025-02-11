import Note from "./Note";
import "./notelist.css";
import { MdOutlinePushPin } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import { getNoteListEntry } from "../../utility/getListNoteEntry";
import { INoteListDto } from "../../domain/NoteDto";
export default function NoteLists() {

    // fetch all note
    
    const {totalNote, noteLists} = getNoteListEntry();
    return (
        <div className="note-display">
            <div className="note-pinned">
                <span className="section-detail">
                    <MdOutlinePushPin />
                </span>
                {
                 noteLists.filter(note => note.status === "pin")
                 .map((note) => (
                     <Note key={note.id} noteData={note} /> // Pass the `noteData` prop here
                 ))
                }
                
                
            </div>
            <div className="note-list">
                <span className="section-detail">
                    <FaRegStickyNote />    
                </span>
                {
                    noteLists.filter(note => note.status === "unpin")
                    .map((note) => (
                        <Note key={note.id} noteData={note} /> // Pass the `noteData` prop here
                    ))
                }
            </div>
            
            
        </div>
    );
}