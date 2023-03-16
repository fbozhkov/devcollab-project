import { combineReducers } from 'redux';

import { reducer as filter } from './filter/reducer';

const rootReducer = combineReducers({
    filter,
});

export default rootReducer;