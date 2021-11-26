import React from 'react';

//router
import { useRouteMatch, Switch } from 'react-router-dom';

//comps
import { My_TodoDetail, My_TodoList } from '../../components/organisms';

//route
import { My_PrivateRoute } from '../../routes';

export const My_Reactquery = () => {
  ///static
  const { path } = useRouteMatch();

  ///render
  return (
    <>
      <Switch>
        <My_PrivateRoute exact path={`${path}`} component={My_TodoList} />
        <My_PrivateRoute
          exact
          path={`${path}/todo/:id`}
          component={My_TodoDetail}
        />
      </Switch>
    </>
  );
};
