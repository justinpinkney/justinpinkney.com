import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const StreamItemTemplate = ({ data, pageContext, location }) => {
  // const siteTitle = data.site.siteMetadata.title
  // const twitter = data.site.siteMetadata.social.twitter
  const { previous, next } = pageContext
  // const similar = data.flickrPhoto.similar

  let content

  // if (data.flickrPhoto.media === "photo") {
    content = <img 
                src={data.flickrPhoto.url_m}
                alt="" />
  // }

  return (
    <Layout location={location} title="test">
      <article>
        {content}
      </article>

      {/* <div id="similar" style={{display:"flex", height: "100px"}} >
          
          {similar.map((node) => {
            return <div style={{ width: "100%" }}>
              <Link to={"stream/" + node.name}>
                <Img 
                fluid={node.childImageSharp.fluid} />
              </Link>
        </div>
          })}
      </div> */}

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
    flickrPhoto(id: {eq: $id}) {
      id
      dateupload_date
      description
      url_m
      title
      tags
      media
    }
  }
`
