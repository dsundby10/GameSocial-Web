import {
  FOLLOWING_REQUEST, FOLLOWING_ERROR, FOLLOWING_GET_SUCCESS, FOLLOWING_DELETE_SUCCESS
} from '../actions/action.following';

const initialState = {
  loading: false,
  error: null,
  data: []
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (FOLLOWING_REQUEST):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(FOLLOWING_GET_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: false
      });
    case(FOLLOWING_DELETE_SUCCESS):
      return Object.assign({}, state, {
        data: [],
        error: null,
        loading: false
      });
    case(FOLLOWING_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}