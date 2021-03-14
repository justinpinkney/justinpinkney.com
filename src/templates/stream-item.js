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
  // const similar = data.flickrPhoto.similar

  let content

  // if (data.flickrPhoto.media === "photo") {
    
  const size_data = [
    [data.flickrPhoto.width_n, data.flickrPhoto.url_n],
    [data.flickrPhoto.width_m, data.flickrPhoto.url_m],
    [data.flickrPhoto.width_z, data.flickrPhoto.url_z],
    [data.flickrPhoto.width_c, data.flickrPhoto.url_c],
    [data.flickrPhoto.width_l, data.flickrPhoto.url_l],
  ]

  let srcset = size_data.map(x => `${x[1]} ${x[0]}w`).join(', ')
  let sizes = size_data.map(x => `(max-width: ${x[0]}px) ${x[0]}px`).join(', ')


  content = <> 
              <h1>{data.flickrPhoto.title}</h1>
              <img 
                srcSet={srcset}
                sizes={sizes}
                alt="" />
              <p
                dangerouslySetInnerHTML={{
                  __html: data.flickrPhoto.description,
                }}
              />
              <ul>
                <li>Tags: {data.flickrPhoto.tags}</li>
                <li>Date: {data.flickrPhoto.datetaken}</li>
                <li><a href={"https://www.flickr.com/photos/42255449@N00/" + data.flickrPhoto.photo_id}>On Flickr</a></li>
              </ul>
            </>
  // }

  return (
    <Layout location={location} title={siteTitle}>
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
    site {
      siteMetadata {
        title
        social {
          twitter
        }
      }
    }
    flickrPhoto(id: {eq: $id}) {
      id
      photo_id
      datetaken
      description
      title
      tags
      media
      width_n
      width_m
      width_z
      width_c
      width_l
      url_n
      url_m
      url_z
      url_c
      url_l
    }
  }
`
