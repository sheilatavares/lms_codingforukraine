import React, { useState, useEffect } from 'react';
import { usePaginationRange, DOTS } from '../hooks/usePaginationRange';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Pagination = ({
  data,
  RenderComponent,
  ordLesson,
  moduleSlug,
  sectionSlug,
  buttonConst,
  contentPerPage,
  siblingCount,
}) => {
  const [totalPageCount] = useState(Math.ceil(data.length / contentPerPage));

  let slugData = [];

  data.forEach(function (item) {
    slugData.push(item.slug);
  });

  const [currentPage, setCurrentPage] = useState(Number(ordLesson));
  const navigate = useNavigate();

  const paginationRange = usePaginationRange({
    totalPageCount,
    contentPerPage,
    buttonConst,
    siblingCount,
    currentPage,
  });

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [currentPage]);

  function goToNextPage() {
    const nextPage = currentPage + 1;
    const path = `/lesson/${moduleSlug}/${sectionSlug}/${
      slugData[nextPage - 1]
    }/${nextPage}`;

    // Navigate to the next page
    navigate(path);

    // Refresh the page
    window.location.reload();
  }

  function goToPreviousPage() {
    const previousPage = currentPage - 1;
    const path = `/lesson/${moduleSlug}/${sectionSlug}/${
      slugData[previousPage - 1]
    }/${previousPage}`;

    // Navigate to the previous page
    navigate(path);

    // Refresh the page
    window.location.reload();
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * contentPerPage - contentPerPage;
    const endIndex = startIndex + contentPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="containe-full bg-white pb-3 position-relative">
      <div className="dataContainer ps-4 pe-3">
        {getPaginatedData().map((dataItem, index) => (
          <RenderComponent key={index} data={dataItem} />
        ))}
      </div>
      <div className="container-full fixed-bottom position-fixed p-2 bg-blue-dark ">
        <div className="row">
          <div className="col-lg-4 col-6 offset-lg-4 d-flex align-items-center justify-content-center">
            <span className="text-white">
              <strong>
                {currentPage} / {totalPageCount}
              </strong>
            </span>
          </div>
          <div className="col-lg-4 col-6">
            <div className="container-full">
              <div className="row">
                <div className="pagination justify-content-end">
                  <div className="pe-3">
                    <button
                      className="btn btn-outline-light me-1 px-0"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      Back
                    </button>
                    {currentPage !== totalPageCount && (
                      <button
                        onClick={goToNextPage}
                        className="btn btn-primary"
                        disabled={currentPage === totalPageCount}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  data: PropTypes.array,
  RenderComponent: PropTypes.func,
  title: PropTypes.string,
  slug: PropTypes.string,
  moduleSlug: PropTypes.string,
  sectionSlug: PropTypes.string,
  ordLesson: PropTypes.string,
  buttonConst: PropTypes.number,
  contentPerPage: PropTypes.number,
  siblingCount: PropTypes.number,
};

export default Pagination;
