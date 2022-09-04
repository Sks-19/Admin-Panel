import React from "react";
import ReactPaginate from 'react-paginate';
import { GrPrevious, GrNext } from 'react-icons/gr';

const Pagination = ({pageCount, changePage}) => {
    return (
        <>
        <div className='row'>
          <ReactPaginate
            previousLabel={<GrPrevious />}
            nextLabel={<GrNext />}
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