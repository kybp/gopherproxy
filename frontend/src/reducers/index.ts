import { combineReducers } from 'redux'
import currentItem from './currentItem'
import fontStyle from './fontStyle'
import loading from './loading'

export default combineReducers({ currentItem, fontStyle, loading })
