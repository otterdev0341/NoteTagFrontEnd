import './note.css';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IResNoteEntryDto } from '../../domain/NoteDto';

interface NoteProps{
    
    noteData: IResNoteEntryDto;
}

export default function Note( { noteData }: NoteProps) {
    const { id, title, content, colorCode, status, tag, createdAt } = noteData;

    
    
    return (
        
        
        <div className="note" id={id} style={{ backgroundColor: colorCode }}>
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
                <p className='note-tag'>{tag}</p>
                
            </div>
            

        </div>
        
    );
}