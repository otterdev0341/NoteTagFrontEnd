import { CSSProperties, useContext } from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { IReqUpdateNoteDto, IResNoteEntryDto } from '../../../domain/NoteDto';
import EditNoteForm from '../../form/EditNoteForm';
import { EditNoteContext } from '../../../context/EditNoteContext';
import { injectUserToken } from '../../../utility/inject_cookies';
import { updateNote } from '../../../hooks/note';
interface ModalProps {
    onClick?: () => void;
    isOpen: boolean;
    onClose?: () => void;
    
    noteData?: IResNoteEntryDto;
    trigger: () => void;
}

let MODAL_STYLES: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#dadada',
    padding: '50px',
    borderRadius: '10px',
    zIndex: 1000
}

const OVERLAY_STYLES: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

const CLOSE_BTN_STYLES: CSSProperties = {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'pointer',
    fontSize: '25px',
    color: 'red',
    textShadow: '1px 1px 3px white, -1px -1px 3px white', // White glow effect
    border: '2px solid white', // Thin white border
    padding: '2px', // Small padding for better visibility
    borderRadius: '50%', // Optional: Makes it round like a button
}
export default function EditNoteModal({trigger, noteData, isOpen, onClose }: ModalProps) {
    // inject token
    const user_token = injectUserToken();
    // inject note that selected to dit 
    const {editNote} = useContext(EditNoteContext);
    const modalStyles = {
        ...MODAL_STYLES,
        backgroundColor: editNote?.color || MODAL_STYLES.backgroundColor
    };

    const portalElement = document.getElementById('edit-note-portal');
    if (!portalElement) return null;
    if (!isOpen) return null;

    async function handleUpdatenote(oldNote: IResNoteEntryDto, newNote: IReqUpdateNoteDto) {
        const update_note = await updateNote(oldNote, user_token, newNote);
        if(update_note.ok){
            console.log(update_note.value);
        }
        trigger();
        
    }


    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES} className='modal-overlay' onClick={onClose}></div>
            <div style={modalStyles} >
                {
                    noteData && <EditNoteForm selectedNote={noteData} handleUpdatenote={handleUpdatenote}  />
                
                }
                <IoMdClose style={CLOSE_BTN_STYLES} onClick={onClose} />
            </div>
            
        </>
        , portalElement
);
}