import React from 'react'
import { Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';

export default function PagnationForList({ handlePageChange, changeCurrentPage, currentPage, selectedPage, pages }) {
    const listSize = [5, 10, 15, 20, 25, 30]

    return (
        <div className="d-flex justify-content-between">
            <Pagination aria-label="Page navigation example">

                <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous onClick={() => changeCurrentPage(currentPage - 1)} />
                </PaginationItem>
                {
                    pages.map((obj) =>
                        <PaginationItem active={obj === currentPage} key={obj}>
                            <PaginationLink onClick={() => changeCurrentPage(obj)}>
                                {obj}
                            </PaginationLink>
                        </PaginationItem>
                    )
                }
                <PaginationItem disabled={currentPage === pages[pages.length - 1]}>
                    <PaginationLink next onClick={() => changeCurrentPage(currentPage + 1)} />
                </PaginationItem>

            </Pagination>

            <Input style={{ width: "7%" }} type="select" value={selectedPage} onChange={handlePageChange} name="pageChange" >
                {
                    listSize.map((option, i) =>
                        <option key={i}>{option}</option>
                    )
                }

            </Input>
        </div>
    )
}
