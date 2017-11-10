import { combineReducers } from 'redux';
import PlaceReducer from './place_reducer'
import ErrorMsg from './error_reducer'
import { reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  form: formReducer,
  places: PlaceReducer,
  errorMsg: ErrorMsg
});

export default rootReducer;
