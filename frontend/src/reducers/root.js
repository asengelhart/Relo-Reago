import { combineReducers } from 'redux';
import TranslationsReducer from './translations';
import DescriptionsReducer from './descriptions';

const RootReducer = combineReducers({
  translations: TranslationsReducer,
  descriptions: DescriptionsReducer
});

export default RootReducer;