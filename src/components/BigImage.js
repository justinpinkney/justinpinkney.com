
import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { CRS } from 'leaflet'

export default class BigImage extends Component {
  render() {
    let { options } = this.props
    const mapClassName = "bigimage"

    if (typeof window !== 'undefined') {
      options.crs = CRS.Simple
      return (
        <div className={mapClassName} style={{height:"500px"}}>
          <Map {...options}>
            <TileLayer
              url={this.props.tile_url}
            />
          </Map>
        </div>
    )
    }
    return null
  }
}
