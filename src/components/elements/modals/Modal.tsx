import { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    setBackgroundColor?: string;
}

let MODAL_STYLES: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
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

export default function Modal({ children, isOpen, onClose, setBackgroundColor}: ModalProps) {
    
    const modalStyles = {
        ...MODAL_STYLES,
        backgroundColor: setBackgroundColor || MODAL_STYLES.backgroundColor
    };

    const portalElement = document.getElementById('portal');
    if (!portalElement) return null;
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES} className='modal-overlay'></div>
            <div style={modalStyles} onClick={onClose} >
                {children}
            </div>
        </>
        , portalElement
);
}