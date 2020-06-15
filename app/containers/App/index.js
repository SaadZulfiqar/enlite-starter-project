import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './Auth';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import RegisterDedicated from '../Pages/Standalone/RegisterDedicated';
import Application from './Application';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends React.Component {
  render() {
    const { auth: { loggedIn } } = this.props;
    const authenticated = (!!(localStorage.getItem('id')) || loggedIn);

    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {(changeMode) => (
            <Switch>
              {/* <Route path="/" exact component={LoginDedicated} />
              <Route
                path="/app"
                render={(props) => <Application {...props} changeMode={changeMode} />}
              />
             <Route component={Auth} /> */}


              {/* <Route path="/register" render={(props) => authenticated ? <Redirect to="/app" {...props} /> : <RegisterDedicated />} /> */}
              <Route path="/app" render={(props) => (authenticated ? <Application {...props} changeMode={changeMode} /> : <Redirect to="/" />)} />
              <Route path="/" render={(props) => (authenticated ? <Redirect to="/app" {...props} /> : <LoginDedicated />)} />

            </Switch>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.getIn(['authReducer'])
});

const mapDispatchToProps = dispatch => ({
});

const AppConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppConnect;
