import React, { Component } from 'react';
import Recipe from './Components/Recipe';
import { MainStateProvider } from './MainStateProvider';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MainStateProvider>
          <Recipe />
        </MainStateProvider>
      </React.Fragment>
    ) 
  }
}

export default App;
