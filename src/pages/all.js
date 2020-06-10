// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <h1>All posts</h1>

      <ul>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        
        return (
              <li key={node.fields.slug}>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description,
                }}
              />
              </li>
          
        )
      })}
      </ul>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            cover {
              childImageSharp {
                fluid(maxWidth: 630) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
