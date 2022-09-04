import React, { useState } from 'react';
import EditableRow from './EditableRow';
import DisplayedRow from './DisplayedRow';
import RenderUsers from './RenderUsers';
import './users-entry.css';
import 'bootstrap/dist/css/bootstrap.css';

const Users = ({ data, setData }) => {

/*Editable Row*/
 /*Pagination and Search Elements*/
 const [currentPage, setCurrentPage] = useState(0);
 /*Set team needs to search*/
 const [searchTerm, setSearchTerm] = useState("");

 //Get User Id to edit data
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


  /*To Select all rows of current  page*/
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


  /*Paginaton details*/
  const usersPerPage = 10;
  const pageVisited = currentPage * usersPerPage;
  var pageCount = Math.ceil(data.length / usersPerPage);;

  var count = 0;

  const displayUsers = data.filter((val) => {
    //Filter data form users record based on search input
    if (searchTerm === "") {
      return val;
    }
    else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())
      || val.email.toLowerCase().includes(searchTerm.toLowerCase())
      || val.role.toLowerCase().includes(searchTerm.toLowerCase())) {
      count++;
      pageCount = Math.ceil(count / usersPerPage);
      return val;
    }
  })
  //Extract the users detail need to show per page.
  .slice(pageVisited, pageVisited + usersPerPage)
  //Mapping Sliced users to render.
    .map((user) => {
      return (
        <>
          {editUserId === user.id ? (
            <EditableRow
              key={user.id}
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
            />
          ) : (
            <>
            <DisplayedRow 
              key={user.id}
              user={user}
              data={data}
              setData={setData}
              handleChange={handleChange}
              handleEditClick={handleEditClick}
            />
            </>
          )
          }
        </>)
        //
    });

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  }



  return (
    <>
    <RenderUsers 
        data={data}
        setData={setData}
        handleEditFormSubmit={handleEditFormSubmit}
        setSearchTerm={setSearchTerm}
        handleChange={handleChange}
        displayUsers={displayUsers}
        pageCount={pageCount}
        changePage={changePage}
    />
    </>
  );
}

export default Users;