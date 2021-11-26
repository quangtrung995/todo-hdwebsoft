import React from 'react';

//router
import { Redirect, Route } from 'react-router-dom';

//auth
import { useAuth, valueType } from '../view/Wrapper/Auth.wrapper';

export const My_PublicRoute = ({ component: Component, ...rest }: any) => {
  //auth
  const { isAuth } = useAuth() as valueType;

  ///render
  return (
    <Route
      {...rest}
      render={(props) => {
        // props = {match, location, history}
        if (!isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: '/dashboard', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};
