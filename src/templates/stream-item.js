import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const StreamItemTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const twitter = data.site.siteMetadata.social.twitter
  const { previous, next } = pageContext

  let content

  if (data.streamJson.type === "image") {
    content = <Img 
                fluid={data.streamJson.image.childImageSharp.fluid}
                alt="" />
  } else if (data.streamJson.type === "video") {
    content = <video controls src={data.streamJson.remote_path} />
  }

  return (
    <Layout location={location} title={siteTitle}>
      <article>
        {content}
      </article>


      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={"stream/" + previous.id} rel="prev">
                previous
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"stream/" + next.id} rel="next">
                next
              </Link>
            )}
          </li>
        </ul>
      </nav>

    </Layout>
  )
}

export default StreamItemTemplate

export const itemQuery = graphql`
  query StreamItemById($id: String!) {
    site {
      siteMetadata {
        title
        social {
          twitter
        }
      }
    }
    streamJson(id: { eq: $id }) {
      id
      remote_path
      type
      image {
        childImageSharp {
          fluid(maxWidth: 800) {...GatsbyImageSharpFluid}
        }
      }
    }
  }
`
