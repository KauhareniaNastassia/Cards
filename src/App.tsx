import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom"
import TestComponents from "./components/TestComponents/TestComponents";
import {Error404} from "./components/Error404/Error404";
import {Registration} from "./components/Registration/Registration";
import {Profile} from "./components/Profile/Profile";
import {Login} from "./components/Login/Login";
import {CreateNewPassword} from "./components/CreateNewPassword/CreateNewPassword";
import {PasswordRecovery} from "./components/PasswordRecovery/PasswordRecovery";

function App() {
  return (
    <div className="App">

            <Routes>
                <Route path={'/'} element={<Navigate to={'/testComponents'}/>}/>

                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/error404'} element={<Error404/>}/>
                <Route path={'/passwordRecovery'} element={<PasswordRecovery/>}/>
                <Route path={'/createNewPassword'} element={<CreateNewPassword/>}/>
                <Route path={'/testComponents'} element={<TestComponents/>}/>

            </Routes>

    </div>
  );
}

export default App;
