import { List } from 'material-ui/List'
import * as React from 'react'
import { connect } from 'react-redux'
import { selectItem } from '../actions'
import IItem from '../item'
import Item from './Item'

interface IDirectoryProps {
  items: IItem[],
  fontStyle: string,
  dispatch?: any,
}

class Directory extends React.Component<IDirectoryProps, {}> {
  public render() {
    return (
      <List>
        { this.props.items.map((item: IItem, i: number) => (
          <Item
            key={ i }
            item={ item }
            fontStyle={ this.props.fontStyle }
            onSelect={ () => selectItem(this.props.dispatch, item) }
          />
        )) }
      </List>
    )
  }
}

const mapStateToProps = (
  { fontStyle, currentItem }: { fontStyle: string, currentItem: IItem },
): IDirectoryProps => ({
  fontStyle,
  items: currentItem.data,
})

export default connect(mapStateToProps)(Directory)
