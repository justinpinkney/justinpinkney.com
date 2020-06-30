import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const StreamIndex = ({ data, location }) => {
  const ims = data.allStreamJson.nodes

  return (
    <Layout location={location} title="gd">
      <div class="content" 
        style={{display:"grid", 
                gridTemplateColumns:"1fr 1fr 1fr",
                columnGap:"10px",
                rowGap:"10px"}}>
        { ims.map(( node ) => {
          return (
              <div style={{ width: "100%" }}>
                  <Img 
                      fluid={node.image.childImageSharp.fluid}
                      alt="" />
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
        allStreamJson {
            nodes {
                path
                id
                image {
                  childImageSharp {
                    fluid(maxWidth: 600, maxHeight: 600) {...GatsbyImageSharpFluid}
                    }
                }
            }
        }
    }  
`
