import React, { Component } from 'react'

class GoogleMap extends Component{
  shouldComponentUpdate(nextProps, nextState){
    if (this.props.estates !== nextProps.estates || 
        this.props.locations !== nextProps.locations) {
            return true
    }else {
        return false
    }
  }
  componentDidMount(){
    const map = new google.maps.Map(this.refs.map, {
      zoom: 11,
      center: {lat: 30.3261097, lng: -97.7340004}
    })
  }
  componentDidUpdate(){
    const map = new google.maps.Map(this.refs.map, {
      zoom: 11,
      center: this.props.locations[0]
    });
    this.props.estates.map((e,index) => {
      let infowindow = new google.maps.InfoWindow({
          content: `<h4>Ranking: ${index} </h4>` + 
                    ` <p>EstateName:  ${e.name}</p>`
      });
      let marker = new google.maps.Marker({
          position: e.location,
          map: map,
      });
      marker.addListener('click', () => {
          infowindow.open(map, marker)
      })
    })
    this.props.locations.map(e => {
      new google.maps.Marker({
          position: e,
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
    })
  }
  render(){
    return <div ref="map" style={{width: '100%',height: '700px'}}/>
  }
}
export default GoogleMap