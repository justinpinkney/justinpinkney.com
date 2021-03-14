import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Footer from "./footer.js"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  let nav = (
    <nav>
      <Link to="stream">
        Stream
      </Link>
    </nav>
  )

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(30),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        {header}
        {nav}
        </div>
      </header>
      <main
        style={{
          marginBottom: rhythm(1),
        }}>
          {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
