
import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import {CRS} from 'leaflet'

export default class BigImage extends Component {
  render() {
    let { options } = this.props
    const mapClassName = "bigimage"
    options.crs = CRS.Simple
    
    if (typeof window !== 'undefined') {
      return (
        <div className={mapClassName} style={{height:"500px"}}>
          <Map {...options}>
            <TileLayer
              url="http://assets.justinpinkney.com/sandbox/sumie1/montage_files/{z}/{x}_{y}.jpg"
            />
          </Map>
        </div>
    )
    }
    return null
  }
}