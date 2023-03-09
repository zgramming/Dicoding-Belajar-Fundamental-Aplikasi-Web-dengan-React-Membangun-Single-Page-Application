import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import { localeData } from "../utils/constant";

const SelectStatus = ({ onStatusChangeHandler }) => {
  const localeContext = useContext(LocaleContext);
  return (
    <div className="flex flex-row justify-end">
      <select
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
        onChange={(e) => {
          onStatusChangeHandler(e.target.value);
        }}
      >
        <option value="active">
          {localeData[localeContext.locale].active}
        </option>
        <option value="archive">
          {localeData[localeContext.locale].archive}
        </option>
      </select>
    </div>
  );
};

SelectStatus.propTypes = {
  onStatusChangeHandler: PropTypes.func.isRequired,
};

export default SelectStatus;
