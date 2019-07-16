import React, { Component } from 'react';
import { MDBView } from 'mdbreact';
import '../../styles/mainMenu.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentState, setCurrentResult} from '../../actions/index';
import {mealDB, cocktailDB, noneDB} from '../../data/states'
import Fade from 'react-reveal/Fade';

class MainMenu extends Component{

  state = {
    MealPic: require('../../media/mainMenu/meal_icon_400.png'),
    CocktailPic: require('../../media/mainMenu/cocktail_icon_400.png'),
    width: 0
  }

  updatePictureDimensions() {
    if(window.innerWidth < 600) {
      this.setState({
        width: 150
      });
    } else if(window.innerWidth < 900){
      this.setState({
        width: 200
      });
    } else {
      this.setState({
        width: 400
      });
    }
  }

  componentDidMount(){
    window.addEventListener("resize", this.updatePictureDimensions.bind(this));
    this.updatePictureDimensions();
    this.onSetCurrentState(noneDB);
    this.onSetCurrentResult({
      receivedRecipes: [],
      searchedWord: ""
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePictureDimensions.bind(this));
  }

  onSetCurrentResult(arg){
    this.props.onSetCurrentResult(arg);
  }

  onSetCurrentState(arg) {
    this.props.onSetCurrentState(arg);
  }

  render(){
    return(
      <div className="menuContainer">
        <Fade>
          <div onClick={() => this.onSetCurrentState(mealDB)} className="pic mealButton">
            <Link to="/meal">
              <div className="buttonTitle">Meal</div>
              <MDBView hover zoom>
                <img alt="mealPic" width={this.state.width} src={this.state.MealPic}/>
              </MDBView>
            </Link>
          </div>
          <div onClick={() => this.onSetCurrentState(cocktailDB)} className="pic cocktailButton">
            <Link to="/cocktail">
              <div className="buttonTitle">Cocktail</div>
              <MDBView hover zoom>
                <img alt="cocktailPic" width={this.state.width} src={this.state.CocktailPic}/>
              </MDBView>
            </Link>
          </div>
        </Fade>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentState: state.currentState
});

const mapActionsToProps = {
  onSetCurrentState: setCurrentState,
  onSetCurrentResult: setCurrentResult
};

export default connect(mapStateToProps, mapActionsToProps)(MainMenu);
