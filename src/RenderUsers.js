import React from "react";
import Pagination from './Pagination';
import './RenderUsers.css';

const RenderUsers = ({ data, setData, handleEditFormSubmit, setSearchTerm, handleChange, displayUsers, pageCount, changePage}) => {
    
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

    return (
    <>
      <div className="container">
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
            <table id="myTable" className="TableRes">
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
                  <th className="p-2" scope="col">Name</th>
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
        <Pagination 
            pageCount={pageCount}
            changePage={changePage}
        />
      </div>
    </>
    );
}

export default RenderUsers;