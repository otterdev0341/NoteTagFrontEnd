import './note.css';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IResNoteEntryDto } from '../../domain/NoteDto';

interface NoteProps{
    onClick: () => void;
    noteData: IResNoteEntryDto;
    setUpdateContext: (note: IResNoteEntryDto) => void;
}

export default function Note( { setUpdateContext,onClick ,noteData }: NoteProps) {
    
     // Log the props to check if they are being passed correctly

    console.log('Note component props:', { setUpdateContext, onClick, noteData });

    // Check if noteData is defined
    if (!noteData) {
        return <div>No note data available</div>;
    }
    
    const { id, title, content, colorCode, status, noteTags, createdAt } = noteData;

    
    
    return (
        
        

        <div className="note" id={id.toString()} style={{ backgroundColor: colorCode }}  onClick={() => {
            setUpdateContext(noteData)
            onClick()
            }} >
            <div className='note-header'>
                <h2>{title}</h2>
                <div className="note-action">
                    <a href="#" className='edit-btn' data-tooltip="Edit Note">
                        <CiEdit />
                    </a>
                    <a href="#" className='delete-btn'>
                        <MdOutlineDeleteOutline />
                    </a>
                </div>
            </div>
            <div className='note-conter'>
                <p className='content-detail'>{content}</p>
            </div>
            <div className='note-footer'>
                {
                    Array.isArray(noteTags) && noteTags.length > 0 ? (
                    noteTags.map((tag, index) => (
                        <span id='tag-item' key={index} className='tag'>{`#${tag}`}</span>
                ))): (
                        <span id='tag-item' className='tag'>No Tags</span>
                    )
                }
            </div>
            

        </div>
        
    );
}