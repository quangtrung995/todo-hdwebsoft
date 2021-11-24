import React from 'react';

//router
import { Route, Redirect } from 'react-router-dom';

//auth
import { useAuth } from '../view/Wrapper/Auth.wrapper';

export const My_PrivateRoute = ({ component: Component, ...rest }: any) => {
  //auth
  const { isAuth } = useAuth();

  ///render
  return (
    <Route
      {...rest}
      render={(props) => {
        // props = {match, location, history}
        // console.log('{match, location, history}: ', props.location);
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};
