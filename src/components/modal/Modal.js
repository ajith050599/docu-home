import React from "react";
import "./modal.scss";


const CustomModal = (props) => {


  return (
      <div className="modal-backdrop">
        {props.action === "delete"
        ?
			<div className="modal-container-delete">
				<p className="delete-para">Are you sure you want to delete this row ?</p>
                <div className="cancel-delete-div">
                    <button onClick={() => props.setIsOpen(false)} className="cancel-delete-btn">
                        Cancel
                    </button>
                    <button onClick={() => props.confirmDeleteRow(props.isDeleteId)} className="confirm-delete-btn">
                        Delete
                    </button>
                </div>
			</div>

            :
           props.action === "edit"
           ? 
           <div className="modal-container-form">
                   <h4>Edit Form</h4> 
                <form onSubmit={props.handleEditFormSubmit} className="modal-form">
                 <input
                    type="text"
                    required="required"
                    placeholder="Edit the project name"
                    name="projectName"
                    value={props.editFormData.projectName}
                    onChange={props.handleEditFormChange}
                    className="modal-input"
                    >
                </input>
                <input
                    type="text"
                    required="required"
                    placeholder="Edit the details"
                    name="details"
                    value={props.editFormData.details}
                    onChange={props.handleEditFormChange}
                    className="modal-input"
                    >
                </input>
                <div className="cancel-delete-form">
                    <button onClick={() => props.setIsOpen(false)} className="cancel-form-btn">
                        Cancel
                    </button>
                    <button type="submit" className="save-form-btn">
                        Save
                    </button>
                </div>
                </form>
			</div>
            :
            <div className="modal-container-form">
               <h4>Add Form</h4> 
            <form onSubmit={props.handleAddFormSubmit} className="modal-form">
             <input
                type="text"
                required="required"
                placeholder="Add the project name"
                name="projectName"
                onChange={props.handleAddFormChange}
                className="modal-input"
                >
            </input>
            <input
                type="text"
                required="required"
                placeholder="Enter the details"
                name="details"
                onChange={props.handleAddFormChange}
                className="modal-input"
                >
            </input>
            <div className="cancel-delete-form">
                <button onClick={() => props.setIsOpen(false)} className="cancel-form-btn">
                    Cancel
                </button>
                <button type="submit" className="save-form-btn">
                    Add
                </button>
            </div>
            </form>
        </div>
            
            }
		</div>
  );
};

export default CustomModal;

