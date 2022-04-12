const config = require("./data/SiteConfig");

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-plugin-next-seo",
      options: {
        description: config.siteDescription,
        language: "en-GB",
        titleTemplate: `%s | ${config.siteTitle}`,
        title: "home",
        openGraph: {
          type: "blog",
          url: config.siteUrl,
          site_name: config.siteTitle,
        },
        twitter: {
          handle: config.twitterHandle,
          cardType: "summary",
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/`,
      },
    },
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-S14YL6K5R1",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.png",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              gistCssUrlAddress:
                "https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css",
              gistCssPreload: true,
            },
          },
          {
            resolve: "gatsby-remark-relative-images",
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 690,
              withWebp: true,
              quality: 80,
            },
          },
          "gatsby-remark-autolink-headers",
          "gatsby-remark-prismjs",
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
        {
          site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  categories: edge.node.frontmatter.tags,
                  custom_elements: [
                    { "content:encoded": edge.node.html },
                    { author: config.userEmail },
                  ],
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                });
              });
            },
            query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: config.siteRssTitle,
          },
        ],
      },
    },
  ],
};
