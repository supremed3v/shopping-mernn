const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "PRODUCT_DETAILS":
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case "API_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default ProductReducer;
