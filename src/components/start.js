import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Start = () => {
  const data = useStaticQuery(graphql`
    query StartQuery {
        markdownRemark(frontmatter: {title: {eq: "Hello 👋"}}) {
        html
        }
    }
  `)

  return (
    <div
      style={{
        display: `flex`,
      }}
    >
        <section id="start" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </div>
  )
}

export default Start
