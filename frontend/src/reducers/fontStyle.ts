import { ActionTypes, TypeKeys } from '../actions'

export default (state = 'monospaced', action: ActionTypes) => {
  switch (action.type) {
  case TypeKeys.SET_MONOSPACE:
    return action.monospace ? 'monospaced' : 'proportional'
  default:
    return state
  }
}
