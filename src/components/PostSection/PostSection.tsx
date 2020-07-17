import { FunctionComponent, useState } from "react";
import { Post } from "../../types/Post.types";
import { PostCard } from "..";

interface IPostSectionProps {
  posts: Post[];
  showLoadMore: boolean;
  loadMoreTitle: string;
  perPageLimit: number;
}

export const PostSection: FunctionComponent<IPostSectionProps> = ({
  posts,
  showLoadMore,
  loadMoreTitle,
  perPageLimit,
}) => {
  const [limit, setLimit] = useState(12);

  const increaseLimit = () => setLimit(() => limit + perPageLimit);

  let visiblePosts = posts.slice(0, limit || posts.length);

  return (
    <div className="row first-page x-hidden-focus">
      {!!visiblePosts.length && (
        <div className="col-lg-9 col-md-8 col-sm-12 landing-site">
          {visiblePosts.map((post, index) => (
            <PostCard key={post.attributes.title + index} post={post} />
          ))}
          {showLoadMore && visiblePosts.length < posts.length && (
            <nav aria-label="Post navigation">
              <div className="row justify-content-center">
                <button className="btn-lg load-more" onClick={increaseLimit}>
                  {loadMoreTitle}
                </button>
              </div>
            </nav>
          )}
        </div>
      )}
    </div>
  );
};
