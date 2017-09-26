import { ActionTypes, TypeKeys } from '../actions'

export default (state = 'monospaced', action: ActionTypes) => {
  switch (action.type) {
  case TypeKeys.TOGGLE_FONT_STYLE:
    return state === 'monospaced' ? 'proportional' : 'monospaced'
  default:
    return state
  }
}
