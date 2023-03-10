import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import { localeData } from "../utils/constant";

const InputSearch = ({ keyword, onSearchHandler }) => {
  const localeContext = useContext(LocaleContext);
  return (
    <input
      type="text"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
      placeholder={`${localeData[localeContext.locale].placeholder_search}`}
      value={keyword}
      onChange={(e) => onSearchHandler(e.target.value)}
    />
  );
};

InputSearch.propTypes = {
  keyword: PropTypes.string.isRequired,
  onSearchHandler: PropTypes.func.isRequired,
};

export default InputSearch;
