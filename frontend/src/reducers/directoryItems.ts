import { ActionTypes, TypeKeys } from '../actions'
import IItem from '../item'

interface IState {
  items: IItem[]
  loading: boolean
}

const defaultState: IState = {
  items: [],
  loading: false,
}

export default (state = defaultState, action: ActionTypes) => {
  switch (action.type) {
  case TypeKeys.SET_DIRECTORY_ITEMS:
    return { ...state, items: action.items }
  case TypeKeys.START_LOADING_ITEMS:
    return { ...state, loading: true }
  case TypeKeys.FINISH_LOADING_ITEMS:
    return { ...state, loading: false }
  default:
    return state
  }
}
