import React, { Component } from 'react'
import {connect} from 'react-redux';
import '../../styles/Recipe.css';

class Recipe extends Component{
  state = {
    recipePic: "",
    ingridients: [],
    recipeTitle: "",
    instruction: "",
    recipeVideoID: "",
    recipeSource: ""
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    this.setUp();
  }

  setUp(){
    this.setState(
      {
        recipePic: this.props.currentRecipe[this.props.imgProp],
        recipeTitle: this.props.currentRecipe[this.props.itemProp],
        instruction: this.props.currentRecipe.strInstructions
      }
    );
    this.setYouTubeId();
    this.setUpIngredients();
  }

  setUpIngredients(){
    let ingridientsArray = [];
    for(let i = 1; i < this.props.numberOfIngredients; i++){
      let currentIngredient = "strIngredient" + i
      let currentMeasurement = "strMeasure" + i
      if(this.props.currentRecipe[currentIngredient] !== ""
      && this.props.currentRecipe[currentIngredient] !== " "
      && this.props.currentRecipe[currentIngredient] !== null
    ){
        ingridientsArray[i] = {
          id: i,
          ingridientName: this.props.currentRecipe[currentIngredient],
          measurement: this.props.currentRecipe[currentMeasurement]
        };
      }
    }
    this.setState({ ingridients: ingridientsArray });
  }

  setYouTubeId(){
    let videoURL = this.props.currentRecipe.strYoutube;
    if(videoURL !== undefined && videoURL !== ""){
      this.setState({recipeVideoID: videoURL.substring((videoURL.length - 11), videoURL.length)});
    }
  }

  renderTableData() {
    return this.state.ingridients.map((ingredient) => {
      const { id, ingridientName, measurement } = ingredient
      return (
        <tr key={id}>
          <td>{ingridientName}</td>
          <td>{measurement}</td>
        </tr>
      )
    })
  }

  render(){
    return(
      <div>
        <h3 className="recipeTitle">{this.state.recipeTitle}</h3>
        <div className="recipeContainer">

            <img
              className="recipePicture"
              src={this.state.recipePic}
              alt={this.state.recipeTitle}
              />

          <div className="recipeIngredients">
            <h4 className="textTitle">Ingridients</h4>
            <table id='ingredientTable'>
              <tbody>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
          <div className="recipeInstruction">
              <h4 className="textTitle">Instructions</h4>
            {this.state.instruction}
          </div>
        </div>
        {this.state.recipeVideoID ?
          <div className="recipeVideo">
            <iframe
              title="recipeFrame"
              className="videoFrame"
              src={`https://www.youtube.com/embed/${this.state.recipeVideoID}`}
              frameBorder="0"
              allowFullScreen={true}
              />
          </div>:<div/>}
        </div>
      )
    }
  }

  const mapStateToProps = state => ({
    currentRecipe: state.currentRecipe,
    numberOfIngredients: state.currentState.numOfIngredients,
    imgProp: state.currentState.imgProp,
    itemProp: state.currentState.itemProp
  });

  export default connect(mapStateToProps)(Recipe);
