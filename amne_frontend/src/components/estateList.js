import React, { Component } from 'react'
import { connect } from 'react-redux'

class EstateList extends Component{
  render(){
    return (
      <div>
        <h4>Real Estate List</h4>
        {
          this.props.estates.length > 0?
              <div className="list-group" style={{height: '650px',overflow: 'auto'}}>
                {
                  this.props.estates.map((e, index)=> 
                    <div className="list-group-item" key={e.name}>
                        <h6 className="float-left">{e.name}</h6>
                        <span className="badge badge-primary badge-pill float-right">{index + 1}</span>
                    </div>
                  )
                }
              </div>
          : <div>Input Address To Get Estate List</div>
        }
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      estates: state.places.estates
    }
  }
)(EstateList)