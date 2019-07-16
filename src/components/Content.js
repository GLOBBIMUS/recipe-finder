import React, {Component} from 'react';
import MainMenu from './contentComponents/MainMenu';
import RecipePage from './contentComponents/RecipePage';
import Recipe from './contentComponents/Recipe';
import { Switch, Route } from 'react-router';

class Content extends Component {
  render(){
    return(
      <div >
        <Switch>
          <Route exact path="/" render={(props) => <MainMenu {...props} />} />
          <Route exact path="/meal" render={(props) => <RecipePage {...props} />} />
          <Route exact path="/cocktail" render={(props) => <RecipePage {...props} />} />
          <Route path="/meal/:id" render={(props) => <Recipe {...props} />} />
          <Route path="/cocktail/:id" render={(props) => <Recipe {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default Content;
