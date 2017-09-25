import { List, ListItem } from 'material-ui/List'
import * as React from 'react'
import { connect } from 'react-redux'

interface IProps {
  items: string[]
}

class Directory extends React.Component<IProps, {}> {
  public render() {
    return (
      <List>
        { this.props.items.map((item: string, i: number) => (
          <ListItem key={ i } primaryText={ item } />
        )) }
      </List>
    )
  }
}

const mapStateToProps = ({ items }: { items: string[] }): IProps => ({
  items,
})

export default connect(mapStateToProps)(Directory)
