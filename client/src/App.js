import './App.css';
import { Route } from "react-router-dom";
import React from "react";
import HomePage from "./componentes/Homepage/HomePages";
import CreateDog from "./componentes/CreateDog/CreateDog";
import Dogs from "./componentes/MainRoute/MainRoute";
import DogDetails from "./componentes/DogDetails/DogDetails";
import axios from 'axios';

// axios.defaults.baseURL = "https://back-production-38da.up.railway.app"
axios.defaults.baseURL = "http://localhost:3001"

function App() {
  return ( 
    <div className="App">
      <React.Fragment>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/Main" component={Dogs}/>
        <Route path="/Dog/:id" component={DogDetails}/>
        <Route path="/CreateDog" component={CreateDog}/>
      </React.Fragment>
    </div>
  );
}

export default App;
