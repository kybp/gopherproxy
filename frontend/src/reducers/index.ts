import { combineReducers } from 'redux'
import currentItemType from './currentItemType'
import directoryItems from './directoryItems'
import fontStyle from './fontStyle'
import textFile from './textFile'

export default combineReducers({
  currentItemType,
  directoryItems,
  fontStyle,
  textFile,
})
