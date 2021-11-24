import React from 'react';

//router-dom
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//route
import { My_PrivateRoute, My_PublicRoute } from './routes';

//comps
import My_home from './view/admin/home';
import My_Login from './view/Auth/login';

//auth
import { AuthProvider } from './view/Wrapper/Auth.wrapper';

//toastify
import { ToastContainer } from 'react-toastify';

//redux
//redux
import { Provider } from 'react-redux';
import stores from './redux/store';

function App() {
  return (
    <AuthProvider>
      <Provider store={stores}>
        <BrowserRouter>
          <Switch>
            <My_PublicRoute exact path="/" component={My_Login} />
            <My_PrivateRoute exact path="/home" component={My_home} />
            <Redirect from="*" to="/" />
          </Switch>
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;
