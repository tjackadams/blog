import { FunctionComponent } from "react";
import Link from "next/link";
import { Post } from "../../types/Post.types";
import { format, parseISO } from "date-fns";

interface IPostCardProps {
  post: Post;
}

export const PostCard: FunctionComponent<IPostCardProps> = ({ post }) => {
  const { attributes } = post;

  return (
    <article key={post.slug} className="landing-main">
      <div className="row post-card">
        <div className="entry-image col-lg-4 col-md-12">
          <div>
            <img
              className="lp-default-image"
              src={attributes.featured_image.src}
              alt={attributes.featured_image.alt}
              title={attributes.featured_image.title}
            />
          </div>
        </div>
        <div className="col-lg-8 col-md-12 post-card-header">
          <h5 className="entry-title">
            <Link href="/[slug]" as={`/${post.slug}`}>
              <a rel="bookmark">{post.attributes.title}</a>
            </Link>
          </h5>
          <div className="entry-meta desktop-view x-hidden-focus">
            <span className="entry-avatar">
              <span className="entry-author-link">
                <Link href="/" as="/">
                  <a
                    title="Posts by Thomas Adams"
                    rel="author"
                    className=" x-hidden-focus"
                  >
                    Thomas Adams
                  </a>
                </Link>
              </span>
            </span>
            <span className="entry-post-date x-hidden-focus">
              {format(parseISO(post.attributes.date), "MMMM dd, yyyy")}
            </span>
          </div>
          <p className="land-desc">{post.attributes.description}</p>
        </div>
      </div>
      <hr className="tag_separator" />
      <div className="row col-lg-12 cat-section flex-row-reverse">
        <div className="col-lg-8 post-cards-tags-categories">
          <div className="post-categories-tags">
            {post.attributes.tags &&
              post.attributes.tags.map((tag, index) => (
                <a
                  key={tag + index}
                  href=""
                  className="btn-sm cat-comment-tags post-tags"
                >
                  {tag}
                </a>
              ))}
          </div>
        </div>
        <div className="col-lg-4 category-name"></div>
      </div>
    </article>
  );
};
