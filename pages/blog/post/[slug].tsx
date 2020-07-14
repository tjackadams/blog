import { FunctionComponent } from "react";
import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import { PostLayout } from "../../../components/Layout/PostLayout";
import { Post as BlogPost } from "./Post.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPostProps {
  blogpost: BlogPost;
}

const Post: FunctionComponent<IPostProps> = ({ blogpost }) => {
  if (!blogpost) return <div>not found</div>;

  const { html, attributes } = blogpost;

  return (
    <PostLayout>
      <article>
        <div className="row justify-content-center postcontent x-hidden-focus">
          <div className="entry-content col-12">
            <h1 className="entry-title">{attributes.title}</h1>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div style={{ margin: "20px 0", textAlign: "center" }}>
                  <img
                    src="https://secure.gravatar.com/avatar/1b6126e7eda7d78050b05080b32506b9?s=58&d=mm&r=g"
                    width="58"
                    height="58"
                    alt="Avatar"
                    className="avatar"
                  />
                  <p style={{ fontSize: "20px" }}>Thomas</p>
                </div>
              </div>
            </div>
            <div style={{ clear: "both", paddingBottom: "10px" }}></div>
            <div
              style={{ marginTop: "-24px", marginBottom: "28px" }}
              className="entry-meta"
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#616161",
                }}
              >
                {format(parseISO(attributes.date), "MMMM dd, yyyy")}
              </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <div className="row justify-content-center"></div>
            <div style={{ clear: "both", paddingBottom: "10px" }}></div>
            <div
              className="authorinfoarea"
              style={{
                margin: "30px 0",
                padding: "24px 0",
                borderTop: "1px #A6A6A6 solid",
              }}
            >
              <div
                className="post-authoravatar"
                style={{ float: "left", marginRight: "20px" }}
              >
                <img
                  src="https://secure.gravatar.com/avatar/1b6126e7eda7d78050b05080b32506b9?s=96&d=mm&r=g"
                  width={96}
                  height={96}
                  alt="Avatar"
                  className="avatar avatar-96 wp-user-avatar wp-user-avatar-96 photo avatar-default"
                />
              </div>
              <h5 className="post-authorname">
                <a className="no-underline" aria-label="Thomas Adams" href="/">
                  Thomas Adams
                </a>
              </h5>
              <div>
                <p>Software Developer</p>
                <p>
                  <strong>Follow </strong>
                  <a
                    className="no-underline stayinformed"
                    aria-label="Thomas Adams GitHub profile"
                    target="_blank"
                    href="https://github.com/tjackadams"
                  >
                    <FontAwesomeIcon icon={["fab", "github"]} />
                  </a>
                </p>
                <div style={{ clear: "both" }} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </PostLayout>
  );
};

export async function getStaticPaths() {
  const paths = fs
    .readdirSync(path.join(process.cwd(), "content/blogPosts"))
    .map((blogName) => {
      const trimmedName = blogName.substring(0, blogName.length - 3);
      return {
        params: { slug: trimmedName },
      };
    });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const blogpost = await import(`../../../content/blogPosts/${slug}.md`).catch(
    () => null
  );

  return {
    props: {
      blogpost: blogpost.default,
    },
  };
};

export default Post;
