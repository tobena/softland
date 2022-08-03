import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FaIcons from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import BuyCrypto from "./components/BuyCrypto";
import BuyProduct from "./components/ProductOrder";
import EtheriumComponent from "./components/EtheriumComponent";
import BuildProductPackage from "./components/BuildProductPackage";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/NewPassword";
import CreateProduct from "./components/CreateProduct";
//import changeWalletAddress from "./components/changeWalletAddress";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark ">
        <Link to={"/"} className="navbar-brand">
          SoftLand
        </Link>
        <div className="navbar-nav mr-auto">

          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {currentUser && (

            <li className="nav-item">
              <Link to={"/buycrypto"} className="nav-link">
                Buy Crypto
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/buyproduct"} className="nav-link">
                Buy Product
              </Link>
            </li>


          )}
          {/* {currentUser && (
          <li className="nav-item">
            <Link to={"/buildpackage"} className="nav-link">
              Buy Package
            </Link>
          </li>
          
          
          )} */}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/createproduct"} className="nav-link">
                New Product
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/eth"} className="nav-link">
                ETH
              </Link>
            </li>
          )}
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>

          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div class="row">
        <div class="col-sm-3">
          <ProSidebar>
            <Menu iconShape="square">
              <MenuItem icon={<FaIcons.FaHome />}>Dashboard</MenuItem>
              <MenuItem icon={<FaIcons.FaHome />}>User Profile <Link to="/profile" /></MenuItem>
              <MenuItem icon={<FaIcons.FaHome />}>Transactions</MenuItem>
              <SubMenu title="Components" icon={<FaIcons.FaHeart />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
              </SubMenu>
              <SubMenu title="Crypto" icon={<FaIcons.FaEthereum />}>
                <MenuItem> Change Wallet Address <Link to="/changeWallet" />  </MenuItem>
                <MenuItem>Transfer</MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
        </div>
        <div class="col-sm-9">
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgot" component={ForgotPassword} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/buycrypto" component={BuyCrypto} />
              <Route exact path="/buyproduct" component={BuyProduct} />
              <Route exact path="/buildpackage" component={BuildProductPackage} />
              <Route exact path="/newpassword" component={NewPassword} />
              <Route exact path="/createproduct" component={CreateProduct} />
              {/* <Route exact path="/changeWallet" component={changeWalletAddress} /> */}
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/eth" component={EtheriumComponent} />

            </Switch>
          </div>
        </div>


      </div>
    </div>
  );
};

export default App;
