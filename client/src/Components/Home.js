import React from 'react';
import { MainContext } from '../MainStateProvider';
import style from '../style/home.css'
const uuid = require('uuid/v4');

export default class Home extends React.Component {  
  static contextType = MainContext;

  render() {
    return (
    <MainContext.Consumer>
      {context => (
        <div className={context.state.ui.step === 0 
        || context.state.ui.step === 4 ? 'current' : 'hidden'}>
          <div className='buttons home-btn' onClick={() => this.context.startNewRecipe()}>New Recipe</div>
        </div>
      )}
    </MainContext.Consumer>
    );
  }
}