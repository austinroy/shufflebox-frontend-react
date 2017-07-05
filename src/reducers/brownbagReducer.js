import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function brownbagReducer( state=initialState.brownbag_next_presenter, action) {
  switch (action.type) {
    case types.BROWNBAG_NEXT_INLINE:
      return action.nextPresenter;

    default:
      return state;  
  }
}