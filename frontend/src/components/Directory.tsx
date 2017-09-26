import axios from 'axios'
import { List, ListItem } from 'material-ui/List'
import Description from 'material-ui/svg-icons/action/description'
import Search from 'material-ui/svg-icons/action/search'
import Folder from 'material-ui/svg-icons/file/folder'
import SvgIcon from 'material-ui/SvgIcon'
import * as React from 'react'
import { connect } from 'react-redux'
import { finishLoadingItems } from '../actions'
import { setDirectoryItems } from '../actions'
import { startLoadingItems } from '../actions'
import IItem, { ItemType } from '../item'
import getStyle from './getStyle'

interface IItemProps {
  item: IItem
}

const itemTypeToIcon = (itemType: ItemType): React.ReactElement<any> => ({
  [ItemType.TEXT_FILE]: <Description />,
  [ItemType.DIRECTORY]: <Folder />,
  [ItemType.SEARCH]: <Search />,
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

interface IDirectoryProps {
  items: IItem[],
  fontStyle: string,
  dispatch?: any,
}

class Directory extends React.Component<IDirectoryProps, {}> {
  public componentWillMount() {
    this.props.dispatch(startLoadingItems())

    axios.get('http://127.0.0.1:8080/api/', {
      params: { host: 'gopher.floodgap.com' },
    }).then((items) => {
      this.props.dispatch(finishLoadingItems())
      this.props.dispatch(setDirectoryItems(items.data))
    }).catch((error) => alert(error))
  }

  public render() {
    return (
      <List>
        { this.props.items.map((item: IItem, i: number) => (
          <Item key={ i } item={ item } fontStyle={ this.props.fontStyle } />
        )) }
      </List>
    )
  }
}

const mapStateToProps = (state: any): IDirectoryProps => ({
  fontStyle: state.fontStyle,
  items: state.directoryItems.items,
})

export default connect(mapStateToProps)(Directory)
