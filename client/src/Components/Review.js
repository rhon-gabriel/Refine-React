import React from 'react';
import { MainContext } from '../MainStateProvider';

export default class Review extends React.Component {  
  static contextType = MainContext;
  
 render() {
     return (
        <MainContext.Consumer>
           {context => (
      
        <div className={context.state.ui.step === 6 ? 'current' : 'hidden'}>
          <h2 className="recipe-names" >{context.state.currentRecipe.name}</h2>
          {/* <h1>{console.log(context.state.currentRecipe.actions[0].body)}</h1> */}
          <div>
            <table>
              <tbody>
                    <tr>
                        <th>Ingredient</th>
                        <th>Quantity</th>
                    </tr>
            {context.state.currentRecipe.actions.map((e, i)=> 
            
                    <tr key={i}>
                        <td>{e.body.name}</td>  
                        <td>{e.body.quantity}</td>  
                    </tr> 
            )}
            </tbody>
            </table>
          </div>
          <button onClick={() => this.context.stepChanger(1)}>Try Again</button>
        </div>
       
      )}
        </MainContext.Consumer>
    )}
}