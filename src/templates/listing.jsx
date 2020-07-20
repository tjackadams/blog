import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import classNames from "classnames";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MainLayout } from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

class Listing extends React.Component {
  renderPaging() {
    const { currentPageNum, pageCount } = this.props.pageContext;
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
  }

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;

    return (
      <MainLayout>
        <Helmet title={config.siteTitle} />
        <SEO />
        <div className="row first-page">
          <div className="col-lg-9 col-md-8 col-sm-12 landing-site">
            {!!postEdges.length && <PostListing postEdges={postEdges} />}
            {this.renderPaging()}
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default Listing;

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            cover {
              alt
              title
              src {
                childImageSharp {
                  fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
