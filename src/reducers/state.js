const initialState = {
  component: "none",
  currentDB: "none",
  itemIdProp: "none",
  itemProp: "none",
  listProp: "none",
  imgProp:"none"
}

const setState = (state = initialState, action) => {
  switch(action.type){
      case "SET_CURRENT_STATE":
    return action.currentState
    default:
      return state
  }
}

export default setState
