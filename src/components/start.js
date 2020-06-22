import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Start = () => {
  const data = useStaticQuery(graphql`
    query StartQuery {
        mdx(frontmatter: {title: {eq: "Hello 👋"}}) {
          body
        }
    }
  `)

  return (
    <div>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </div>
  )
}

export default Start
