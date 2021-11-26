import React from 'react';

//router-dom
import {
  Switch,
  Redirect,
  Link,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';

//img
import logo from '../../assets/programming.png';

//comps
import { My_CustomButton } from '../../components/atom';

//alert
import { AlertType, showNotification } from '../../utils/Alerts';

//auth
import { useAuth } from '../Wrapper/Auth.wrapper';

//route
import { routes } from '../../routes/routes';
import { My_PrivateRoute } from '../../routes';

const My_home = () => {
  ///static
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const { onLogout } = useAuth();

  ///func to handle events
  const onSignout = () => {
    notiSuccess('Success');
    setTimeout(() => onLogout(), 2000);
  };
  const notiSuccess = (message: string) => {
    showNotification({
      type: AlertType.SUCCESS,
      msg: message,
    });
  };

  ///render
  return (
    <div className="w-full min-h-screen">
      {/* block 1 */}
      <div className="flex flex-row justify-between items-center px-5">
        <img className="w-14 h-14 object-contain" src={logo} alt="a logo" />

        <div className="">
          <ul className="flex flex-row gap-x-3 uppercase font-semibold">
            {routes.map(({ name, path: pth }) => {
              return (
                <li
                  key={name}
                  className={`${
                    path + pth === pathname ? 'text-[#ff7614]' : ''
                  }`}
                >
                  <Link to={`${url}${pth}`}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <My_CustomButton
          className="bg-gray-700 text-white border rounded-lg py-1 px-3 cap-semi"
          onClickButton={onSignout}
        >
          <h4>sign out</h4>
        </My_CustomButton>
      </div>
      {/* end of block 1 */}
      <Switch>
        {routes.map(({ name, path: pth, component }) => (
          <My_PrivateRoute
            key={name}
            // exact
            path={`${path}${pth}`}
            component={component}
          />
        ))}
        <Redirect from="/dashboard" to={`${path}/redux-saga`} />
      </Switch>
    </div>
  );
};
export default My_home;
