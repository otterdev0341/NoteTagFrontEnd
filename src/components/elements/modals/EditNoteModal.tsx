import { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { IResNoteEntryDto } from '../../../domain/NoteDto';
import EditNoteForm from '../../form/EditNoteForm';
interface ModalProps {
    onClick?: () => void;
    isOpen: boolean;
    onClose?: () => void;
    setBackgroundColor?: string;
    noteData?: IResNoteEntryDto;
    
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
    color: 'red'
}
export default function EditNoteModal({ noteData, isOpen, onClose, setBackgroundColor}: ModalProps) {
    
    // inject note that selected to dit 

    const modalStyles = {
        ...MODAL_STYLES,
        backgroundColor: noteData?.colorCode || MODAL_STYLES.backgroundColor
    };

    const portalElement = document.getElementById('edit-note-portal');
    if (!portalElement) return null;
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES} className='modal-overlay' onClick={onClose}></div>
            <div style={modalStyles} >
                {
                    noteData && <EditNoteForm  noteData={noteData} />
                
                }
                <IoMdClose style={CLOSE_BTN_STYLES} onClick={onClose} />
            </div>
            
        </>
        , portalElement
);
}