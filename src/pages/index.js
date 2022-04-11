import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import MainLayout from "../components/layout/Main";

import "./site.css";

const IndexPage = () => {
  return <MainLayout></MainLayout>;
};

const RenderPaging = (props) => {
  const { currentPageNum, pageCount } = props.pageContext;
  const prevPage = currentPageNum - 1 === 1 ? "/" : `/${currentPageNum - 1}/`;
  const nextPage = `/${currentPageNum + 1}/`;
  const isFirstPage = currentPageNum === 1;
  const isLastPage = currentPageNum === pageCount;

  return (
    <nav aria-label="Post Navigation">
      <ul className="pagination2">
        {!isFirstPage && (
          <li className="page-item2">
            <Link className="prev2 page-link2" to={prevPage}>
              <FaChevronLeft color="#0067b8" />
              <span className="screen-reader-text-pagination">
                Previous Page
              </span>
            </Link>
          </li>
        )}
        {[...Array(pageCount)].map((_val, index) => {
          const pageNum = index + 1;
          const isCurrent = pageNum === currentPageNum;

          return (
            <li
              key={`listing-page-${pageNum}`}
              className={classNames("page-item2", { active: isCurrent })}
            >
              {isCurrent ? (
                <span aria-current="page" className="page-link2 current">
                  <span className="screen-reader-text-pagination">Page</span>{" "}
                  {pageNum}
                </span>
              ) : (
                <Link
                  className="page-link2"
                  to={pageNum === 1 ? "/" : `/${pageNum}/`}
                >
                  <span className="screen-reader-text-pagination">Page</span>{" "}
                  {pageNum}
                </Link>
              )}
            </li>
          );
        })}
        {!isLastPage && (
          <li className="page-item2">
            <Link className="next2 page-link2" to={nextPage}>
              <FaChevronRight color="#0067b8" />
              <span className="screen-reader-text-pagination">Next Page</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default IndexPage;
