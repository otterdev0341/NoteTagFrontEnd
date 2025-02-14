import Note from "./Note";
import "./notelist.css";
import { MdOutlinePushPin } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import {  INoteListDto, IResNoteEntryDto } from "../../domain/NoteDto";
import { useContext, useEffect, useState } from "react";
import EditNoteModal from "./modals/EditNoteModal";
import { EditNoteContext } from "../../context/EditNoteContext";
import Cookies from "js-cookie";
import { NoteService } from "../../services/note";

export default function NoteLists() {

    const [notes, setNotes] = useState<INoteListDto>({
        total: 0,
        notes: [],
    });
    
    const user_token = Cookies.get("token") || localStorage.getItem("token") || "";
    if (!user_token) {
        throw new Error("Token not found");
    }

    

    useEffect(() => {
        async function fetchNotes() {
            try {
                const note_service = new NoteService(user_token);
                const response = await note_service.get_all_notes();
                console.log("Response:", response);
                if (response.ok) {
                    const { value } = response;
                    
                    console.log("Type", typeof(value.notes));
                    console.log("cast Object", Object.entries(value.notes));
                    const castObject = Object.entries(value.notes);
                    console.log("cast array ob item", castObject[1][1]);
                    console.log("cast length", castObject[0][1]);
                    setNotes({
                        total: castObject[0][1] as unknown as number,
                        notes: castObject[1][1] as unknown as IResNoteEntryDto[],
                    });
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        }
        fetchNotes();
    }, [user_token]);
    
    

    useEffect(() => {

        
    }, [notes]);
    
    // set note that selected to EditNoteContext
    const {setUpdateNote} = useContext(EditNoteContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<IResNoteEntryDto>();
    function handleDataUpdate(updatedNote: IResNoteEntryDto){
        // update selected note with updateNote 
        setSelectedNote(updatedNote);
    }
    function handleNoteClick(note : IResNoteEntryDto){
        
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
                {notes?.notes?.filter(note => note.status === "pin").map(note => (
                    <Note key={note.id} noteData={note} onClick={() => handleNoteClick(note)} setUpdateContext={setUpdateNote} />
                ))}
                
                
            </div>
            <div className="note-list">
                <span className="section-detail">
                    <FaRegStickyNote />    
                </span>
                {notes?.notes?.filter(note => note.status === "unpin").map(note => (
                    <Note key={note.id} noteData={note} onClick={() => handleNoteClick(note)} setUpdateContext={setUpdateNote} />
                ))}
            </div>
            {
                isModalOpen && (
                    <EditNoteModal isOpen={isModalOpen} noteData={selectedNote} onClose={handleCloseModal} />
                )
            }
            
            
        </div>
    );
}