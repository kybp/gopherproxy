import { ActionTypes, TypeKeys } from '../actions'
import { ItemTypes } from '../item'

export default (state = ItemTypes.DIRECTORY, action: ActionTypes) => {
  switch (action.type) {
  case TypeKeys.SET_DIRECTORY_ITEMS:
    return ItemTypes.DIRECTORY
  case TypeKeys.SET_TEXT_FILE:
    return ItemTypes.TEXT_FILE
  default:
    return state
  }
}
