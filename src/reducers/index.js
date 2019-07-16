import { combineReducers } from 'redux';
import currentResult from './result';
import currentState from './state';
import currentRecipe from './recipe';

export default combineReducers({
  currentResult,
  currentState,
  currentRecipe
})
