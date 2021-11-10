const initialState = {
    students: [],
    error: null,
    waiting: 'wait for it',
  };
  
  const studentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_RECORD':
        return {
          ...state,
          students: action.payload,
          error: null,
          waiting: 'here we are',
        };
  
      default:
        return state;
    }
  };
  
  export default studentReducer;