import { ActionTypes, TypeKeys } from './actions'

interface IDirectoryState {
  items: string[]
  loading: boolean
}

const defaultState: IDirectoryState = {
  items: ['item 1', 'item 2', 'item 3'],
  loading: false,
}

const directoryItems = (state = defaultState, action: ActionTypes) => {
  switch (action.type) {
  case TypeKeys.SET_DIRECTORY_ITEMS:
    return { items: action.items, ...state }
  case TypeKeys.START_LOADING_ITEMS:
    return { loading: true, ...state }
  case TypeKeys.FINISH_LOADING_ITEMS:
    return { loading: false, ...state }
  default:
    return state
  }
}

export default directoryItems
