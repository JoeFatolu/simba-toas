import * as React from "react";
import * as auth from "../auth-provider";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hooks.js";
import { FullPageSpinner, FullPageErrorFallback } from "../components/lib";
const localStorageKey = "__auth_provider_token__";

async function bootstrapAppData() {
  let user = null;
  const token = await auth.getToken();
  if (token) {
    try {
      const data = await client("user/profile", { token });
      user = data.data.user;
    } catch (error) {
      deleteToken();
    }
  }
  return user;
}

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

async function deleteToken() {
  return window.localStorage.removeItem(localStorageKey);
}

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const { data: user, status, error, isLoading, isIdle, isError, isSuccess, run, setData } = useAsync();

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = React.useCallback((form) => auth.login(form).then((user) => setData(user)), [setData]);
  const register = React.useCallback((form) => auth.register(form).then((user) => setData(user)), [setData]);

  const logout = React.useCallback(() => {
    auth.logout();
    setData(null);
  }, [setData]);

  const value = React.useMemo(() => ({ user, login, logout, register, setData }), [login, logout, register, setData, user]);

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

async function useclient(endpoint, config) {
  const token = await getToken();
  return client(endpoint, { ...config, token });
}

export { AuthProvider, useAuth, useclient };
