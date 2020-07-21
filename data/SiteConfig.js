const now = new Date();

const config = {
  siteTitle: "tjackadams blog", // Site title.
  siteTitleShort: "tjackadams blog", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "tjackadams blog", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://blog.itadams.co.uk", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription:
    "My personal blog. I figured it was better to start writing things down rather than forgetting them later. Maybe you'll find it useful.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteRssTitle: "tjackadams blog RSS feed", // Title of the RSS feed
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-173137269-1", // GA tracking ID.
  disqusShortname: "", // Disqus shortname.
  dateFromFormat: "MMMM Do, YYYY", // Date format used in the frontmatter.
  dateFormat: "MMMM do, yyyy", // Date format for display.
  dateShortFormat: "MMM dd, yyyy",
  dateMiniFormat: "dd/MM/yy",
  postsPerPage: 6, // Amount of posts displayed per listing page.
  userName: "Thomas Adams", // Username to display in the author segment.
  userEmail: "", // Email used for RSS feed's author segment
  userTwitter: "tjackadams", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "", // User location to display in the author segment.
  userAvatar: "", // User avatar to display in the author segment.
  userDescription: "", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [],
  copyright: `Copyright © ${now.getFullYear()}. tjackadams`, // Copyright string for the footer of the website and RSS feed.
  themeColor: "#005da6;", // Used for setting manifest and progress theme colors.
  backgroundColor: "#f4f4f4;", // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
