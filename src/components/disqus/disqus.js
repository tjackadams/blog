import { DiscussionEmbed } from "disqus-react";
import React from "react";
import config from "../../../data/SiteConfig";

const Disqus = (props) => {
  const { postNode } = props;
  if (!config.disqusShortname) {
    return null;
  }
  const post = postNode.frontmatter;
  const url = new URL(postNode.fields.slug, config.siteUrl).toString();
  const categoryID = post.category_id || null;
  return (
    <DiscussionEmbed
      shortname={config.disqusShortname}
      config={{
        url: url,
        identifier: post.title,
        title: post.title,
        categoryID: categoryID,
      }}
    />
  );
};

export default Disqus;
