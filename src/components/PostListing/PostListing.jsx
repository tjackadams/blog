import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";

const PostListing = ({ postEdges }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postList = postEdges.map((post) => {
      return {
        path: post.node.fields.slug,
        tags: post.node.frontmatter.tags,
        cover: post.node.frontmatter.cover,
        title: post.node.frontmatter.title,
        date: post.node.fields.date,
        excerpt: post.node.excerpt,
        timeToRead: post.node.timeToRead,
      };
    });

    setPosts(postList);
  }, [postEdges]);

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.title}
          cover={post.cover}
          date={post.date}
          excerpt={post.excerpt}
          path={post.path}
          tags={post.tags}
          title={post.title}
        />
      ))}
    </>
  );
};

export default PostListing;
