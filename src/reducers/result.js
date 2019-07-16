const initialResult = {
  receivedRecipes: [],
  searchedWord: ""
}

const setResult = (state = initialResult, action) => {
  switch(action.type){
    case "SET_CURRENT_RESULT":
      return action.currentResult
    default:
      return state
  }
}

export default setResult
