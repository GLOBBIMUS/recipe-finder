import React, {Component} from 'react';
import coconut_pic from '../media/s_cocktail_photo.jpg';
import '../styles/Picture.css';
import { Parallax } from 'react-parallax';
import {connect} from 'react-redux';
import Typist from 'react-typist-updated';

class Picture extends Component {
  state = {
    height: 0,
    strength:0
  }

  updatePictureDimensions() {
    if(window.innerWidth < 900) {
      this.setState({height: 200, strength: 300});
    } else {
      this.setState({height: 400, strength: 450});
    }
  }

  componentDidMount(){
    this.updatePictureDimensions();
    window.addEventListener("resize", this.updatePictureDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePictureDimensions.bind(this));
  }

  render(){
    return(
      <div>
        <Parallax
          bgImage={coconut_pic}
          blur={0}
          bgImageAlt="the cat"
          strength={this.state.strength}
          >
          <div style={{ height: this.state.height }}>
            <Typist cursor={{ hideWhenDone: true }} avgTypingSpeed={40}>
              <div className="introBoxText">
                Lets&nbsp;get&nbsp;that&nbsp;recipe!
              </div>
            </Typist>
          </div>
        </Parallax>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentState: state.currentState
});

export default connect(mapStateToProps)(Picture);
