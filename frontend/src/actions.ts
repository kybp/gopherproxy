import axios from 'axios'
import IItem, { ItemTypes } from './item'

export enum TypeKeys {
  SET_CURRENT_ITEM = 'SET_CURRENT_ITEM',
  START_LOADING_ITEMS = 'START_LOADING_ITEMS',
  FINISH_LOADING_ITEMS = 'FINISH_LOADING_ITEMS',
  SET_MONOSPACE = 'SET_MONOSPACE',
}

export type ActionTypes =
  | ISetCurrentItemAction
  | IStartLoadingAction
  | IFinishLoadingAction
  | ISetMonospaceAction

export interface ISetCurrentItemAction {
  item: IItem
  type: TypeKeys.SET_CURRENT_ITEM
}

export const setCurrentItem = (item: IItem): ISetCurrentItemAction => ({
  item,
  type: TypeKeys.SET_CURRENT_ITEM,
})

export interface IStartLoadingAction {
  type: TypeKeys.START_LOADING_ITEMS
}

export const startLoading = (): IStartLoadingAction => ({
  type: TypeKeys.START_LOADING_ITEMS,
})

export interface IFinishLoadingAction {
  type: TypeKeys.FINISH_LOADING_ITEMS,
}

export const finishLoading = (): IFinishLoadingAction => ({
  type: TypeKeys.FINISH_LOADING_ITEMS,
})

export interface ISetMonospaceAction {
  monospace: boolean
  type: TypeKeys.SET_MONOSPACE
}

export const setMonospace = (monospace: boolean): ISetMonospaceAction => ({
  monospace,
  type: TypeKeys.SET_MONOSPACE,
})

export const selectItem = (dispatch: any, item: IItem) => {
  dispatch(startLoading())

  axios.get('http://127.0.0.1:8080/api/', { params: item })
    .then(({ data }: { data: any }) => {
      dispatch(setCurrentItem(data as IItem))
      dispatch(finishLoading())
    }).catch((error) => alert(error))
}
