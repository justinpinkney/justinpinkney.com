import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const StreamIndex = ({ data, location }) => {
  const ims = data.allFlickrPhoto.nodes

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <h1>Stream</h1>
      <div className="content" 
        style={{display:"grid", 
                gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))",
                columnGap:"10px",
                rowGap:"10px"}}>
        { ims.map(( node ) => {
          return (
                <Link to={"stream/" + node.id}>
                  <img src={node.url_q} style={{marginBottom:"0"}}/>
                </Link>
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
      site {
        siteMetadata {
          title
          social {
            twitter
          }
        }
      }
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
