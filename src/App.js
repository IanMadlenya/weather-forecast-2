import React, { Component } from 'react';
import IndiaMap from './component/map/IndiaMap.js'
import Location from './component/location/location.js'
import Weather from './component/weather/weather.js'
import './assets/react-toolbox/theme.css';
import theme from './assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Button from 'react-toolbox/lib/button/Button';
import Drawer from 'react-toolbox/lib/drawer/Drawer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            active: false,
            activeRight: false,
            loc:[],
            forecastData:{}
        };
        this.locationChanged = this.locationChanged.bind(this);
    }

     componentDidMount(){
        Location.getLocation(this.locationChanged);
     }

     locationChanged(data){
        console.log(data,this.state.active);
        this.setState({loc:[data.data.coords.latitude,data.data.coords.longitude]})
     }



   handleToggle = () => {
       this.setState({active: !this.state.active});

     };

     handleToggleRight = () => {
       this.setState({activeRight: !this.state.activeRight});

     };


  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>

            <Button label='Show Drawer' raised accent onClick={this.handleToggle} />
            <Button label='Show Drawer r' raised accent onClick={this.handleToggleRight} />
                <Drawer className="full-width" active={this.state.active} onOverlayClick={this.handleToggle}>
                  <IndiaMap></IndiaMap>
                </Drawer>

                <Drawer type="right" className="full-width" active={this.state.activeRight} onOverlayClick={this.handleToggleRight}>
                  right
                </Drawer>

                <Weather cord={this.state.loc}></Weather>



              

        </div>
      </ThemeProvider>

    );
  }
}

export default App;
