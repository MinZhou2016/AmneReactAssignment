import React, { Component } from 'react';
import SearchForm from './searchForm'
import MapContainer from './mapContainer'
import EstateList from './estateList'
import ErrorMessage from './errorMsg'

export default class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light justify-content-between">
          <a className="navbar-brand">Amne</a>
          <SearchForm />
        </nav>
        <ErrorMessage />
        <div className = "container" style={{position: 'relative', top: '20px'}}>
          <div className = "row">
            <div className="col-3">
              <EstateList />
            </div>
            <div className="col-9">
              <MapContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
