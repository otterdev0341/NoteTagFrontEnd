import { useEffect, useState } from "react";
import "./tagmanagement.css"
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Modal from "../elements/modals/Modal";
import CustomButton, { ButtonType } from "../elements/Button";
import { IUpdateUserTagDto, IUserTagDto, IUserTagListDto } from "../../domain/UserTagDto";
import { injectUserToken } from "../../utility/inject_cookies";
import { fetchUserTag } from "../../hooks/user_tag";
import { UserTagService } from "../../services/user_tag";


export default function TagManagement(){
    const user_token = injectUserToken();
    if (!user_token) {
        throw new Error("Token not found");
    }
    //fetch user tag
     const [userTag, setUserTag] = useState<IUserTagListDto>({
            totalTag : 0,
            tagList: []
    });
    const [trigger, setTrigger] = useState(0);
    useEffect(() => {
        fetchUserTag(user_token, setUserTag);
        setTrigger(0);
    },[user_token, trigger]);

    
    
    // modal handler
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // handle tag operation
    const [tagData, setTagData] = useState<IUpdateUserTagDto>({
        oldTagName: "",
        newTagName: ""
    });

    function setTagField<T extends keyof IUpdateUserTagDto>(field: T, value: IUpdateUserTagDto[T]) {
        setTagData(prevNote => ({
            ...prevNote,
            [field]: value
        }));
    }
    
    async function performUpdate() {
        
        const user_service = new UserTagService(user_token);
        await user_service.update_user_tag(tagData);
        setTrigger(prev => prev + 1);
        setTagField("oldTagName", "");
        setTagField("newTagName", "");
        setIsEditModalOpen(false);
    }

    const [deleteTag, setDeleteTag] = useState<IUserTagDto>({
        tagName: ""
    });
    async function performDelete() {
        const user_service = new UserTagService(user_token);
        await user_service.delete_tag_from_user(deleteTag);
        setDeleteTag({
            tagName: ""
        });
        setTrigger(prev => prev + 1);
        setIsDeleteModalOpen(false);
    }
    

    return (
        <div className="tag-management">
            <div className="tag-management-header">
                <h2>Tag Management</h2>
            </div>
            <div className="user-tag-display">
                {
                    userTag.tagList.map((tag, index) => (
                        <div className="tag-item" key={index} >
                            <span>#{tag}</span>
                            <div className="tag-action">
                                
                                <MdOutlineEdit id="edit-action" data-tooltip-id="my-tooltip" data-tooltip-content="click to rename" 
                                    onClick={() => { setIsEditModalOpen(true); setTagField("oldTagName",tag); }} 
                                    
                                    />
                                <FaDeleteLeft id="delete-action" data-tooltip-id="my-tooltip" data-tooltip-content="click to delete tag" 
                                    onClick={() => {setIsDeleteModalOpen(true); setDeleteTag({tagName: tag});}} />
                                
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
                            <input type="text" id="old-tag-name" value={tagData.oldTagName} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new-tag-name">New Tag Name</label>
                            <input type="text" id="new-tag-name" autoComplete="off" value={tagData.newTagName} onChange={(event) => setTagField("newTagName",(event.target as HTMLInputElement).value)} />
                        </div>
                        <div className="edit-tag-action">
                        <CustomButton
                                button_type={ButtonType.Primary}
                                text="Save"
                                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                    event.preventDefault();
                                    performUpdate();
                                }}
                            />
                            <CustomButton 
                                button_type={ButtonType.Danger} 
                                text="Cancel" 
                                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                    event.preventDefault();
                                    setIsEditModalOpen(false)
                                }} />
                            
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
                    <CustomButton button_type={ButtonType.Primary} text="Yes" onClick={
                        (event: React.MouseEvent<HTMLButtonElement>) => {
                            event.preventDefault();
                            performDelete();
                        }
                    } ></CustomButton>
                    <CustomButton button_type={ButtonType.Danger} text="No" onClick={() => setIsDeleteModalOpen(false)}></CustomButton>
                </div>
            </Modal>
        </div>
    );
}