import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { LocaleProvider } from "./contexts/LocaleContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { keyLoginLocalStorage, keyTokenLocalStorage } from "./utils/constant";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const localLogin = localStorage.getItem(keyLoginLocalStorage);
  const localToken = localStorage.getItem(keyTokenLocalStorage);

  const [authContext, setAuthContext] = React.useState({
    authUser: localLogin ? JSON.parse(localLogin) : null,
    token: localToken,
    setToken: (token) => {
      localStorage.setItem(keyTokenLocalStorage, token);
      setAuthContext((prevState) => {
        return {
          ...prevState,
          token,
        };
      });
    },
    setAuthUser: (user) => {
      setAuthContext((prevState) => {
        localStorage.setItem(keyLoginLocalStorage, JSON.stringify(user));
        return {
          ...prevState,
          authUser: JSON.stringify(user),
        };
      });
    },
    unsetToken: () => {
      setAuthContext((prevState) => {
        localStorage.removeItem(keyTokenLocalStorage);
        return {
          ...prevState,
          token: null,
        };
      });
    },
    unsetAuthUser: () => {
      setAuthContext((prevState) => {
        localStorage.removeItem(keyLoginLocalStorage);
        return {
          ...prevState,
          authUser: null,
        };
      });
    },
  });

  const [localeContext, setLocaleContext] = React.useState({
    locale: localStorage.getItem("locale") || "id",
    toggleLocale: () => {
      setLocaleContext((prevState) => {
        const newLocale = prevState.locale === "id" ? "en" : "id";
        localStorage.setItem("locale", newLocale);
        return {
          ...prevState,
          locale: newLocale,
        };
      });
    },
  });

  const [themeContext, setThemeContext] = React.useState({
    theme: localStorage.getItem("theme") || "light",
    toggleTheme: () => {
      setThemeContext((prevState) => {
        const newTheme = prevState.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        return {
          ...prevState,
          theme: newTheme,
        };
      });
    },
  });

  useEffect(() => {
    if (themeContext.theme === "light") document.body.classList.remove("dark");
    else document.body.classList.add("dark");
    return () => {};
  }, [themeContext.theme]);

  if (authContext.authUser === null) {
    return (
      <div className="min-h-screen dark:bg-black dark:text-white">
      <AuthProvider
          value={{
            ...authContext,
          }}
        >
          <ThemeProvider
            value={{
              ...themeContext,
            }}
          >
            <LocaleProvider
              value={{
                ...localeContext,
              }}
            >
              <Header />

              <Routes>
                <Route path="/*" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </LocaleProvider>
          </ThemeProvider>
        </AuthProvider>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black dark:text-white">
      <AuthProvider
        value={{
          ...authContext,
        }}
      >
        <ThemeProvider
          value={{
            ...themeContext,
          }}
        >
          <LocaleProvider
            value={{
              ...localeContext,
            }}
          >
            <Header />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </LocaleProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
