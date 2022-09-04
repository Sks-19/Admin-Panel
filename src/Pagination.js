import React from "react";
import ReactPaginate from 'react-paginate';
import { GrPrevious, GrNext } from 'react-icons/gr';
import './Pagination.css';

const Pagination = ({pageCount, changePage}) => {
    return (
        <>
        <div className='row'>
          <ReactPaginate
            previousLabel={<GrPrevious className="Previous"/>}
            nextLabel={<GrNext className="Next"/>}
            pageCount={ pageCount }
            onPageChange={ changePage }
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
        </>
    );
}

export default Pagination;