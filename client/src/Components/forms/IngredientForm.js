import React from 'react';
import { MainContext } from '../../MainStateProvider';
const uuid = require('uuid/v4');

export default class IngredientForm extends React.Component {    
  static contextType = MainContext;
 
 state = {
     id: 2,
     type: 'ADD_INGREDIENT',
     body: {
       name: '',
       quantity: '',
       comment: ''
     }
   }
  handleFormChange = input => e => {
    this.setState({
      ...this.state,
      id: uuid(),
      body: { ...this.state.body, [input] : e.target.value }
    })
  }
  
  render() {
    return (
      <MainContext.Consumer>
        {context => (
          <div className={context.state.ui.step === 2 ? 'current' : 'hidden'}>
          
          <form className={context.state.ui.currentActionIndex === this.props.step ? 'current text-center' : 'hidden'}>
          <h1 className={context.state.ui.step === 0 || context.state.ui.step === 4 ? 'hidden' : 'current recipe-names'}>{context.state.currentRecipe.name}</h1>

          <div className="flex">
          <div className="w-1/5 h-12"><button className="fas fa-chevron-left" onClick={this.context.prevAction}></button></div>
          <div className="w-3/5 h-12"><h4>Add ingredients {}</h4></div>
          <div className="w-1/5 h-12"><button className="arrows fas fa-chevron-right" type="button" onClick={this.context.addIngredient()}></button></div>
          </div>
          
            
          <div className="flex flex-wrap justify-center form-ingredient">
            <div className="w-4/5 p-2">
              <div>
                  <input placeholder="Ingredient..." type="text" className="forms border border-blue-lighter"  value={this.context.state.currentRecipe.actions[this.context.state.ui.currentActionIndex].body.name} onChange={this.context.handleFormChange("name")}/>
              </div>
            </div>
            <div className="w-4/5 p-2">
              <div>
                  <input placeholder="Quantity..." type="text" className="forms border border-blue-lighter" value={this.context.state.currentRecipe.actions[this.context.state.ui.currentActionIndex].body.quantity} onChange={this.context.handleFormChange("quantity")}/>  
              </div>
            </div>
            <div className="w-4/5 p-2">
              <div>
                  <input placeholder="Comment..." type="text" className="forms forms-large border border-blue-lighter" value={this.context.state.currentRecipe.actions[this.context.state.ui.currentActionIndex].body.comment} onChange={this.context.handleFormChange("comment")}></input>
              </div>
            </div>
          </div>
           
              
           
          </form>
        </div>
        
      )}
    </MainContext.Consumer>
    );
  }
}