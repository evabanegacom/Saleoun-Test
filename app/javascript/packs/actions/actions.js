import axios from 'axios';

export const logout = () => ({ type: "LOG_OUT" });

const setUser = data => ({
    type: "SET_USER",
    payload: data,
});

export const signUserUp = (userInfo) => async (dispatch) => {
    await fetch("api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {console.log(data)
        localStorage.setItem("token", (data.token));
        dispatch(setUser(data));
      });
  };

  export const fetchUser = (userInfo) => async (dispatch) => {
    await fetch("api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {console.log(data)
        localStorage.setItem("token", (data.token));
        dispatch(setUser(data));
      });
  };

  export const autoLogin = () => async dispatch => {
    await fetch('api/v1/auto_login', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        dispatch(setUser(data));
      });
  };

// CREATE STUDENT RECORDS

const createStudent = data => ({
  type: "CREATE_RECORD",
  payload: data,
});

export const createStudents = studentInfo => async dispatch => {
  await axios.post('api/v1/students', studentInfo, {
    headers: {
      'content-type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
    .then((data) =>{ console.log(data)
      dispatch(createStudent(data))
    }
    );
};

export const getStudents = () => async dispatch => {
  await fetch('api/v1/students', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      dispatch(createStudent(data));
    });
};