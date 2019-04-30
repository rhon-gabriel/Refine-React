import React, {
  Component
} from 'react';
const uuid = require('uuid/v4');

export const MainContext = React.createContext();

export class MainStateProvider extends Component {
  state = {
    ui: {
      currentActionIndex: 0,
      step: 0,
    },
    currentRecipe: {
      name: '',
      id: uuid(),
      actions: [{
        id: 1,
        type: 'ADD_INGREDIENT',
        body: {
          name: '',
          quantity: '',
          description: ''
        }
      }],
      description: '',
      rating: null,
    },
  }

  setForm = input => event => {
    this.setState({ 
      currentRecipe : { ...this.state.currentRecipe, [input]: event.target.value }
    }) 
  }
  // addIngredient = obj => event => {
  //   event.preventDefault();
  //   this.state.currentRecipe.actions.push(obj)
  //     this.setState(prevState => ({
  //       ui: {
  //         step: prevState.ui.step,
  //         currentActionIndex: prevState.ui.currentActionIndex += 1
  //       }
  //     })) 
  // }
  nextStep = () => {
    const step = this.state.ui.step
    if (step < 4) {
      this.setState({
          ui : { ...this.state.ui, step:  step + 1 }
      })
    }
  }
  prevStep = () => {
    const step = this.state.ui.step
    if (step > 1) {
      this.setState({
        ui : { ...this.state.ui, step:  step - 1 }
      })
    }
  }
  prevAction = (event) => {
    event.preventDefault();
    if (this.state.ui.currentActionIndex > 0) {

      this.setState(prevState => ({
        ui: {
          step: prevState.ui.step,
          currentActionIndex: prevState.ui.currentActionIndex -= 1
        }
      })) 
    }
  }
  addRecipe = async state => {
    await fetch('http://localhost:8080/api/greeting', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state,
      })
    })
    window.location.reload();
  }

  deleteRecipe = async id => {
    await fetch(`http://localhost:8080/api/greeting/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    this.setState({
      ui : { ...this.state.ui, step: 0 }
    })
  }

  stepChanger = (num) => {
   
      this.setState({
          ui : { ...this.state.ui, step: num }
      })
  }

  addRating = (num) => e => {
    this.setState({
      currentRecipe : { ...this.state.currentRecipe, rating: num }
    })
  }

  removeIngredient = (id) => {
    const filteredActions = this.state.currentRecipe.actions.filter(e => e.id !== id)
    this.setState({
      currentRecipe : { ...this.state.currentRecipe, actions : filteredActions },
      ui : { ...this.state.ui, currentActionIndex: this.state.ui.currentActionIndex - 1 }
    })
  }

  fetchRecipe = async (id) =>{
    await fetch('http://localhost:8080/api/greeting')
    .then(res => res.json())
    .then(data => data.filter(e => e._id === id))
    .then(data => this.setState({
      currentRecipe : data[0].item.state.currentRecipe,
     ui : { step: 6, currentActionIndex: data[0].item.state.ui.currentActionIndex }
      }))    
  }
  
  homePage = (e) => {
    window.location.reload();
  }

  startNewRecipe = (state) => {
    state = {
      ui: {
        currentActionIndex: 0,
        step: 1,
      },
      currentRecipe: {
        name: '',
        id: uuid(),
        actions: [{
          id: 1,
          type: 'ADD_INGREDIENT',
          body: {
            name: '',
            quantity: '',
            description: ''
          }
        }],
        description: '',
        rating: null,
      },
    }
    this.setState({
      currentRecipe: state.currentRecipe,
      ui : { ...this.state.ui, step: 1 }
    })
  }

  handleFormChange =  input => async e => {
    let formValue = await e.target.value;
    await this.setState(state => {
      const actions = [state.currentRecipe.actions[this.state.ui.currentActionIndex].body[input] = formValue]
      return {
        actions
      }
    })
  }

  addIngredient = obj => event => {
    event.preventDefault();
    obj = {
      id: uuid(),
      type: 'ADD_INGREDIENT',
      body: {
        name: '',
        quantity: '',
        comment: ''
      }
    }
    this.state.currentRecipe.actions.push(obj)
      this.setState(prevState => ({
        ui: {
          step: prevState.ui.step,
          currentActionIndex: prevState.ui.currentActionIndex += 1
        }
      })) 
  }
  
  

  render() {
      return (
      <MainContext.Provider value = {{
        state: this.state,
        setForm: this.setForm,
        addIngredient: this.addIngredient,
        nextStep: this.nextStep,
        prevStep: this.prevStep,
        prevAction: this.prevAction,
        addRecipe: this.addRecipe,
        stepChanger: this.stepChanger,
        addRating: this.addRating,
        removeIngredient: this.removeIngredient,
        fetchRecipe: this.fetchRecipe,
        homePage: this.homePage,
        startNewRecipe: this.startNewRecipe,
        deleteRecipe: this.deleteRecipe,
        handleFormChange: this.handleFormChange,  
      }}>
          {this.props.children}
      </MainContext.Provider>
      );
  }
}