import { combineReducers } from 'redux'
import { ActionTypes, TypeKeys } from './actions'
import IItem from './item'

interface IDirectoryState {
  items: IItem[]
  loading: boolean
}

const defaultState: IDirectoryState = {
  items: [],
  loading: false,
}

const directoryItems = (state = defaultState, action: ActionTypes) => {
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

const fontStyle = (state = 'monospaced', action: ActionTypes) => {
  switch (action.type) {
  case TypeKeys.TOGGLE_FONT_STYLE:
    return state === 'monospaced' ? 'proportional' : 'monospaced'
  default:
    return state
  }
}

export default combineReducers({ directoryItems, fontStyle })
