import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/actions';
import styled from "styled-components";

class Login extends Component {
   constructor(props){
       super(props)

       this.state = {
          email: '',
          password: '',
       }
   }

   handleChange = e =>{
       this.setState({
           [e.target.id]: e.target.value
       })
   }

   handleSubmit = e =>{
       e.preventDefault()
       this.props.getUser(this.state)
       console.log(this.state)
       this.props.history.push('/students')
   }

    render() {
        return (
            <div style={{marginTop: '30px', display: 'flex', justifyContent: 'center'}}>
              <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50%'}}>
                <input onChange={this.handleChange} type='email' id='email' placeholder='Email' />
                <input onChange={this.handleChange} type='password' id='password' placeholder='password' />
                <button type='submit'>Login</button>
              </form>
            </div>
        )
    }
}

  const mapDispatchToProps = dispatch => ({
    getUser: userInfo => dispatch(fetchUser(userInfo))
  })

export default connect(null, mapDispatchToProps)(Login)