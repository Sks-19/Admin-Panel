import React from "react";
import { FaSave } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css';

const EditableRow = ({ editFormData, handleEditFormChange }) => {
    return (
        <>
            <tr id='tRow'>
                <td>
                    <input
                        className="form-check-input"
                        type="checkbox"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter Name..."
                        required="required"
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                    >
                    </input>
                </td>
                <td>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter Email..."
                        required="required"
                        value={editFormData.email}
                        onChange={handleEditFormChange}
                    >
                    </input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        name="role"
                        placeholder="Enter Role..."
                        required="required"
                        value={editFormData.role}
                        onChange={handleEditFormChange}
                    >
                    </input></td>
                <td>
                    <button type="submit" className="btnSave"><FaSave /></button>
                </td>
            </tr>
        </>
    );
}

export default EditableRow;