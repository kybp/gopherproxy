import { ActionTypes, TypeKeys } from '../actions'

export default (state = false, action: ActionTypes) => {
  switch (action.type) {
  case TypeKeys.START_LOADING_ITEMS:
    return true
  case TypeKeys.FINISH_LOADING_ITEMS:
    return false
  default:
    return state
  }
}
