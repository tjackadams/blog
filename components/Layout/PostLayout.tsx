import { FunctionComponent, useEffect, useState } from "react";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { RelatedPostCard } from "../PostCard/index";
import { Post } from "../../pages/Post.types";
import { Footer } from "..";
import Link from "next/link";

interface IPostLayoutProps {
  title: string;
  slug: string;
  allPosts: Post[];
}

export const PostLayout: FunctionComponent<IPostLayoutProps> = ({
  title,
  slug,
  allPosts,
  children,
}) => {
  const [readNext, setReadNext] = useState<Post[]>([]);

  useEffect(() => {
    let index = allPosts.findIndex((p) => p.slug === slug);
    let posts = allPosts.slice(index + 1, 2);

    setReadNext(posts);
  }, [slug, allPosts]);

  return (
    <>
      <nav className="site-header sticky-top">
        <div className="outer site-nav-main">
          <div className="inner">
            <nav className="site-nav">
              <div className="site-nav-left-wrapper">
                <div className="site-nav-left">
                  <div className="site-nav-content">
                    <span className="nav-post-title">
                      <Link href="/" as="/">
                        <a title="Home">{title}</a>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div className="site-nav-right">
                <SocialLinks color="#262626" />
              </div>
            </nav>
          </div>
        </div>
      </nav>
      <div>
        <div className="wrapper">
          <div className="container" tabIndex={-1}>
            <div className="row">
              <div className="col-md content-area">
                <main className="site-main">
                  {children}
                  {!!readNext.length && (
                    <div className="related-postssection">
                      <h5>Read next</h5>
                      <div className="row related-articles">
                        {readNext.map((post, index) => (
                          <RelatedPostCard
                            key={post.attributes.title + index}
                            post={post}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
