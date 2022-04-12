import { DiscussionEmbed } from "disqus-react";
import React from "react";
import config from "../../../data/SiteConfig";

const Disqus = ({ postNode }) => {
  if (!config.disqusShortname) {
    return null;
  }
  const post = postNode.frontmatter;
  const url = new URL(postNode.fields.slug, config.siteUrl).toString();
  return (
    <DiscussionEmbed
      shortname={config.disqusShortname}
      config={{
        url: url,
        identifier: post.title,
        title: post.title,
      }}
    />
  );
};

export default Disqus;
