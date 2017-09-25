export enum TypeKeys {
  SET_DIRECTORY_ITEMS = 'SET_DIRECTORY_ITEMS',
  START_LOADING_ITEMS = 'START_LOADING_ITEMS',
  FINISH_LOADING_ITEMS = 'FINISH_LOADING_ITEMS',
}

export type ActionTypes =
  | ISetDirectoryItemsAction
  | IStartLoadingItemsAction
  | IFinishLoadingItemsAction

export interface ISetDirectoryItemsAction {
  items: string[]
  type: TypeKeys.SET_DIRECTORY_ITEMS
}

export const setDirectoryItems = (
  items: string[],
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
