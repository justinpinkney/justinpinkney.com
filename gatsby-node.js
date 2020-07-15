const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const streamItem = path.resolve(`./src/templates/stream-item.js`)
  const result = await graphql(
    `
      {
        blog: allMdx(sort: {fields: [frontmatter___date], order: DESC}, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        },
      
        stream: allStreamJson(sort: {fields: [date], order: DESC}, limit: 1000) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
    )

    if (result.errors) {
      throw result.errors
    }
  
      // Create blog posts pages.
    const posts = result.data.blog.edges

      posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      })

      // Create stream items
      // Create blog posts pages.
      const streamPosts = result.data.stream.edges

      streamPosts.forEach((post, index) => {
        const previous = index === streamPosts.length - 1 ? null : streamPosts[index + 1].node
        const next = index === 0 ? null : streamPosts[index - 1].node

        createPage({
          path: "stream/" + post.node.id,
          component: streamItem,
          context: {
            id: post.node.id,
            previous,
            next,
          },
        })
      })

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.type === `StreamJson`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
