import React from "react";

const defaultValue = {
  authUser: null,
  token: null,
  setToken: (token) => {},
  unsetToken: () => {},
  setAuthUser: (user) => {},
  unsetAuthUser: () => {},
};
const AuthContext = React.createContext(defaultValue);

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
