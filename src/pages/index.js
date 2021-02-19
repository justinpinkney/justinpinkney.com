// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Start from "../components/start"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Start />
      <h3>Most recently updated pages:</h3>
      {posts.map(({ node }) => {
        let title = node.frontmatter.title || node.fields.slug
        let draft = ""
        if (node.frontmatter.draft) {
          draft = "(draft) -- "
        }
        let cover =  node.frontmatter.cover
        let coverBit 
        if (cover) {
          coverBit = <Img fluid={{...cover.childImageSharp.fluid, aspectRatio: 6}} />
        } else {
          coverBit = null
        }
        
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1/8),
                }}
              >
                <i>{draft}</i><Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
            </header>
            <section>
              <p style={{
                  marginBottom: rhythm(1 / 4),
                }}
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {coverBit}
              </Link>
              
            </section>
          </article>
        )
      })}
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
            draft
            cover {
              childImageSharp {
                fluid(maxWidth: 800) {
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
