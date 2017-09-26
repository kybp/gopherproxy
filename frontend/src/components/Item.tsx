import { ListItem } from 'material-ui/List'
import Description from 'material-ui/svg-icons/action/description'
import Search from 'material-ui/svg-icons/action/search'
import Web from 'material-ui/svg-icons/av/web'
import Folder from 'material-ui/svg-icons/file/folder'
import SvgIcon from 'material-ui/SvgIcon'
import * as React from 'react'
import IItem, { ItemType } from '../item'
import getStyle from './getStyle'

const itemTypeToIcon = (itemType: ItemType): React.ReactElement<any> => ({
  [ItemType.TEXT_FILE]: <Description />,
  [ItemType.DIRECTORY]: <Folder />,
  [ItemType.SEARCH]: <Search />,
  [ItemType.INFO]: <span />,
  [ItemType.HTML]: <Web />,
}[itemType])

const Item = (
  { fontStyle, item, onSelect }:
  { fontStyle: string, item: IItem, onSelect: (item: IItem) => any },
) => (
  <ListItem
    primaryText={ item.description }
    leftIcon={ itemTypeToIcon(item.type) }
    style={ getStyle(fontStyle) }
    disabled={ item.type === ItemType.INFO }
    onClick={ () => onSelect(item) }
  />
)

export default Item
