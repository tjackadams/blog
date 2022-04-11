const path = require("path");
const config = require("./data/SiteConfig");

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
    rssMetadata: {
      site_url: config.siteUrl,
      feed_url: config.siteUrl + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${config.siteUrl}/logos/logo-512.png`,
      copyright: config.copyright,
    },
  },
  plugins: [
  ]
};
