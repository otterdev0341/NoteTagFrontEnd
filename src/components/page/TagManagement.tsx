import { useState } from "react";
import { getUserTags } from "../../utility/getUserTags";
import "./tagmanagement.css"
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Modal from "../elements/modals/Modal";
import CustomButton, { ButtonType } from "../elements/Button";


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
                    <h3>Edit Tag</h3>
                    <form action="" style={{marginTop: "20px"}}>
                        <div className="form-group">
                            <label htmlFor="old-tag-name">Old Tag Name</label>
                            <input type="text" id="old-tag-name" value={editTag} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new-tag-name">New Tag Name</label>
                            <input type="text" id="new-tag-name" autoComplete="off" value={newTagName} onChange={(event) => setNewTagName((event.target as HTMLInputElement).value)} />
                        </div>
                        <div className="edit-tag-action">
                            <CustomButton button_type={ButtonType.Primary} text="Save" ></CustomButton>
                            <CustomButton button_type={ButtonType.Danger} text="Cancel" onClick={() => setIsEditModalOpen(false)} ></CustomButton>
                            
                        </div>
                    </form>
                </div>    
            </Modal>
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div>
                    <h3>Are you sure you want to delete this tag?</h3>
                    <p style={{marginTop: "20px", textAlign: "center"}}>
                        The tag will be permanently deleted.
                    </p>
                    <p style={{marginBottom: "20px", textAlign: "center"}}>
                        all notes associated with it will remain.
                    </p>
                </div>
                <div style={{display: "flex", justifyContent: "center", columnGap: "30px"}}>
                    <CustomButton button_type={ButtonType.Primary} text="Yes" ></CustomButton>
                    <CustomButton button_type={ButtonType.Danger} text="No" onClick={() => setIsDeleteModalOpen(false)}></CustomButton>
                </div>
            </Modal>
        </div>
    );
}