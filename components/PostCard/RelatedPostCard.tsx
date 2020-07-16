import { FunctionComponent } from "react";
import { Post } from "../../pages/blog/post/Post.types";
import { format, parseISO } from "date-fns";

interface IRelatedPostCardProps {
  post: Post;
}

export const RelatedPostCard: FunctionComponent<IRelatedPostCardProps> = ({
  post,
}) => {
  return (
    <article className="col-md-6">
      <div className="post-card">
        <a className="article-title" href="">
          {post.attributes.title}
        </a>
        <div className="post-desc">{post.attributes.description}</div>
        <div className="author-details">
          <a href="/">
            <span className="avatar-img">
              <img
                src="https://secure.gravatar.com/avatar/1b6126e7eda7d78050b05080b32506b9?s=100&d=mm&r=g"
                width={100}
                height={100}
                alt="Thomas Adams"
                className="avatar"
              />
              <span className="author-name">Thomas Adams</span>
              <span className="post-date">
                {format(parseISO(post.attributes.date), "MMMM dd, yyyy")}
              </span>
            </span>
          </a>
        </div>
      </div>
    </article>
  );
};
