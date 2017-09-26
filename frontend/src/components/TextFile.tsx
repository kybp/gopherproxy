import * as React from 'react'
import { connect } from 'react-redux'
import getStyle from './getStyle'

interface IProps {
  body: string
  fontStyle: string
}

const TextFile = ({ body, fontStyle }: IProps) => (
  <p style={ getStyle(fontStyle) }>{ body }</p>
)

const mapStateToProps = (
  { fontStyle, textFile }:
  { fontStyle: string, textFile: string },
): IProps => ({
  body: textFile,
  fontStyle,
})

export default connect(mapStateToProps)(TextFile)
