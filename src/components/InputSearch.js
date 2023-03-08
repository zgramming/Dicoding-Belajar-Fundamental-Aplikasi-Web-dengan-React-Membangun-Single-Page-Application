import PropTypes from "prop-types";

const InputSearch = ({ keyword, onSearchHandler }) => {
  return (
    <input
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
      placeholder="Cari catatan kamu"
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
