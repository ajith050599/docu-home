import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import CustomModal from "../modal/Modal";
import tableData from "../../assets/MOCK_DATA (4)";
import editImg from "../../assets/edit.png";
import deleteImg from "../../assets/delete.png";
import viewImg from "../../assets/view.png";
import "./table.scss"

const Tables = (props) => {
    const columns = [
        { id: 'id', name: 'S. No' },
        { id: 'projectName', name: 'PROJECT NAME' },
        { id: 'details', name: 'DETAILS' },
        { id: 'action', name: 'ACTIONS' }
    ]
    const [rows, rowchange] = useState(tableData);
    const [isDeleteId,setIsDeleteId] = useState(null);
    const [editProjectId, setEditProjectId] = useState(null);
    const [addFormData, setAddFormData] = useState({
        projectName : "",
        details : "",
      });
    const [editFormData, setEditFormData] = useState({
        projectName : "",
        details : "",
      });

      const handleAddFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
      };

      const handleAddFormSubmit = (event) => {
        event.preventDefault();
    
        const newRow = {
          id: nanoid(),
          projectName: addFormData.projectName,
          details: addFormData.details,
        };
    
        const newRows = [...rows, newRow];
        rowchange(newRows);
        props.setIsOpen(false);
      };
    

      const handleEditFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
    
        setEditFormData(newFormData);
      };

      const handleEditFormSubmit = (event) => {
        event.preventDefault();
    
        const editedProject = {
          id: editProjectId,
          projectName: editFormData.projectName,
          details: editFormData.details,
        };
    
        const newRows = [...rows];
    
        const index = rows.findIndex((row) => row.id === editProjectId);
    
        newRows[index] = editedProject;
    
        rowchange(newRows);
        setEditProjectId(null);
        props.setIsOpen(false);
      };

      const handleEditClick = (event,row) => {
        event.preventDefault()
        console.log("this is the id",row);
        setEditProjectId(row.id);
        const formValues = {
            projectName: row.projectName,
            details: row.details,
        };
        setEditFormData(formValues);
        rowEditModal()
       
      };
    
      const handleCancelClick = () => {
        setEditProjectId(null);
        props.setIsOpen(false);
      };

    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

    const rowEditModal = () => {
        props.setRowActions("edit")
        props.setIsOpen(true)
    }

    const rowDeleteModal = (row) => {
        props.setRowActions("delete")
        setIsDeleteId(row.id-1)
        props.setIsOpen(true);
    }
 const confirmDeleteRow = (id) => {
    rows.splice(id, 1);
    rowchange([...rows]);
    props.setIsOpen(false);
 }

   
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(7);



    return (
        <div className="table-div">
            <Paper sx={{ width: '80%' }}>
                <TableContainer sx={{maxHeight:600}}>
                    <Table className="project-table" stickyHeader>
                        <TableHead className="project-table-head">
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell className="table-head" key={column.id}>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows
                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                .map((row, i) => {
                                    return (
                                        <TableRow key={i}>
                                            {columns && columns.map((column, i) => {
                                                let value = row[column.id];
                                                return (
                                                    column.id === "action"
                                                    ?
                                                    <TableCell key={value}>
                                                        <div className="actions">
                                                            <button className="edit-button" onClick={(event) => handleEditClick(event,row)}>
                                                            <img src={editImg} className="action-icons"></img>
                                                            </button>
                                                            <button className="delete-button" onClick={() => rowDeleteModal(row)}>
                                                            <img src={deleteImg} className="action-icons"></img>
                                                            </button>
                                                            <button className="view-button">
                                                            <img src={viewImg} className="action-icons"></img>
                                                            </button>

                                                        </div>
                                                    </TableCell>
                                                    :
                                                    <TableCell key={value}>
                                                        {value}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    rowsPerPage={rowperpage}
                    page={page}
                    count={rows.length}
                    component="div"
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handleRowsPerPage}

                >

                </TablePagination> */}
            </Paper>
            {props.isOpen
            ?
            <CustomModal 
            action={props.rowActions} 
            setIsOpen={props.setIsOpen} 
            isDeleteId={isDeleteId} 
            editFormData={editFormData}
            confirmDeleteRow={confirmDeleteRow} 
            handleAddFormChange={handleAddFormChange}
            handleAddFormSubmit={handleAddFormSubmit}
            handleEditFormChange={handleEditFormChange}
            handleEditFormSubmit={handleEditFormSubmit}
            handleCancelClick={handleCancelClick}
             />
             :
             null}
        </div>
    );
}

export default Tables;