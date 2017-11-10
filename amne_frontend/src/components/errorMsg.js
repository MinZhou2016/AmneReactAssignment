import React, { Component } from 'react'
import { connect } from 'react-redux'

class ErrorMessage extends Component{
    render(){
      if (this.props.error != ''){
        return (
          <div className="alert alert-warning container" role="alert">
              {this.props.error}
          </div>
        )
      }else {
        return <div></div>
      }
    }
}

export default connect(
  (state) => {
    return {
      error: state.errorMsg.error
    }
  }
)(ErrorMessage)