import { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from 'react-icons/io';
interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    setBackgroundColor?: string;
}

let MODAL_STYLES: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#dadada',
    padding: '60px',
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
// Responsive adjustments for small screens like iPhone SE
const responsiveModalStyles: CSSProperties = {
    padding: '5px', // Smaller padding on small screens
    width: '95%', // Use more width on small screens
    maxWidth: '320px', // Match iPhone SE width
};
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
    borderRadius: '50%', // Makes it round
}
export default function Modal({ children, isOpen, onClose, setBackgroundColor}: ModalProps) {
    
    const isMobile = window.innerWidth < 375;

    const modalStyles = {
        ...MODAL_STYLES,
        ...(isMobile && responsiveModalStyles), // Apply mobile-specific styles
        backgroundColor: setBackgroundColor || MODAL_STYLES.backgroundColor,
    };

    const portalElement = document.getElementById('portal');
    if (!portalElement) return null;
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES} className='modal-overlay' onClick={onClose}></div>
            <div style={modalStyles} >
                {children}
                <IoMdClose style={CLOSE_BTN_STYLES} onClick={onClose} />
            </div>
            
        </>
        , portalElement
);
}