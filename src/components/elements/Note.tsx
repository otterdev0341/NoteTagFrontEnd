import './note.css';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IResNoteEntryDto } from '../../domain/NoteDto';
import { injectUserToken } from '../../utility/inject_cookies';
import { deleteNote } from '../../hooks/note';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './modals/Modal';
import { useContext, useState } from 'react';
import CustomButton, { ButtonType } from './Button';
import EditNoteModal from './modals/EditNoteModal';
import { EditNoteContext } from '../../context/EditNoteContext';

interface NoteProps{
    
    noteData: IResNoteEntryDto;
    handleLoadTrigger?: () => void;
}

export default function Note( { noteData, handleLoadTrigger }: NoteProps) {
    // Check if noteData is defined
    if (!noteData) {
        return <div>No note data available</div>;
    }
    
    const { id, title, content, colorCode, noteTags,  } = noteData;
    const { setUpdateNote} = useContext(EditNoteContext);
    // utilize useNavigate
    const use_navigate = useNavigate();
    const current_path = useLocation().pathname;
    // inject token
    const user_token = injectUserToken();
    // set all state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // hanler function
    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(false);
        if (handleLoadTrigger) handleLoadTrigger();
    }
    function handleCloseEditModal() {
        setIsEditModalOpen(false);
        if (handleLoadTrigger) handleLoadTrigger();
    }

    function handleOpenDeleteModal() {
        setIsDeleteModalOpen(true);
    }
    function handleEditModalOpen() {
        setIsEditModalOpen(true);
        setUpdateNote(noteData);
    }

    // effect api call
    async function handleDeleteNote(id: number){
        await deleteNote(user_token, id);
        if (handleLoadTrigger) handleLoadTrigger();
        setIsDeleteModalOpen(false);
        if (current_path === "/search"){
            use_navigate("/search",{replace:true});
        } else {
            use_navigate("/note");
        }
        
    }

    

    

    
    
    return (
        <div className="note" id={id.toString()} style={{ backgroundColor: colorCode }}   >
            <div className='note-header'>
                <h2 >
                    {title}
                </h2>
                <div className="note-action">
                    <a href="#" className='edit-btn' data-tooltip="Edit Note">
                        <CiEdit onClick={() => handleEditModalOpen()} />
                    </a>
                    <a href="#" className='delete-btn'>
                        <MdOutlineDeleteOutline onClick={() => handleOpenDeleteModal()} />
                    </a>
                </div>
            </div>
            <div className='note-conter' >
                <p className='content-detail'>{content}</p>
            </div>
            <div className='note-footer'>
                {
                    Array.isArray(noteTags) && noteTags.length > 0 ? (
                    noteTags.map((tag, index) => (
                        <span id='tag-item' key={index} className='tag'>{`#${tag}`}</span>
                ))): (
                        ""
                    )
                }
            </div>
            {
                // edit note modal
                isEditModalOpen && (
                    <EditNoteModal isOpen={isEditModalOpen} noteData={noteData} onClose={handleCloseEditModal} trigger={handleLoadTrigger} />
                )
            }
            {
                // delete note modal
                isDeleteModalOpen && 
                (<Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} >
                <div className='modal-area'>
                    <h4 className='modal-topic'>Delete note?</h4>
                    <div className='alert-action'>
                        <CustomButton button_type={ButtonType.Warning} text="delete" onClick={() => handleDeleteNote(id)} />
                        <CustomButton button_type={ButtonType.Primary} text="cancel" onClick={handleCloseDeleteModal} />
                    </div>
                </div>
                </Modal>)
            }
            
        </div>
        
    );
}