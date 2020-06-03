import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  
  return (
    <footer>
        © {new Date().getFullYear()}, {data.site.siteMetadata.author.name}
    </footer>  )
}

export default Footer
