import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {Link, useHistory } from 'react-router-dom';
import styled from "styled-components";

const Home = () => {
    const user = useSelector((state) => state.user);
    
    const StyledDiv = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `;
    return (
        <StyledDiv>
            <p>Welcome to student records</p>
            {user.loggedIn && (
              <p>
                  <Link to='/students'>Submit student record</Link>
              </p>
            )}
        </StyledDiv>
    )
}

export default Home
