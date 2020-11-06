
import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class StructuredData extends Component {
  render() {

    let structuredJSON = `{
      "@context":"https://schema.org/",
      "@type":"Dataset",
      "name":"Aligned Ukiyo-e faces",
      "description":"A dataset of thousands of high resolution aligned faces from uikyo-e prints",
      "url":"https://www.justinpinkney.com/ukiyoe-dataset",
      "license" : "https://creativecommons.org/licenses/by-sa/4.0/",
      "creator":{
         "@type":"Person",
         "url": "https://www.justinpinkney.com/",
         "givenName": "Justin",
         "familyName": "Pinkney",
         "name":"Justin Pinkney"
      }
    }`

    return <Helmet>
        <script className='structured-data-list' type="application/ld+json">{structuredJSON}</script>
    </Helmet>
  }
}
