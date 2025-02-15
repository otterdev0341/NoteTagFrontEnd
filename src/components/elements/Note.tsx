import './note.css';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IResNoteEntryDto } from '../../domain/NoteDto';
import { injectUserToken } from '../../utility/inject_cookies';
import { deleteNote } from '../../hooks/note';
import { useNavigate } from 'react-router-dom';
import Modal from './modals/Modal';
import { useState } from 'react';
import CustomButton, { ButtonType } from './Button';

interface NoteProps{
    onClick: () => void;
    noteData: IResNoteEntryDto;
    setUpdateContext: (note: IResNoteEntryDto) => void;
    handleLoadTrigger: () => void;
}

export default function Note( { setUpdateContext,onClick ,noteData, handleLoadTrigger }: NoteProps) {
    
    const use_navigate = useNavigate();
    const user_token = injectUserToken();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    function handleCloseModal() {
        setIsModalOpen(false);
        handleLoadTrigger();
    }

    function handleOpenModal() {
        setIsModalOpen(true);
    }
    async function handleDeleteNote(id: number){
        await deleteNote(user_token, id);
        handleLoadTrigger();
        setIsModalOpen(false);
        use_navigate("/note",{replace:true});
    }

    

    // Check if noteData is defined
    if (!noteData) {
        return <div>No note data available</div>;
    }
    
    const { id, title, content, colorCode, status, noteTags, createdAt } = noteData;

    
    
    return (
        
        

        <div className="note" id={id.toString()} style={{ backgroundColor: colorCode }}   >
            <div className='note-header'>
                <h2 onClick={() => { setUpdateContext(noteData)
                                     onClick()}}>
                    {title}
                </h2>
                <div className="note-action">
                    <a href="#" className='edit-btn' data-tooltip="Edit Note">
                        <CiEdit onClick={() => {
                            setUpdateContext(noteData)
                            onClick()
                            }} />
                    </a>
                    <a href="#" className='delete-btn'>
                        <MdOutlineDeleteOutline onClick={() => handleOpenModal()} />
                    </a>
                </div>
            </div>
            <div className='note-conter' onClick={() => {
                            setUpdateContext(noteData)
                            onClick()
                            }}>
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
            
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
                <div className='modal-area'>
                    <h4 className='modal-topic'>Delete note?</h4>
                    <div className='alert-action'>
                        <CustomButton button_type={ButtonType.Warning} text="delete" onClick={() => handleDeleteNote(id)} />
                        <CustomButton button_type={ButtonType.Primary} text="cancel" onClick={handleCloseModal} />
                    </div>
                </div>
            </Modal>
        </div>
        
    );
}