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
import { Provider } from 'react-redux';
import stores from './redux/store';

//react query
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={stores}>
          <BrowserRouter>
            <Switch>
              <My_PublicRoute exact path="/" component={My_Login} />
              <My_PrivateRoute path="/dashboard" component={My_home} />
              <Redirect from="*" to="/" />
            </Switch>
            <ToastContainer />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
