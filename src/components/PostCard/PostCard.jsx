import React from "react";
import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import { parseISO, format } from "date-fns";
import Img from "gatsby-image";
import config from "../../../data/SiteConfig";

const PostCard = ({ cover, date, excerpt, path, tags, title }) => {
  return (
    <article className="landing-main">
      <div className="row post-card">
        <div className="entry-image col-lg-4 col-md-12">
          <Img
            fluid={cover.src.childImageSharp.fluid}
            alt={cover.alt}
            title={cover.title}
          />
        </div>
        <div className="col-lg-8 col-md-12 post-card-header">
          <h5 className="entry-title">
            <Link to={path} rel="bookmark">
              {title}
            </Link>
          </h5>
          <div className="entry-meta desktop-view">
            <span className="entry-avatar">
              <img
                src="https://secure.gravatar.com/avatar/1b6126e7eda7d78050b05080b32506b9?s=36&d=mm&r=g"
                width={36}
                height={36}
                alt="Thomas Adams"
                className="avatar"
              />
              <span className="entry-author-link">
                <Link to="/" title="Posts by Thomas Adams" rel="author">
                  {config.userName}
                </Link>
              </span>
            </span>
            <span className="entry-post-date">
              {format(parseISO(date), config.dateFormat)}
            </span>
          </div>
          <p className="land-desc">{excerpt}</p>
        </div>
      </div>
      <hr className="tag_separator" />
      <div className="row col-lg-12 cat-section flex-row-reverse">
        <div className="col-lg-8 post-cards-tags-categories">
          <p className="cat-comments-tags post-comment-count"></p>
          <div className="post-categories-tags">
            {tags &&
              tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${kebabCase(tag)}`}
                  className="btn-sm cat-comment-tags post-tags"
                >
                  {tag}
                </Link>
              ))}
          </div>
        </div>
        <div className="col-lg-4 category-name"> </div>
      </div>
    </article>
  );
};

export default PostCard;
