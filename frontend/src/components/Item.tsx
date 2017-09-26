import { ListItem } from 'material-ui/List'
import Description from 'material-ui/svg-icons/action/description'
import Search from 'material-ui/svg-icons/action/search'
import Web from 'material-ui/svg-icons/av/web'
import Folder from 'material-ui/svg-icons/file/folder'
import SvgIcon from 'material-ui/SvgIcon'
import * as React from 'react'
import IItem, { ItemType } from '../item'
import getStyle from './getStyle'

interface IItemProps {
  item: IItem
}

const itemTypeToIcon = (itemType: ItemType): React.ReactElement<any> => ({
  [ItemType.TEXT_FILE]: <Description />,
  [ItemType.DIRECTORY]: <Folder />,
  [ItemType.SEARCH]: <Search />,
  [ItemType.HTML]: <Web />,
}[itemType])

const Item = ({ item, fontStyle }: { item: IItem, fontStyle: string }) => {
  if (item.type === ItemType.INFO) {
    return (
      <ListItem
        primaryText={ item.description }
        leftIcon={ <span /> }
        style={ getStyle(fontStyle) }
        disabled={ true }
      />
    )
  }

  return (
    <ListItem
      primaryText={ item.description }
      leftIcon={ itemTypeToIcon(item.type) }
      style={ getStyle(fontStyle) }
    />
  )
}

export default Item
