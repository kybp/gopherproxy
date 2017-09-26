import IItem from './item'

export enum TypeKeys {
  SET_DIRECTORY_ITEMS = 'SET_DIRECTORY_ITEMS',
  SET_TEXT_FILE = 'SET_TEXT_FILE',
  START_LOADING_ITEMS = 'START_LOADING_ITEMS',
  FINISH_LOADING_ITEMS = 'FINISH_LOADING_ITEMS',
  TOGGLE_FONT_STYLE = 'TOGGLE_FONT_STYLE',
}

export type ActionTypes =
  | ISetDirectoryItemsAction
  | ISetTextFileAction
  | IStartLoadingAction
  | IFinishLoadingAction
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

export interface ISetTextFileAction {
  body: string
  type: TypeKeys.SET_TEXT_FILE
}

export const setTextFile = (body: string): ISetTextFileAction => ({
  body,
  type: TypeKeys.SET_TEXT_FILE,
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

export interface IToggleFontStyleAction {
  type: TypeKeys.TOGGLE_FONT_STYLE,
}

export const toggleFontStyle = (): IToggleFontStyleAction => ({
  type: TypeKeys.TOGGLE_FONT_STYLE,
})
