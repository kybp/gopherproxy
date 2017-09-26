import { ActionTypes, TypeKeys } from '../actions'

export default (state = '', action: ActionTypes) => {
  switch (action.type) {
  case TypeKeys.SET_TEXT_FILE:
    return action.body
  default:
    return state
  }
}
