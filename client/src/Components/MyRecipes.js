import React from 'react';
import { MainContext } from '../MainStateProvider';
import Review from './Review';

export default class MyRecipes extends React.Component {  
  static contextType = MainContext;
  state = {
    names: [],
    ids : [],
    rating : [],
  }

    async fetchRecipes() {
        await fetch('http://localhost:8080/api/greeting')
        .then(res => res.json())
        .then(res => res.map(e => e.item.state ? e : console.log('null')) )       
        .then(arr => this.setState({
          names : arr.map(e => <h3>{e.item.state.currentRecipe.name}</h3>),
          ids : arr.map(e => e._id), 
          rating : arr.map(e => e.item.state.currentRecipe.rating)
        }))
        this.context.state.ui.step === 5 ? this.context.stepChanger(4) : this.context.stepChanger(5)
    }
    
    showRatings = (number) => {
      return (
        <span>
          <i className="material-icons rating">{number > 0 ? "star" : "star_border"}</i>
          <i className="material-icons rating">{number > 1 ? "star" : "star_border"}</i>
          <i className="material-icons rating">{number>  2 ? "star" : "star_border"}</i>
          <i className="material-icons rating">{number > 4 ? "star" : "star_border"}</i>
          <i className="material-icons rating">{number > 5 ? "star" : "star_border"}</i>
        </span>
      )
    }
  render() {
    return (
    <MainContext.Consumer>
      {context => (
        <React.Fragment>
          <div className={context.state.ui.step === 4 
            || context.state.ui.step === 5
            || context.state.ui.step === 0 || context.state.ui.step === 6 ? 'current ' : 'hidden'}>
            <div className={context.state.ui.step === 5 ? 'hidden' : 'current buttons home-btn-recipe' } onClick={() => this.fetchRecipes()}>My Recipes</div>
            <div className={context.state.ui.step === 5 ? 'current ' : 'hidden'}>
              {this.state.names.map((e, i) => 
                <div className="card" key={this.state.ids[i]} onClick={() => this.context.fetchRecipe(this.state.ids[i])}
              ><button className="glyphicon glyphicon-remove" onClick={(e) => { e.stopPropagation(); return this.context.deleteRecipe(this.state.ids[i])}}></button>{e}
              <div className="cards-rating">{this.showRatings(this.state.rating[i])}</div>
              </div>
              )}
            </div>
          </div>
          <div>
            <Review></Review>
          </div>
          <button className={context.state.ui.step === 5 ? 'current material-icons add-new-recipe' : 'hidden' } onClick={() => this.context.startNewRecipe() }>add_circle_outline</button>
        </React.Fragment>
      )}
    </MainContext.Consumer>
    );
  }
}