import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import EditableRow from './EditableRow';
import './users-entry.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrPrevious, GrNext } from 'react-icons/gr';

const url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;

function App() {
  /*API Call*/
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url).then(response => {
      setData(response.data);
    });
  }, []);


  /*Editable Row*/
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedUser = {
      id: editUserId,
      name: editFormData.name,
      email: editFormData.email,
      role: editFormData.role
    }

    const newUsers = [...data]

    const index = data.findIndex((user) => user.id === editUserId);

    newUsers[index] = editedUser;

    setData(newUsers);
    setEditUserId(null);

  }
  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);

    const formValues = {
      name: user.name,
      email: user.email,
      role: user.role,
    }

    setEditFormData(formValues);
  };

  /*Delete Row*/

  const handleDeleteClick = (userId) => {
    const newData = [...data];

    const index = data.findIndex((user) => user.id === userId);

    newData.splice(index, 1);

    setData(newData);
  }


  /*To Select all rows*/
  var currentPageUser = [];

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      let tempUser = data.map(user => {
        return { ...user, isChecked: false }
      });
      let checkedData = tempUser.map(user => {
        for (let i = pageVisited + 1; i < pageVisited + usersPerPage + 1; i++) {

          if (Number(user.id) === i) {
            return { ...user, isChecked: checked };
          }
        }
        return user;
      });
      setData(checkedData);
    } else {
      let checkedData = data.map(user => user.name === name ? { ...user, isChecked: checked } : user
      );

      setData(checkedData);
    }
  };

  // To Change Background of selected row
  let table = document.getElementById("myTable");

  const selectedRow = () => {
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        this.classList.toggle("selected");
      };
    }
  }


  /*To Delete All Selected Row*/
  const allDelete = async () => {

    const newDatas = [...data];

    const toDelete = newDatas.filter((val) => {

      let res = val.hasOwnProperty('isChecked');

      if (res === false || val.isChecked === false) {
        return val;
      }
    });
    setData(toDelete);
  }

  /*Pagination and Search Elements*/
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTearm, setSearchTerm] = useState("");

  const usersPerPage = 10;
  const pageVisited = currentPage * usersPerPage;

  var pageCount = Math.ceil(data.length / usersPerPage);;
  var count = 0;

  const displayUsers = data.filter((val) => {
    if (searchTearm === "") {
      return val;
    }
    else if (val.name.toLowerCase().includes(searchTearm.toLowerCase())
      || val.email.toLowerCase().includes(searchTearm.toLowerCase())
      || val.role.toLowerCase().includes(searchTearm.toLowerCase())) {
      count++;
      pageCount = Math.ceil(count / usersPerPage);
      return val;
    }
  })
    .slice(pageVisited, pageVisited + usersPerPage)
    .map((user) => {
      currentPageUser.push(user);
      return (
        <>
          {editUserId === user.id ? (
            <EditableRow
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
            />
          ) : (
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
          )
          }
        </>)
    });

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  }

  return (
    <>
      <div className="container w-100">
        <h1 className='Title pt-4'>Admin Panel</h1>
        <form className='w-100' onSubmit={handleEditFormSubmit}>

          <div className="d-flex justify-content-center">
            <div className="d-sm-flex input-group mb-4 w-100 pt-4">
              <input
                id="myInput"
                type="text"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                className="form-control input-text-light"
                placeholder="Search by name, email or role."
              />
            </div>
          </div>
          <div className="form-group" id='dataTable'>
            <div>
              <button
                className='btn btn-danger btnDelete mb-4'
                onClick={allDelete}
              >
                Delete Selected
              </button>
            </div>
            <table id="myTable" className="table table-hover w-100">
              <thead className='bg-warning'>
                <tr>
                  <th scope="col">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="check_all"
                      name="allSelect"
                      onChange={handleChange}
                    />
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers}
              </tbody>
            </table>
          </div>
        </form>
        <div className='row'>
          <ReactPaginate
            previousLabel={<GrPrevious />}
            nextLabel={<GrNext />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </>
  );
}

export default App;
