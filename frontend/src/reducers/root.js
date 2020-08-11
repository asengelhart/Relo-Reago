import { combineReducers } from 'redux';
import TranslationsReducer from './translations';
import DescriptionsReducer from './descriptions';
import UsersReducer from './users'

const RootReducer = combineReducers({
  translations: TranslationsReducer,
  descriptions: DescriptionsReducer,
  user: UsersReducer
});

export default RootReducer;