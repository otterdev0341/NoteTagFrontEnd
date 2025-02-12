import { useState } from "react";
import { getUserTags } from "../../utility/getUserTags";
import EachTag from "../elements/EachTag";
import "./tagmanagement.css"
import { CiEdit } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Modal from "../elements/modals/Modal";


export default function TagManagement(){
    
    
    const userFetchTag = getUserTags();
    const [editTag, setEditTag] = useState<string>("");
    const [newTagName, setNewTagName] = useState<string>("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    function handleEditTag(tag: string){
        setEditTag(tag);
        
    }

    

    return (
        <div className="tag-management">
            <div className="tag-management-header">
                <h2>Tag Management</h2>
            </div>
            <div className="user-tag-display">
                {
                    userFetchTag.map((tag, index) => (
                        <div className="tag-item" key={index} >
                            <span>#{tag}</span>
                            <div className="tag-action">
                                
                                <MdOutlineEdit id="edit-action" data-tooltip-id="my-tooltip" data-tooltip-content="click to rename" 
                                    onClick={() => { setIsEditModalOpen(true); handleEditTag(tag); }} 
                                    
                                    />
                                <FaDeleteLeft id="delete-action" data-tooltip-id="my-tooltip" data-tooltip-content="click to delete tag" 
                                    onClick={() => setIsDeleteModalOpen(true)} />
                                
                            </div>
                            <Tooltip id="my-tooltip" />
                        </div>
                    ))
                }
            </div>
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <div>
                    <h2>Edit Tag</h2>
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="old-tag-name">Old Tag Name</label>
                            <input type="text" id="old-tag-name" value={editTag} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new-tag-name">New Tag Name</label>
                            <input type="text" id="new-tag-name" value={newTagName} onChange={(event) => setNewTagName((event.target as HTMLInputElement).value)} />
                        </div>
                        <div>
                            <button>Save</button>
                            <button>Cancel</button>
                        </div>
                    </form>
                </div>    
            </Modal>
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div>
                    <h2>Are you sure you want to delete this tag?</h2>
                    <p>The tag will be permanently deleted, but all notes associated with it will remain.</p>
                </div>
                <div style={{display: "flex", justifyContent: "center", columnGap: "10px"}}>
                    <button>Yes</button>
                    <button>No</button>
                </div>
            </Modal>
        </div>
    );
}