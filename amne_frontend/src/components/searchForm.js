import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { fetchAddress, showError } from '../actions/index.js'

class NavForm extends Component {
  componentDidMount(){
    var options = {
      componentRestrictions: {country: 'us'}
    };
    
    const auto1 = new google.maps.places.Autocomplete(this.refs.input1, options)
    const auto2 = new google.maps.places.Autocomplete(this.refs.input2, options)
    auto1.addListener('place_changed', () => {
      this.props.fields.addr_one.onChange(auto1.getPlace().formatted_address)
    })
    auto2.addListener('place_changed', () => {
      this.props.fields.addr_two.onChange(auto2.getPlace().formatted_address)
    })
  }
  onSubmit(props) {
    this.props.fetchAddress(props)
    this.props.showError('')
  }

  render() {
    const { fields: { addr_one, addr_two }, handleSubmit } = this.props;

    return (
      <form className="form-inline my-2 my-lg-2" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <input type="text" 
            className={`form-control mr-sm-2 ${addr_one.touched && addr_one.invalid ? 'is-invalid' : ''}`} 
            type="search" 
            placeholder= {addr_one.touched ? addr_one.error : 'Address One'}
            aria-label="Search" 
            ref="input1"
            {...addr_one} />
        </div>

        <div>
          <input type="text" 
            className={`form-control w-80 mr-sm-2 ${addr_two.touched && addr_two.invalid ? 'is-invalid' : ''}`}
            type="search" 
            placeholder={addr_two.touched ? addr_two.error : 'Address Two'} 
            aria-label="Search"
            ref="input2" 
            {...addr_two} />
        </div>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.addr_one) {
    errors.addr_one = 'Missing Address one!!';
  }
  if (!values.addr_two) {
    errors.addr_two = 'Missing Address two!!';
  }

  return errors;
}

export default reduxForm({
  form: 'SearchForm',
  fields: ['addr_one', 'addr_two'],
  validate
}, null, { fetchAddress,showError })(NavForm);