import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path='/care' render={() => <Login/>}/>
      <Route path='/care' render={() => <Registration/>}/>
      <Route path='/care' render={() => <Profile/>}/>
      <Route path='/care' render={() => <Error404/>}/>
      <Route path='/care' render={() => <EnterNewPassword/>}/>
      <Route path='/care' render={() => <TestComponents/>}/>
      <Route path='/care' render={() => <TestComponents/>}/>
    </div>
  );
}

export default App;
