/* eslint "no-console": "off" */

const path = require("path");
const kebabCase = require("lodash.kebabcase");
const formatISO = require("date-fns/formatISO");
const parseISO = require("date-fns/parseISO");
const isValid = require("date-fns/isValid");
const isBefore = require("date-fns/isBefore");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = parseISO(node.frontmatter.date);
        if (!isValid(date))
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: formatISO(date) });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const listingPage = path.resolve("./src/templates/listing.jsx");

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              date
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = parseISO(postA.node.frontmatter.date);

    const dateB = parseISO(postB.node.frontmatter.date);

    if (isBefore(dateA, dateB)) return 1;
    if (isBefore(dateB, dateA)) return -1;

    return 0;
  });

  // Paging
  const { postsPerPage } = siteConfig;
  const pageCount = Math.ceil(postsEdges.length / postsPerPage);

  [...Array(pageCount)].forEach((_val, pageNum) => {
    createPage({
      path: pageNum === 0 ? `/` : `/${pageNum + 1}/`,
      component: listingPage,
      context: {
        limit: postsPerPage,
        skip: pageNum * postsPerPage,
        pageCount,
        currentPageNum: pageNum + 1,
      },
    });
  });

  // Post page creating
  postsEdges.forEach((edge, index) => {
    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    });
  });

  //  Create tag pages
  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagPage,
      context: { tag },
    });
  });
};
