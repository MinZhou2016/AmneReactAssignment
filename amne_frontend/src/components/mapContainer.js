import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMap from './map'

class MapContainer extends Component{
  render(){
    return (
      <div>
          <GoogleMap estates = {this.props.estates} locations = {this.props.input_addres} />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      estates: state.places.estates,
      input_addres: state.places.input_addres
    }
  }
)(MapContainer)