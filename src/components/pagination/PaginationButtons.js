import React, { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import './../../styles/pagination.css';


const PaginationButtons = ({total_pages, setCurrentPage, current_page}) => {




    // useEffect(() => {
    //     setCurrentPage(1);
    // }, []);



    const selectCurrentPage = (current_page, total_pages) => {

        if (current_page <= total_pages && current_page >= 1) {
            console.log('current_page ', current_page);
            setCurrentPage(current_page);
        }

    }

    return (
        <div className='pagination_container'>
            <Pagination>
                {current_page !== 1
                    ? <Pagination.First onClick={() => selectCurrentPage(1, total_pages)} />
                    : <Pagination.First disabled />}
                {current_page !== 1
                    ? <Pagination.Prev onClick={() => selectCurrentPage(current_page-1, total_pages)} />
                    : <Pagination.Prev disabled />
                }

                <Pagination.Item disabled>{`${current_page} of ${total_pages}`}</Pagination.Item>

                {current_page !== total_pages
                    ? <Pagination.Next onClick={() => selectCurrentPage(current_page+1, total_pages)} />
                    : <Pagination.Next disabled />}
                {current_page !== total_pages
                    ? <Pagination.Last onClick={() => selectCurrentPage(total_pages, total_pages)} />
                    : <Pagination.Last disabled />}
            </Pagination>

        </div>
    )
}


export default PaginationButtons;