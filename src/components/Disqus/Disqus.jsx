import React from "react";
import { DiscussionEmbed } from "disqus-react";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";

const Disqus = (props) => {
  const { postNode } = props;
  if (!config.disqusShortname) {
    return null;
  }
  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, config.pathPrefix, postNode.fields.slug);
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
