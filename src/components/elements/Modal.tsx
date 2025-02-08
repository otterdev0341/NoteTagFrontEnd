import ReactDOM from 'react-dom';
interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
}
export default function Modal({ children, isOpen }: ModalProps) {
    
    const portalElement = document.getElementById('portal');
    if (!portalElement) return null;
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div>
                {children}
            </div>
        </>
        , portalElement
);
}