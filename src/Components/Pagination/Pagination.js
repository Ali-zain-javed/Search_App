import React, { useState } from 'react';
import './styles.css';
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const rangeArray = [];

  while (i <= to) {
    rangeArray.push(i);
    i += step;
  }

  return rangeArray;
};
let totalPages = 0;
const Pagination = ({
  totalRecords = 0,
  pageLimit = 10,
  pageNeighbors = 3,
  currentPage = 1,
  onPageChanged,
}) => {
  const [state, setState] = useState({
    currentPage,
    pageLimit,
    totalPages,
    totalRecords,
  });

  React.useEffect(() => {
    // pageNeighbors can be: 0, 1 or 2
    pageNeighbors = Math.max(0, Math.min(pageNeighbors, 2));
    totalPages = Math.ceil(totalRecords / pageLimit);

    setState({
      ...state,
      currentPage,
      pageLimit,
      totalPages,
      totalRecords,
    });
  }, [totalRecords, pageLimit, currentPage]);

  const gotoPage = (page) => {
    const paginationData = {
      currentPage: Math.max(0, Math.min(page, totalPages)),
      pageLimit,
      totalPages,
      totalRecords,
    };

    onPageChanged(paginationData.currentPage);
    // setState(paginationData);
  };

  const handleClick = (page) => (evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    // gotoPage(state.currentPage - pageNeighbors * 2 - 1);
    gotoPage(state.currentPage - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    // gotoPage(state.currentPage + pageNeighbors * 2 + 1);
    gotoPage(state.currentPage + 1);
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbors to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbors
   */

  const fetchPageNumbers = () => {
    const { currentPage } = state;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbors * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  if (!totalRecords || totalPages === 1) {
    return null;
  }

  const allPages = fetchPageNumbers();

  return (
    <div>
      <div className="data">
        Showing {currentPage * pageLimit - pageLimit + 1} - {currentPage * pageLimit} of {totalRecords} items
      </div>
      <div className="pagination">
        {allPages.map((page, index) => {
          if (page === LEFT_PAGE) {
            return (<a href="#" key={index}  onClick={handleMoveLeft}>&laquo;</a>)
          }
          if (page === RIGHT_PAGE) {
            return (
              <a href="#" key={index}  onClick={handleMoveRight}>&raquo;</a>
            )
          }
          return (
            <a href="#" key={index} className={state.currentPage === page ? "active" : ""} onClick={state.currentPage === page ? () => { } : handleClick(page)}>{page}</a>)
        })}
      </div>
    </div>
  );
};

export default Pagination;
