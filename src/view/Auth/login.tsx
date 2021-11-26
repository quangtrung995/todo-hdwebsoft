import React from 'react';

//img
import logo from '../../assets/programming.png';

//comps
import { My_CustomButton, My_CustomInput } from '../../components/atom';

//axios
import axios from 'axios';

//constant
import { BACKEND_URL } from '../../constant';

//auth
import { useAuth, valueType } from '../Wrapper/Auth.wrapper';

//alert
import { AlertType, showNotification } from '../../utils/Alerts';

//interface
import { IUserAdmin } from '../../utils/todo';

type ErrorType = {
  email?: string;
  password?: string;
  incorrect?: string;
};

const My_Login = () => {
  ///auth
  const { onLogin: onLoginPage } = useAuth() as valueType;

  ///state
  const [revealPwd, setReveal] = React.useState(false);
  const [form, setForm] = React.useState({
    email: 'admin@example.com',
    password: 'Mytodo@123',
  });
  const [error, setError] = React.useState({
    email: '',
    password: '',
  });

  ///func to handle events
  const onChangeInput = (property: string, value: string): void => {
    setForm((prev) => ({
      ...prev,
      [property]: value,
    }));
  };
  const onLogin = (): void => {
    if (form.email.trim() === '') {
      setError((prev) => ({
        ...prev,
        email: 'Email cannot be empty!',
      }));
      return;
    }
    if (form.password.trim() === '') {
      setError((prev) => ({
        ...prev,
        password: 'Password cannot be empty!',
      }));
      return;
    }

    axios.get(`${BACKEND_URL}/users`).then((res: any) => {
      const validate = res.data.find(
        (item: IUserAdmin) =>
          item.email === form.email && item.password === form.password
      );
      if (validate) {
        showNotification({
          type: AlertType.SUCCESS,
          msg: 'Success!',
        });
        setTimeout(() => onLoginPage(true), 2000);
      }
      if (validate == undefined) {
        showNotification({
          type: AlertType.ERROR,
          msg: 'Email or password is incorrect!',
        });
        setTimeout(() => onLoginPage(false), 3000);
      }
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-center">
      <div className="w-full md:w-1/3 p-5">
        <img
          className="w-20 h-20 object-contain mx-auto"
          src={logo}
          alt="a logo"
        />
        <div className="bg-white border rounded-lg box-shadow p-5 mt-10">
          <h3 className="font-bold text-center">Sign in to your account</h3>
          <div className="flex flex-col gap-3 my-10">
            <My_CustomInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeInput('email', e.target.value)
              }
              className="signin-input"
              value={form.email}
              placeholder="Email"
            />
            {error.email && <p className="error-message">{error.email}</p>}
            <div className="relative">
              <My_CustomInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChangeInput('password', e.target.value)
                }
                type={revealPwd ? 'text' : 'password'}
                className="signin-input"
                value={form.password}
                placeholder="Password"
              />
              {error.password && (
                <p className="error-message">{error.password}</p>
              )}
              <button
                className="absolute right-0 top-[30%] mr-3"
                onClick={() => setReveal(!revealPwd)}
              >
                {revealPwd ? (
                  <i className="fas fa-eye text-gray-700" />
                ) : (
                  <i className="fas fa-eye-slash text-gray-700" />
                )}
              </button>
            </div>
            <My_CustomButton
              className="bg-myblue text-white border rounded-lg py-2"
              onClickButton={onLogin}
            >
              <h4>Login</h4>
            </My_CustomButton>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center mt-5">
          <p className="font-semibold cursor-default">Copryright TRUNG@2021</p>
          <p className="text-gray-400 cursor-default">
            Privacy Policy &amp; Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};
export default My_Login;
