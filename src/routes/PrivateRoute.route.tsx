import React from 'react';

//router
import { Route, Redirect } from 'react-router-dom';

//auth
import { useAuth, valueType } from '../view/Wrapper/Auth.wrapper';

export const My_PrivateRoute = ({ component: Component, ...rest }: any) => {
  //auth
  const { isAuth } = useAuth();

  ///render
  return (
    <Route
      {...rest}
      render={(props) => {
        // props = {match, location, history}
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            // <></>
          );
        }
      }}
    />
  );
};
