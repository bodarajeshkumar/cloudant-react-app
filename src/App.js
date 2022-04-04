import logo from './logo.svg';
import './App.css';
//import './app.scss';
import { Button } from 'carbon-components-react';
import {
  HeaderName
} from "carbon-components-react/lib/components/UIShell";
import Header from './header'
import Navbar from "./navbar"
import HomePage from "./homepage";
import {Container, Row, Col} from "react-bootstrap";
import MyDatabasesList from "./components/databaseList";
import React, {useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateUser from "./components/createUser";
import DeleteUser from "./components/deleteUser";
import { useSelector, useDispatch } from 'react-redux'
import {fetchUsers} from "./store/reducers";
import store from './../src/store/store'


function App() {
  const count = useSelector(state => state);
  return (
      <BrowserRouter>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<App />} component={MyDatabasesList}/>
            <Route path="createUser" element={<CreateUser />} />
            <Route path="listAllUsers" element={<DeleteUser />} />
          </Routes>

        </div>

      </BrowserRouter>

  );
}

export default App;
