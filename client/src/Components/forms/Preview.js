import React from 'react';
import { MainContext } from '../../MainStateProvider';



export default class Preview extends React.Component {  
  static contextType = MainContext;

  render() {
    return (
    <MainContext.Consumer>
      {context => (
        <div className={context.state.ui.step === 3 ? 'current prev-div' : 'hidden'}>
          <h2 className="recipe-names" >{context.state.currentRecipe.name}</h2>
          <h5>Preview</h5>
          {this.context.state.currentRecipe.actions.map(ingredient => {
            return <li key={ingredient.id}>{ingredient.body.name} <button className={ingredient.body.name ? "current delete-ingredient glyphicon glyphicon-remove-circle" : "hidden"} onClick={() => this.context.removeIngredient(ingredient.id)}></button></li> 
          })}
          <form >
              <input placeholder="Add description..." type="text" className="description-input" value={this.context.state.currentRecipe.description} onChange={this.context.setForm("description")} />
          </form>
          <div className="ratings-div">
            <i  onClick={this.context.addRating(1)} className="material-icons rating">{context.state.currentRecipe.rating > 0 ? "star" : "star_border"}</i>
            <i onClick={this.context.addRating(2)} className="material-icons rating">{context.state.currentRecipe.rating > 1 ? "star" : "star_border"}</i>
            <i  onClick={this.context.addRating(3)} className="material-icons rating">{context.state.currentRecipe.rating > 2 ? "star" : "star_border"}</i>
            <i  onClick={this.context.addRating(4)} className="material-icons rating">{context.state.currentRecipe.rating > 3 ? "star" : "star_border"}</i>
            <i onClick={this.context.addRating(5)} className="material-icons rating">{context.state.currentRecipe.rating > 4 ? "star" : "star_border"}</i>
          </div>
        </div>
      )}
    </MainContext.Consumer>
    );
  }
}
 
