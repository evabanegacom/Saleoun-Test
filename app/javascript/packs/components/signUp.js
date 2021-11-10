import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUserUp } from '../actions/actions';

class SignUp extends Component {
   constructor(props){
       super(props)

       this.state = {
          name: '',
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
       this.props.register(this.state)
       console.log(this.state)
       this.props.history.push('/students')
   }

    render() {
        return (
            <div style={{marginTop: '30px', display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50%'}}>
                <input onChange={this.handleChange} type='text' id='name' placeholder='Name' />
                <input onChange={this.handleChange} type='text' id='email' placeholder='Email' />
                <input onChange={this.handleChange} type='password' id='password' placeholder='password' />
                <button type='submit'>SignUp</button>
            </form>
            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     products: state.products.products,
//     user: state.user.user
//   })

  const mapDispatchToProps = dispatch => ({
    register: userInfo => dispatch(signUserUp(userInfo))
  })

export default connect(null, mapDispatchToProps)(SignUp)