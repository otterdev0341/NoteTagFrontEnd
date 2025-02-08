import './note.css';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from "react-icons/md";


export default function Note(){
    return (
        
        
        <div className="note">
            <div className='note-header'>
                <h2>Note</h2>
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
                <p className='content-detail'>This is a note Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, delectus. Tenetur architecto itaque nulla incidunt totam id recusandae corrupti dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique repellendus praesentium magnam voluptate quasi amet est error at. Iste, id!</p>
            </div>
            

        </div>
        
    );
}