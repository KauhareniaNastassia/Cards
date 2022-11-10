import React from 'react';
import './App.css';
import {HashRouter, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">

        <HashRouter>
            <Route path={'/care'} element={<Login/>}/>
            <Route path={'/care'} element={<Registration/>}/>
            <Route path={'/care'} element={<Profile/>}/>
            <Route path={'/care'} element={<Error404/>}/>
            <Route path={'/care'} element={<EnterNewPassword/>}/>
            <Route path={'/care'} element={<TestComponents/>}/>
            <Route path={'/care'} element={<Login/>}/>
            <Route path={'/care'} element={<PasswordRecovery/>}/>
        </HashRouter>


    </div>
  );
}

export default App;
