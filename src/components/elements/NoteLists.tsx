import Note from "./Note";
import "./notelist.css";
import { MdOutlinePushPin } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import { getNoteListEntry } from "../../utility/getListNoteEntry";
import {  IResNoteEntryDto } from "../../domain/NoteDto";
import { useContext, useEffect, useState } from "react";
import EditNoteModal from "./modals/EditNoteModal";
import Modal from "./modals/Modal";
import { EditNoteContext } from "../../context/EditNoteContext";
export default function NoteLists() {

    // fetch all note
    const {totalNote, noteLists} = getNoteListEntry();
    
    // set note that selected to EditNoteContext
    const {setUpdateNote} = useContext(EditNoteContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<IResNoteEntryDto>();
    function handleDataUpdate(updatedNote: IResNoteEntryDto){
        // update selected note with updateNote 
        setSelectedNote(updatedNote);
    }
    function handleNoteClick(note : IResNoteEntryDto){
        console.log(note);
        setIsModalOpen(true);
        setSelectedNote(note);

        
    };

    function handleCloseModal(){
        setIsModalOpen(false);
        setSelectedNote({} as IResNoteEntryDto);
    };

    return (
        <div className="note-display">
            <div className="note-pinned">
                <span className="section-detail">
                    <MdOutlinePushPin />
                </span>
                {
                 noteLists.filter(note => note.status === "pin")
                 .map((note) => (
                     <Note key={note.id} noteData={note} onClick={() => handleNoteClick(note)} setUpdateContext={setUpdateNote} /> // Pass the `noteData` prop here
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
                        <Note key={note.id} noteData={note} onClick={() => handleNoteClick(note)} setUpdateContext={setUpdateNote}  /> // Pass the `noteData` prop here
                    ))
                }
            </div>
            {
                isModalOpen && (
                    <EditNoteModal isOpen={isModalOpen} noteData={selectedNote} onClose={handleCloseModal} />
                )
            }
            
            
        </div>
    );
}