import { combineReducers } from 'redux';

import { reducer as filter } from './filter/reducer';
import { reducer as auth } from './auth/reducer';

const rootReducer = combineReducers({
    filter,
    auth,
});

export default rootReducer;