const addRecipe = (e, state) => {
  e.preventDefault();
  fetch('http://localhost:8080/api/greeting', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: state.value,
    })
  })
}

export default {
  addRecipe,
};
