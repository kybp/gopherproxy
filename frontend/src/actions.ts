import IItem from './item'

export enum TypeKeys {
  SET_DIRECTORY_ITEMS = 'SET_DIRECTORY_ITEMS',
  START_LOADING_ITEMS = 'START_LOADING_ITEMS',
  FINISH_LOADING_ITEMS = 'FINISH_LOADING_ITEMS',
  TOGGLE_FONT_STYLE = 'TOGGLE_FONT_STYLE',
}

export type ActionTypes =
  | ISetDirectoryItemsAction
  | IStartLoadingItemsAction
  | IFinishLoadingItemsAction
  | IToggleFontStyleAction

export interface ISetDirectoryItemsAction {
  items: IItem[]
  type: TypeKeys.SET_DIRECTORY_ITEMS
}

export const setDirectoryItems = (
  items: IItem[],
): ISetDirectoryItemsAction => ({
  items,
  type: TypeKeys.SET_DIRECTORY_ITEMS,
})

export interface IStartLoadingItemsAction {
  type: TypeKeys.START_LOADING_ITEMS
}

export const startLoadingItems = (): IStartLoadingItemsAction => ({
  type: TypeKeys.START_LOADING_ITEMS,
})

export interface IFinishLoadingItemsAction {
  type: TypeKeys.FINISH_LOADING_ITEMS,
}

export const finishLoadingItems = (): IFinishLoadingItemsAction => ({
  type: TypeKeys.FINISH_LOADING_ITEMS,
})

export interface IToggleFontStyleAction {
  type: TypeKeys.TOGGLE_FONT_STYLE,
}

export const toggleFontStyle = (): IToggleFontStyleAction => ({
  type: TypeKeys.TOGGLE_FONT_STYLE,
})
