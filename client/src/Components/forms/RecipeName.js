import React from 'react';
import { MainContext } from '../../MainStateProvider';


export default class RecipeName extends React.Component {  
  static contextType = MainContext;

  render() {
    return (
    <MainContext.Consumer>
      {context => (
        <div className={context.state.ui.step === 1 ? 'current text-center' : 'hidden'}>
          <h3 className="recipe-name-label">What are you <br/> making today?</h3>
          <form className="recipe-name-form">
            <label>
              <input placeholder="Name..." type="text" className="forms" value={this.context.state.currentRecipe.name} onChange={this.context.setForm("name")}/>
            </label>
          </form>
        </div>
      )}
    </MainContext.Consumer>
    );
  }
}