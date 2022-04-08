import React from "react";
import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import { parseISO, format } from "date-fns";
import Img from "gatsby-image";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";

const PostCard = ({ cover, date, description, path, tags, title }) => {
  const sharingUrl = urljoin(config.siteUrl, config.pathPrefix, path);

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
              <span className="entry-post-date">
                {format(parseISO(date), config.dateFormat)}
              </span>
              <span className="entry-post-date-short">
                {format(parseISO(date), config.dateShortFormat)}
              </span>
              <span className="entry-post-date-mini">
                {format(parseISO(date), config.dateMiniFormat)}
              </span>
            </span>
          </div>
          <p className="land-desc">{description}</p>
          <div className="entry-meta mobile-view">
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
              <span className="entry-post-date">
                {format(parseISO(date), config.dateFormat)}
              </span>
              <span className="entry-post-date-short">
                {format(parseISO(date), config.dateShortFormat)}
              </span>
              <span className="entry-post-date-mini">
                {format(parseISO(date), config.dateMiniFormat)}
              </span>
            </span>
          </div>
        </div>
      </div>
      <hr className="tag_separator" />
      <div className="row col-lg-12 cat-section flex-row-reverse">
        <div className="col-lg-8 post-cards-tags-categories">
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
        <div className="col-lg-4 category-name d-flex flex-row justify-content-around">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${sharingUrl}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${sharingUrl}&text=${title}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="twitter"
          >
            <FaTwitter />
          </a>

          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${sharingUrl}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="linkedin"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
