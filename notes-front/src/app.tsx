import React, { Component } from 'react';
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Grid, Typography } from '@mui/material';

import { Home } from './components/home/home-component';
import { Login } from './components/login/login-component';
import { Signup } from './components/signup/signup-component';
import './app.css';

import auth from "./services/auth.service";
interface AppState {
  isAuth     : boolean;
  currentUser: any;
}

class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAuth     : false,
      currentUser: null
    }
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    if (user !== null) {
      this.setState({
        currentUser: user
      });
    } else {
      this.setState({
        currentUser: null
      });
    }
  }
  
  private logOut() {
    auth.logout();
  }

  public render() {
    const currentUser = auth.getCurrentUser();
    return (
      <div>

        <AppBar position = "static" color = "primary">
          <Toolbar>
              <Grid container 
                wrap = "wrap" 
                justifyContent="space-between"
                spacing={24}>
                  <Grid item>
                      <Typography variant = "h6">
                        <strong>
                          LETTRIA
                        </strong>
                      </Typography>
                  </Grid>
                  {currentUser !== null ? (
                    <Grid item>
                      <Link to="/login" onClick={this.logOut}>
                        <Typography variant = "h6">LOGOUT</Typography>
                      </Link>
                    </Grid>
                  ) : (
                    <Grid item>
                      <Link to="/login">
                        <Typography variant = "h6">LOGIN</Typography>
                      </Link>
                    </Grid>
                  )}
                  
              
              </Grid>
          </Toolbar>
        </AppBar>
        
        <Switch>
          <Route exact path = "/signup" component = {Signup} />
          <Route exact path = "/login" component  = {Login} />
          {currentUser !== null ? (
            <Route exact path = "/" component       = {Home} />
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
