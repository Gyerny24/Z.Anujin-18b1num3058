import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Grid, Typography, Paper } from "@material-ui/core";
import "./styles/main.css";

// import necessary components
import TopBar from "./components/topBar/TopBar";
import UserDetail from "./components/userDetail/UserDetail";
import UserList from "./components/userList/UserList";
import UserPhotos from "./components/userPhotos/UserPhotos";

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: "Home",
      name: "",
      ezPhotos: false,
    };
  }

  stateEvent = (pathName, name) => {
    this.setState({ pathName: pathName, name: name });
  };
  ezPhotosChanger = () => {
    this.setState({ ezPhotos: !this.state.ezPhotos });
  };
  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TopBar pathName={this.state.pathName} name={this.state.name} />
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                <UserList
                  isEz={this.state.ezPhotos}
                  ezPhotosChanger={this.ezPhotosChanger}
                />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => <Home stateEvent={this.stateEvent} />}
                  />
                  <Route
                    path="/users/:userId"
                    render={(props) => (
                      <UserDetail {...props} stateEvent={this.stateEvent} />
                    )}
                  />
                  <Route
                    path="/photos/:userId"
                    render={(props) => (
                      <UserPhotos
                        {...props}
                        isEz={this.state.ezPhotos}
                        stateEvent={this.stateEvent}
                      />
                    )}
                  />
                  <Route path="/users" component={UserList} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

class Home extends React.Component {
  componentDidMount() {
    this.props.stateEvent("Home", "");
  }
  render() {
    return (
      <Typography variant="body1">
        Welcome to your photosharing app! This{" "}
        <a href="https://material-ui.com/demos/paper/">Paper</a> component
        displays the main content of the application. The {"sm={9}"} prop in the{" "}
        <a href="https://material-ui.com/layout/grid/">Grid</a> item component
        makes it responsively display 9/12 of the window. The Switch component
        enables us to conditionally render different components to this part of
        the screen. You don&apos;t need to display anything here on the
        homepage, so you should delete this Route component once you get
        started.
      </Typography>
    );
  }
}
ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
