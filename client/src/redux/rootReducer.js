import { combineReducers } from 'redux';

import { reducer as filter } from './filter/reducer';
import { reducer as auth } from './auth/reducer';
import { reducer as myProfile } from './my-profile/reducer';

const rootReducer = combineReducers({
    filter,
    auth,
    myProfile,
});

export default rootReducer;