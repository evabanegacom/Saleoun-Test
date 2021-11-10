import React, { useEffect, useState } from "react";
import { autoLogin, logout } from '../actions/actions';
import {Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);

  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const StyledDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #003049;
    padding: 15px 0;
    a {
      text-decoration: none;
      color: #fff;
      font-weight: 700;
    }

    p {
      color: #fff;
      font-weight: 700;
    }
  `;


  useEffect(() => {
    dispatch(autoLogin());
  }, [JSON.stringify(user)]);

    return (
        <div>
        {user.loggedIn === false ? (
          <StyledDiv>
          <Link to='/'>Home</Link>
          <Link to='/login'>login</Link>
          <Link to='/signUp'>signup</Link>
          </StyledDiv>
        ) : <StyledDiv>
          <Link to='/'>Home</Link>
        <p>Welcome &nbsp;&nbsp;&nbsp;{user.user.name}</p>
        <Link onClick={handleClick} to='/logout'>Logout</Link>
        </StyledDiv>}
        </div>
    )
}

export default Navbar
