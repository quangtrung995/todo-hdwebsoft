import React from 'react';

export type valueType = {
  isAuth: boolean;
  onLogin: (state: boolean) => void;
  onLogout: () => void;
};

const AuthContext = React.createContext<valueType | null>(null);

export const AuthProvider = (props: any) => {
  const [isAuthenticated, setAuth] = React.useState(false);

  const onSetAuthLocal = (state: boolean) => {
    window.localStorage.setItem('isAuthencicate', 'true');
    setAuth(state);
  };
  const onRemoveAuthLocal = () => {
    window.localStorage.removeItem('isAuthencicate');
    setAuth(false);
  };

  const value: valueType = {
    isAuth: isAuthenticated,
    onLogin: onSetAuthLocal,
    onLogout: onRemoveAuthLocal,
  };
  ///effect
  React.useEffect(() => {
    const local = window.localStorage.getItem('isAuthencicate');
    if (!local) {
      return;
    }
    if (local) {
      setAuth(true);
    }
  }, []);

  //render
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
