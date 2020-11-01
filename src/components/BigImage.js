
import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { CRS } from 'leaflet'
import FullscreenControl from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/dist/styles.css'
import 'leaflet-edgebuffer'

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
              edgeBufferTiles={1}
            />
            <FullscreenControl position="topleft" />
          </Map>
        </div>
    )
    }
    return null
  }
}
