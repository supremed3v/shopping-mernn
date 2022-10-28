const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        loading: true,
        user: null,
      };
    case "LOGIN":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    case "USER_INFO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_INFO_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case "USER_INFO_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
      };
    case "SIGNUP_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
  }
};

export default userReducer;
