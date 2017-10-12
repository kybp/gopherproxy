import { ActionTypes, TypeKeys } from '../actions'
import IItem, { ItemTypes } from '../item'

const initialState: IItem = {
  data: [],
  description: '',
  host: 'gopher.floodgap.com',
  port: 70,
  selector: '',
  type: ItemTypes.DIRECTORY,
}

export default (state = initialState, action: ActionTypes) => {
  switch (action.type) {
  case TypeKeys.SET_CURRENT_ITEM:
    return action.item
  default:
    return state
  }
}
