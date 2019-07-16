export const setCurrentState = newState => ({
  type: "SET_CURRENT_STATE",
  currentState: newState
})

export const setCurrentResult = result => ({
  type: "SET_CURRENT_RESULT",
  currentResult: result
})

export const setCurrentRecipe = recipe => ({
  type: "SET_CURRENT_RECIPE",
  currentRecipe: recipe
})
