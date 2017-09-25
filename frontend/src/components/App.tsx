import AppBar from 'material-ui/AppBar'
import * as React from 'react'
import Directory from './Directory'

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <AppBar title="Gopher" />
        <Directory />
      </div>
    )
  }
}

export default App
