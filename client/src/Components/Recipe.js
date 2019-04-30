import React from 'react';
import IngredientForm from './forms/IngredientForm';
import RecipeName from './forms/RecipeName';
import Preview from './forms/Preview';
import { MainContext } from '../MainStateProvider';
import Home from './Home';
import MyRecipes from './MyRecipes';


export default class Recipe extends React.Component {
  static contextType = MainContext;


  collectForms() {
    let res = [];
    if (this.context.state.currentRecipe.actions) {
    this.context.state.currentRecipe.actions.forEach((action, i) => {
      if (action.type === 'ADD_INGREDIENT') {
        res.push(<IngredientForm key={action.id} step={i}></IngredientForm>);
      }
    });
    return res;
    }
  }

  render() {
    return (
      <MainContext.Consumer>
        {context => (
          <div>
            <div className="navbar flex">
              <div className="w-1/5 h-32 arrow-back-btn">
                  <button className={context.state.ui.step === 2 || context.state.ui.step === 3 ? 'current go-back material-icons' : 'hidden' } 
                  onClick={this.context.prevStep}>arrow_back
                </button>
              </div>
              
                <img src="https://i.imgur.com/yvSUhDP.png" className=" logo" onClick={() => this.context.homePage()} alt="re:fine"></img>
          
              <div className="w-1/5 h-32 home-button-div">
                  <button className= {context.state.ui.step === 0 ? 'hidden' : 'current fa fa-home border-blue-lighter btn-lg'} 
                    onClick={() => this.context.homePage()}>
                  </button>
              </div>
            </div>
           
            <Home></Home>
            <MyRecipes></MyRecipes>
            <div className="actions">
              <RecipeName></RecipeName>
              { this.collectForms() }
            </div>
            <div>
              <Preview></Preview>
            </div>
            <div className="submit-recipe">
              <input type="submit" value="Submit" onClick={() => this.context.addRecipe(this.context.state)} 
              className={context.state.ui.step === 3  ? 'current buttons' : 'hidden'} />
            </div>
          
            <button className={context.state.ui.step === 1 
              || context.state.ui.step === 2 ? 'current buttons' 
              : 'hidden' } onClick={this.context.nextStep}>
              { context.state.ui.step === 2 ? "done!" : "Next" }
            </button>
          </div>
        )}
      </MainContext.Consumer>
    );
  }
}
