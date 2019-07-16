import React, {Component} from 'react';
import Fade from 'react-reveal/Fade';
import {connect} from 'react-redux';
import {mealDB, cocktailDB} from '../../data/states';
import {setCurrentState, setCurrentResult, setCurrentRecipe} from '../../actions/index';
import { Link } from 'react-router-dom';
import { MDBView } from 'mdbreact';
import '../../styles/RecipePage.css';

class RecipePage extends Component{

  state = {
    requestedRecipes: [],
    searchedWord: "",
    nothingReturned: false,
    picSize: 0
  }

  componentDidMount(){
    window.addEventListener("resize", this.updatePictureDimensions.bind(this));
    this.updatePictureDimensions();

    if(this.props.currentState.currentDB === "none"){
      if(this.props.match.path === "/food"){
        this.onSetCurrentState(mealDB);
      }else if(this.props.match.path === "/cocktail"){
        this.onSetCurrentState(cocktailDB);
      }
    }
    let refreshed = this.props.currentResult.receivedRecipes.length !== 0 && this.state.requestedRecipes.length === 0;
    if(refreshed){
      this.setState({
        requestedRecipes: this.props.currentResult.receivedRecipes,
        searchedWord: this.props.currentResult.searchedWord
      });
    }
  }

  onSetCurrentState(arg){
    this.props.onSetCurrentState(arg);
  }

  onSetCurrentResult(arg){
    this.props.onSetCurrentResult(arg);
  }

  onSetCurrentRecipe(arg){
    this.props.onSetCurrentRecipe(arg);
  }

  getRequestedRecipes = async (e) => {
    const recipeRequest = e.target.elements.requestedRecipes.value;
    e.preventDefault();
    const recipeApi = await fetch(`https://www.${this.props.currentState.currentDB}.com/api/json/v1/1/search.php?s=${recipeRequest}`);
    const recievedResult = await recipeApi.json();
    if(recievedResult[this.props.currentState.listProp] !== null){
      this.setState({requestedRecipes: recievedResult[this.props.currentState.listProp]});

      this.onSetCurrentResult(
        {
          receivedRecipes: recievedResult[this.props.currentState.listProp],
          searchedWord: recipeRequest
        }
      );
      this.setState({nothingReturned: false});
    }else{
      this.setState({requestedRecipes:[], nothingReturned: true});
    }
  }

  updatePictureDimensions() {
    if(window.innerWidth < 740) {
      this.setState({
        picSize: 300
      });
    } else if(window.innerWidth < 1050){
      this.setState({
        picSize: 200
      });
    }
    else if(window.innerWidth < 1350){
      this.setState({
        picSize: 300
      });
    } else {
      this.setState({
        picSize: 350
      });
    }
  }

  searchedWordChange(event){
    const inputValue = event.target.value
    this.setState({
      searchedWord: inputValue
    })
  }

  render(){
    return(
      <div className="container">
        <Fade>
          <div className="recipePageTitle">
            Type {this.props.currentState.component}&apos;s name or an ingridient
          </div>
          <form className="form" onSubmit={this.getRequestedRecipes}>
            <input
              className="searchBar"
              name="requestedRecipes"
              autoComplete="off"
              value={this.state.searchedWord}
              onChange={this.searchedWordChange.bind(this)}/>
            <button className="searchButton"><i className="fa fa-search"></i></button>
          </form>
          <div className="requestedRecipes row">
            { this.state.requestedRecipes.map((recipe) => {
              return(
                <div
                  key={recipe[this.props.currentState.itemIdProp]}
                  className="col-md-4 recipePageItem"
                  onClick={() => this.onSetCurrentRecipe(recipe)}
                  style={{width: this.state.picSize}}
                  >
                  <Link to={{pathname: `/${this.props.currentState.component}/${recipe[this.props.currentState.itemIdProp]}`}}>
                    <Fade>
                      <MDBView hover zoom width={this.state.picSize}>
                        <img
                          className="recipePageImg"
                          src={recipe[this.props.currentState.imgProp]}
                          alt={recipe[this.props.currentState.itemProp]}
                          width="100%"
                          />
                      </MDBView>
                      <h4 className="itemTitle">{recipe[this.props.currentState.itemProp]}</h4>
                    </Fade>
                  </Link>
                </div>
              );
            })}
          </div>
          {this.state.nothingReturned ? <h4 className="noResultMsg">
            No {this.props.currentState.component} related to your request was found!
          </h4>:<div/>}
        </Fade>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentState: state.currentState,
  currentResult: state.currentResult
});

const mapActionsToProps = {
  onSetCurrentState: setCurrentState,
  onSetCurrentResult: setCurrentResult,
  onSetCurrentRecipe: setCurrentRecipe
};

export default connect(mapStateToProps, mapActionsToProps)(RecipePage);
