import React from "react";
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import './users-entry.css';

const DisplayedRow = ({data, setData, user, handleChange, handleEditClick}) => {
    
     /*Delete Single Row*/
    const handleDeleteClick = (userId) => {
        const newData = [...data];

        const index = data.findIndex((user) => user.id === userId);

        newData.splice(index, 1);

        setData(newData);
    }
    
    // To Change Background of selected row
    let table = document.getElementById("myTable");

    const selectedRow = () => {
        for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            this.classList.toggle("selected");
        };
        }
    }

    return (
        <>
              <tr id='tRow'>
                <th scope='row'>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={user.id}
                    onClick={selectedRow}
                    onChange={handleChange}
                    checked={user?.isChecked || false}
                    name={user.name}
                  />
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <BiEdit
                    className='iconEdit'
                    type="button"
                    onClick={(event) => handleEditClick(event, user)}
                  />
                  <AiOutlineDelete
                    className='iconDelete'
                    type="button"
                    onClick={() => handleDeleteClick(user.id)}
                  />
                </td>
              </tr>
            </>
    );
}

export default DisplayedRow;