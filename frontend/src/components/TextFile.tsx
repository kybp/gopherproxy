import * as React from 'react'
import { connect } from 'react-redux'
import IItem from '../item'
import getStyle from './getStyle'

interface IProps {
  body: string
  fontStyle: string
}

const TextFile = ({ body, fontStyle }: IProps) => (
  <p style={ getStyle(fontStyle) }>{ body }</p>
)

const mapStateToProps = (
  { fontStyle, currentItem }:
  { fontStyle: string, currentItem: IItem },
): IProps => ({
  body: currentItem.data,
  fontStyle,
})

export default connect(mapStateToProps)(TextFile)
