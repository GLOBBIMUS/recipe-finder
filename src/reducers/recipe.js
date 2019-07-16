const initialResult = {}

const setRecipe = (state = initialResult, action) => {
  switch(action.type){
    case "SET_CURRENT_RECIPE":
      return action.currentRecipe
    default:
      return state
  }
}

export default setRecipe
