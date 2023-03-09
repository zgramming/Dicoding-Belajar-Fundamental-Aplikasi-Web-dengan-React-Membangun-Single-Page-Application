import { useContext } from "react";
import { FiHome, FiLogOut, FiMoon, FiPlusCircle, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";
import { localeData } from "../utils/constant";

const ToggleLocale = () => {
  const localeContext = useContext(LocaleContext);
  return (
    <div
      className="flex items-center gap-3 bg-green-700 p-5 rounded-md hover:cursor-pointer"
      onClick={() => {
        localeContext.toggleLocale();
      }}
    >
      {localeContext.locale === "id" ? "ID" : "EN"}
    </div>
  );
};

const ToggleTheme = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      className="flex items-center gap-3 bg-green-700 p-5 rounded-md hover:cursor-pointer"
      onClick={() => {
        themeContext.toggleTheme();
      }}
    >
      {themeContext.theme === "light" ? <FiSun /> : <FiMoon />}
    </div>
  );
};

const Header = () => {
  const authContext = useContext(AuthContext);
  const localeContext = useContext(LocaleContext);

  return (
    <div className="h-20 bg-green-600">
      <div className="h-full flex flex-row justify-between items-center mx-auto text-white 2xl:max-w-4xl">
        <div className="font-bold text-2xl">{localeData[localeContext.locale].header_title}</div>
        <div className="flex flex-row flex-wrap gap-5">
          <ToggleLocale />
          <ToggleTheme />
          {authContext.authUser && (
            <>
              <Link to="/">
                <div className="bg-green-700 p-5 rounded-md">
                  <FiHome size={20} />
                </div>
              </Link>
              <Link to="/add">
                <div className="bg-green-700 p-5 rounded-md">
                  <FiPlusCircle size={20} />
                </div>
              </Link>
              <div
                className="bg-red-700 p-5 rounded-md hover:cursor-pointer"
                onClick={() => {
                  authContext.unsetAuthUser();
                  authContext.unsetToken();
                }}
              >
                <FiLogOut size={20} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
