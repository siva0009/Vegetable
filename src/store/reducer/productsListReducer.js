import * as actionTypes from "../actions/actionTypes/productsListTypes";

const initialState = {
  loading: true,
  vegetables: [],
  chatGPTSuggestion: ''
};

const productsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VEGETABLE_LIST_REQUEST:
      return { ...state,loading: true };
    case actionTypes.VEGETABLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        vegetables: action.payload
      };
    case actionTypes.VEGETABLE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actionTypes.CHAT_GPT_SUGGESTION:
        return {
          ...state,
          chatGPTSuggestion: action.payload
        };
    default:
      return state;
  }
};

export const searchFilterReducer = (state = "", action) => {
  switch (action.type) {
    case actionTypes.VEGETABLE_FILTER_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default productsListReducer;
