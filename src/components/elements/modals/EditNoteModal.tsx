import { CSSProperties, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { IReqUpdateNoteDto, IResNoteEntryDto } from '../../../domain/NoteDto';
import { EditNoteContext } from '../../../context/EditNoteContext';
import { injectUserToken } from '../../../utility/inject_cookies';
import { updateNote } from '../../../hooks/note';
import { RiPushpinFill, RiUnpinFill } from 'react-icons/ri';
import { Tooltip } from 'react-tooltip';
import ColorPalatte from '../ColorPalatte';
import { getColorPalatte } from '../../../utility/colorPalatte';
import EachTag from '../EachTag';
import { isAlphanumeric } from '../../../utility/validateData';
import { FaCirclePlus } from 'react-icons/fa6';
import { IUserTagListDto } from '../../../domain/UserTagDto';
import { fetchUserTag } from '../../../hooks/user_tag';
interface ModalProps {
    onClick?: () => void;
    isOpen: boolean;
    onClose?: () => void;
    
    noteData?: IResNoteEntryDto;
    trigger?: () => void;
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

    async function handleUpdatenote(newNote: IReqUpdateNoteDto) {
        const update_note = await updateNote(user_token, newNote);
        if(update_note.ok){
            console.log(update_note.value);
        }
        if(trigger) trigger();
        
    }

    // section to perform update note
        const color_palatte = getColorPalatte();
        const [updatedNote, setUpdatedNote] = useState<IReqUpdateNoteDto>
            ({id: noteData?.id as number, title: noteData?.title, content: noteData?.content, color: noteData?.colorCode, status: noteData?.status,noteTags: noteData?.noteTags,});
         const [userTag, setUserTag] = useState<IUserTagListDto>({
                totalTag : 0,
                tagList: []
            });
        function setNoteField<T extends keyof IReqUpdateNoteDto>(field: T, value: IReqUpdateNoteDto[T]) {
            setUpdatedNote(prevNote => ({
            ...prevNote,
            [field]: value
        }));
        };
        function setNoteStatusToggle(){
            setNoteField("status", updatedNote?.status === "unpin" || "" ? "pin" : "unpin");
        }
        function removeTagHandler(thisTag: string){
                const updateTag = (updatedNote.noteTags ?? []).filter(tag => tag !== thisTag);
                
                setNoteField("noteTags", updateTag);
        
            }
            // load all user tag
            
            const [filterTag, setFilterTag] = useState<string[]>([]);
            const [filterTagKeyword, setFilterTagKeyword] = useState<string>("");
            
            
             function createNewTag(tag: string){
                    if(filterTag.length > 0){
                        return;
                    }
                    if(userTag.tagList.includes(tag)){
                        return;
                    }
                    if(tag.length < 1){
                        return;
                    }
                    if(!isAlphanumeric(tag)){
                        setFilterTagKeyword("");
                        return;
                        
                    }
                    appendTagHandler(tag);
                    setFilterTagKeyword("");
                    
                }
            
            function appendTagHandler(tag: string) {
                if((updatedNote.noteTags ?? []).includes(tag)){
                    return;
                }
                
                setNoteField("noteTags", [...updatedNote.noteTags ?? [], tag]);
            }
        
            function filterTagHandler(event: React.ChangeEvent<HTMLInputElement>){
                const keyword = event.target.value;
                setFilterTagKeyword(keyword);
                if(keyword.length < 1){
                    setFilterTag([]);
                    return;
                }
                const filterTag = userTag.tagList.filter(tag => tag.includes(keyword));
                setFilterTag(filterTag);
            }
        useEffect(() => {
            setNewBackgroundColor(updatedNote?.color || '');
        },[updatedNote.color]);
            useEffect(() => {
                fetchUserTag(user_token, setUserTag);
                
            },[user_token]);
        const setNewBackgroundColor = (color: string) => {
            const target = document.getElementById('edit-modal');
            if (target) {
                target.style.backgroundColor = color;
            }
        }

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES} className='modal-overlay' onClick={() => {
                 if (onClose) onClose();
                 handleUpdatenote(updatedNote);
            }}></div>
            <div id='edit-modal' style={modalStyles} >
            <div className="new-note-container">
                <div className="pin-color-area">
                    <div className="display-frame">
                        
                    </div>
                    <div className="display-pin-toggle">
                        <a className="pin-icon" onClick={setNoteStatusToggle}>
                            {
                                (updatedNote.status === "pin" 
                                ? <RiUnpinFill data-tooltip-id="my-tooltip" data-tooltip-content="click to unpin note" />
                                : <RiPushpinFill data-tooltip-id="my-tooltip" data-tooltip-content="click to pin note" />
                                )
                            }
                        </a>
                        <Tooltip id="my-tooltip" />
                    </div>
                    
                    <div className="display-color-palatte">
                        {color_palatte.map((color) => (
                            
                            <ColorPalatte key={color} color={color} appendColor={() => setNoteField("color", color)} isSelected={updatedNote.color === color} />
                        ))}
                    </div>
                </div>
                <div className="note-area">
                    <form action="" id="new-note-form">
                        <div className="form-group">
                            <label htmlFor="note-title">Title</label>
                            <input value={updatedNote.title} id="note-title" type="text" autoComplete="off" onInput={(event) => setNoteField("title", (event.target as HTMLInputElement).value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note-content">Content</label>
                            <textarea value={updatedNote.content} name="" id="note-content" cols={30} rows={25} maxLength={255} onChange={(event) => setNoteField("content", (event.target as HTMLTextAreaElement).value)}></textarea>
                        </div>
                    </form>
                </div>
                <div className="tag-area">
                    <div className="appended-tag">
                        {
                            updatedNote && (updatedNote.noteTags ?? []).map((tag) => (
                                <a key={tag} data-tooltip-id="my-tooltip" data-tooltip-content="click to remove tag">
                                    <EachTag  tag={tag} onClick={() => removeTagHandler(tag)} />
                                </a>
                            ))
                        }
                    </div>
                    {/* <Tooltip id="my-tooltip" /> */}
                    <div className="new-note-tag-container">
                        <div className="filter-tag">
                            <input value={filterTagKeyword} type="text" id="filter-tag" placeholder="search tag" onInput={(e) => setFilterTagKeyword(e.currentTarget.value)} onChange={filterTagHandler} />
                        </div>
                        <div className="apply-new-tag">
                            <a id="new-tag" onClick={() => createNewTag(filterTagKeyword)}>
                                <FaCirclePlus id="new-tag-icon" />
                                <span>create</span>
                            </a>
                        </div>
                        
                    </div>
                    <div className="display-user-tag">
                        {
                            filterTag.length > 0 || filterTagKeyword.length > 0 ? (
                                filterTag.map((tag) => (
                                    <a key={tag} data-tooltip-id="my-tooltip" data-tooltip-content="click to append tag">
                                        <EachTag  tag={tag} onClick={() => appendTagHandler(tag)} />
                                    </a>
                                ))
                            ) : (
                                userTag.tagList.map((tag) => (
                                    <a key={tag} data-tooltip-id="my-tooltip" data-tooltip-content="click to append tag">
                                        <EachTag tag={tag} onClick={() => appendTagHandler(tag)} />
                                    </a>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
                <IoMdClose style={CLOSE_BTN_STYLES} onClick={() => {
                    if (onClose) onClose();
                    handleUpdatenote(updatedNote);
                }} />
            </div>
            
        </>
        , portalElement
);
}