import React from 'react';

const AuthContext = React.createContext(null);

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

  const value = {
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
