import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const StreamIndex = ({ data, location }) => {
  const ims = data.allFlickrPhoto.nodes

  return (
    <Layout location={location} title="The Stream">
      <div className="content" 
        style={{display:"grid", 
                gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))",
                columnGap:"10px",
                rowGap:"10px"}}>
        { ims.map(( node ) => {
          return (
              <div style={{ width: "100%" }}>
                <Link to={"stream/" + node.id}>
                  <img src={node.url_q}
                      alt="" />
                </Link>
              </div>
          )
        }
      ) }
      </div>
    </Layout>
  )
}

export default StreamIndex

export const pageQuery = graphql`
    query StreamQuery {
      allFlickrPhoto(sort: {fields: dateupload, order: DESC}) {
        nodes {
          id
          url_q
          dateupload_date
          title
          tags
        }
      }
    }  
`
